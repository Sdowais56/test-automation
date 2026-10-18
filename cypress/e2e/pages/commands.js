const { describeField, keyFor, formatValue, TERMS } = require('./formFiller');

const PAYMENT_PAGE = /payment method|select payment|pay now|jazz\s?cash|easy\s?paisa|debit\s?\/\s?credit card|cash on delivery/i;
const PRIMARY_ACTION = /^(next|continue|proceed|submit|buy now|buy|get started|get quote|select plan|select|checkout|save (and|&) continue)$/i;
const PAY_ACTION = /^(pay( now)?|place order|confirm( order| payment)?|purchase|complete purchase)$/i;
const SUCCESS = /success|thank you|congratulations|policy (no|number|issued)|order (placed|confirmed)/i;
const LOADERS = '[class*="loader"], [class*="Loader"], [class*="spinner"], [class*="Spinner"], [class*="loading"], [role="progressbar"]';
const ERRORS = '[role="alert"], .Mui-error, .ant-form-item-explain-error, .invalid-feedback, [class*="error-message"], [class*="errorMessage"]';
const OTP_INPUT = 'input[autocomplete="one-time-code"], input[placeholder*="OTP"], input[placeholder*="otp"], input[maxlength="1"]';

const textOf = (el) => (el.innerText || el.value || '').replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------------------
// Stable waits
// ---------------------------------------------------------------------------
Cypress.Commands.add('waitForLoaders', () => {
  cy.get('body').should(($b) => {
    expect($b.find(LOADERS).filter(':visible').length, 'visible loaders').to.eq(0);
  });
});

// ---------------------------------------------------------------------------
// Login (phone + OTP), cached across tests with cy.session
// ---------------------------------------------------------------------------
Cypress.Commands.add('enterPhoneAndOtp', () => {
  const phone = String(Cypress.env('PHONE') || '');
  const otp = String(Cypress.env('OTP') || '');
  if (!phone || !otp) throw new Error('Set CYPRESS_PHONE and CYPRESS_OTP for the test account');

  cy.get('input[placeholder*="Phone Number"]').should('be.visible').clear().type(phone);
  cy.contains('button', /^login$/i).should('not.be.disabled').click();

  cy.get(OTP_INPUT, { timeout: 20000 }).filter(':visible').should('have.length.at.least', 1).then(($inputs) => {
    if ($inputs.length > 1) otp.split('').forEach((digit, i) => cy.wrap($inputs[i]).type(digit));
    else cy.wrap($inputs[0]).type(otp);
  });
  cy.get('body').then(($b) => {
    const $btn = $b.find('button').filter(':visible').filter((_, b) => /verify|submit|continue|confirm|login/i.test(textOf(b)));
    if ($btn.length) cy.wrap($btn.first()).should('not.be.disabled').click();
  });
  cy.location('pathname', { timeout: 20000 }).should('not.match', /login|otp|verify/i);
});

Cypress.Commands.add('loginWithOtp', () => {
  cy.session(['waada', Cypress.env('PHONE')], () => {
    cy.visit('/login');
    cy.enterPhoneAndOtp();
  }, { cacheAcrossSpecs: true });
});

// ---------------------------------------------------------------------------
// Shop & product
// ---------------------------------------------------------------------------
Cypress.Commands.add('waitForShopLoaded', (productNames) => {
  cy.contains(new RegExp(productNames.join('|'), 'i'), { timeout: 20000 }).should('be.visible');
  cy.waitForLoaders();
});

Cypress.Commands.add('openProduct', (name) => {
  cy.contains(new RegExp(name, 'i')).should('be.visible').then(($title) => {
    // Closest ancestor that has its own button/link = the product card
    const $card = $title.parents().filter((_, p) => Cypress.$(p).find('button, a').length > 0).first();
    const $cta = $card.find('button, a').filter(':visible')
      .filter((_, b) => /buy|get|view|select|shop|detail|learn|more/i.test(textOf(b)));
    cy.wrap($cta.length ? $cta.first() : $title).scrollIntoView().click();
  });
  cy.waitForLoaders();
});

// ---------------------------------------------------------------------------
// Form filling
// ---------------------------------------------------------------------------
Cypress.Commands.add('fillCustomDropdowns', () => {
  const triggers = '[role="combobox"]:not(input), .ant-select:not(.ant-select-disabled), [class*="select__control"], [aria-haspopup="listbox"]';
  const options = '[role="option"], .ant-select-item-option, [class*="select__option"], li[role="menuitem"]';
  cy.get('body').then(($body) => {
    $body.find(triggers).filter(':visible').each((_, el) => {
      const current = textOf(el);
      if (current && !/select|choose|please/i.test(current)) return; // already has a value
      cy.wrap(el).click({ force: true });
      cy.get(options).filter(':visible').should('have.length.at.least', 1).first().click({ force: true });
    });
  });
});

Cypress.Commands.add('fillPolicyForm', (data) => {
  cy.get('body').then(($body) => {
    const $fields = $body.find('input, textarea, select').filter(':visible')
      .not('[type="hidden"], [type="submit"], [type="button"], [type="file"], [disabled], [readonly]');
    const doneRadioGroups = new Set();

    $fields.each((_, el) => {
      const type = (el.type || '').toLowerCase();
      const desc = describeField(el);
      const key = keyFor(desc);
      const wanted = key ? data[key] : undefined;

      if (type === 'checkbox') {
        const context = `${desc} ${Cypress.$(el).parent().text()}`;
        if (!el.checked && TERMS.test(context)) cy.wrap(el).check({ force: true });
        return;
      }

      if (type === 'radio') {
        if (doneRadioGroups.has(el.name)) return;
        doneRadioGroups.add(el.name);
        const $group = $fields.filter((__, r) => r.type === 'radio' && r.name === el.name);
        if ($group.is(':checked')) return;
        const $match = wanted
          ? $group.filter((__, r) => new RegExp(wanted, 'i').test(`${r.value} ${describeField(r)}`))
          : Cypress.$();
        cy.wrap(($match.length ? $match : $group).first()).check({ force: true });
        return;
      }

      if (el.tagName === 'SELECT') {
        if (el.value) return;
        const opts = [...el.options].filter((o) => o.value && !o.disabled);
        const pick = opts.find((o) => wanted && new RegExp(wanted, 'i').test(o.text)) || opts[0];
        if (pick) cy.wrap(el).select(pick.value);
        return;
      }

      if (el.value) return; // prefilled (e.g. phone number from login)

      let value = wanted;
      if (value === undefined) {
        Cypress.log({ name: 'fillPolicyForm', message: `No rule for "${desc}" - using fallback text` });
        value = data.fallbackText;
      }
      cy.wrap(el).clear().type(formatValue(key, String(value), el), { delay: 10 });
    });
  });
  cy.fillCustomDropdowns();
});

// ---------------------------------------------------------------------------
// Multi-step wizard: fill -> Next -> wait for page to change -> repeat until payment
// ---------------------------------------------------------------------------
const signature = ($body) => {
  const href = $body[0].ownerDocument.location.href;
  const headings = $body.find('h1, h2, h3, h4').filter(':visible').text();
  const fields = $body.find('input, select, textarea').filter(':visible')
    .map((_, e) => e.name || e.placeholder || e.type).get().join(',');
  return `${href}::${headings}::${fields}`;
};

Cypress.Commands.add('clickPrimaryAction', () => {
  const find = ($body) => $body.find('button, a, input[type="submit"]').filter(':visible')
    .filter((_, b) => PRIMARY_ACTION.test(textOf(b)) && !b.disabled && b.getAttribute('aria-disabled') !== 'true');

  cy.get('body').should(($body) => {
    const visible = $body.find('button').filter(':visible').map((_, b) => textOf(b)).get();
    expect(find($body).length, `enabled Next/Continue/Buy button (visible buttons: ${visible.join(' / ')})`)
      .to.be.greaterThan(0);
  }).then(($body) => {
    cy.wrap(find($body).last()).scrollIntoView().click();
  });
});

Cypress.Commands.add('completePolicyWizard', (data) => {
  const maxSteps = Number(Cypress.env('MAX_WIZARD_STEPS') || 8);

  const step = (n) => {
    cy.waitForLoaders();
    cy.get('body').then(($body) => {
      if (PAYMENT_PAGE.test($body.text())) {
        cy.log(`Reached payment page after ${n - 1} step(s)`);
        return;
      }
      if (n > maxSteps) throw new Error(`Payment page not reached after ${maxSteps} steps`);

      // Login prompted in the middle of checkout
      if ($body.find('input[placeholder*="Phone Number"]').filter(':visible').length
          && /login/i.test($body[0].ownerDocument.location.pathname)) {
        cy.enterPhoneAndOtp();
        step(n);
        return;
      }

      cy.fillPolicyForm(data);
      cy.get('body').then(($filled) => {
        const before = signature($filled);
        cy.clickPrimaryAction();
        cy.get('body', { timeout: 20000 }).should(($after) => {
          const errors = $after.find(ERRORS).filter(':visible').map((_, e) => textOf(e)).get().filter(Boolean);
          if (errors.length) throw new Error(`Validation failed on step ${n}: ${errors.join(' | ')}`);
          expect(signature($after), `step ${n} advanced`).not.to.eq(before);
        });
      });
      cy.then(() => step(n + 1));
    });
  };

  step(1);
});

// ---------------------------------------------------------------------------
// Payment
// ---------------------------------------------------------------------------
Cypress.Commands.add('verifyPaymentPage', () => {
  cy.contains(PAYMENT_PAGE, { timeout: 20000 }).should('be.visible');
  cy.contains(/(rs\.?|pkr)\s?[\d,]+/i).should('be.visible'); // premium amount shown
});

Cypress.Commands.add('completePayment', (method) => {
  cy.contains('label, button, div, span', new RegExp(method, 'i')).filter(':visible').first().click();
  cy.get('body').then(($body) => {
    const $pay = $body.find('button, input[type="submit"]').filter(':visible').filter((_, b) => PAY_ACTION.test(textOf(b)));
    expect($pay.length, 'Pay / Place order button').to.be.greaterThan(0);
    cy.wrap($pay.last()).should('not.be.disabled').click();
  });
  cy.contains(SUCCESS, { timeout: 60000 }).should('be.visible');
});
