/**
 * Maps a field's label / name / placeholder to a key in customer.json.
 * Order matters: more specific rules come first.
 */
const FIELD_RULES = [
  { key: 'nomineeCnic',     match: /(nominee|beneficiary|heir).*(cnic|nic|id)/i },
  { key: 'nomineePhone',    match: /(nominee|beneficiary|heir).*(phone|mobile|contact)/i },
  { key: 'nomineeRelation', match: /relation/i },
  { key: 'nomineeName',     match: /nominee|beneficiary|heir/i },
  { key: 'fatherName',      match: /father|husband|guardian/i },
  { key: 'cnic',            match: /cnic|\bnic\b|national id|id card|identity/i },
  { key: 'email',           match: /e-?mail/i },
  { key: 'dob',             match: /birth|\bdob\b/i },
  { key: 'purchaseDate',    match: /purchase date|date of purchase|bought/i },
  { key: 'imei',            match: /imei/i },
  { key: 'deviceBrand',     match: /brand|make|manufacturer/i },
  { key: 'deviceModel',     match: /model/i },
  { key: 'devicePrice',     match: /price|value|worth/i },
  { key: 'phone',           match: /phone|mobile|contact|cell/i },
  { key: 'city',            match: /city/i },
  { key: 'address',         match: /address|street/i },
  { key: 'gender',          match: /gender|\bsex\b/i },
  { key: 'occupation',      match: /occupation|profession/i },
  { key: 'firstName',       match: /first\s*name/i },
  { key: 'lastName',        match: /last\s*name|surname/i },
  { key: 'fullName',        match: /name/i },
];

const TERMS = /agree|terms|condition|declar|confirm|consent|accept/i;

function describeField(el) {
  const $el = Cypress.$(el);
  const parts = [$el.attr('name'), $el.attr('id'), $el.attr('placeholder'), $el.attr('aria-label')];
  const id = $el.attr('id');
  if (id) parts.push(Cypress.$(el.ownerDocument).find(`label[for="${CSS.escape(id)}"]`).text());
  parts.push($el.closest('label').text());
  // Label rendered as a sibling inside the same wrapper (MUI, AntD, custom forms)
  const $wrapper = $el.parents().filter((_, p) => Cypress.$(p).find('label').length > 0).first();
  parts.push($wrapper.find('label').first().text());
  return parts.filter(Boolean).join(' | ').replace(/\s+/g, ' ').trim();
}

function keyFor(description) {
  const rule = FIELD_RULES.find((r) => r.match.test(description));
  return rule ? rule.key : undefined;
}

/** ISO dates in fixtures -> DD/MM/YYYY for text date fields; ISO for <input type="date"> */
function formatValue(key, value, el) {
  const isDateKey = key === 'dob' || key === 'purchaseDate';
  if (isDateKey && el.type !== 'date') {
    const [y, m, d] = value.split('-');
    return `${d}/${m}/${y}`;
  }
  return value;
}

module.exports = { describeField, keyFor, formatValue, TERMS };
