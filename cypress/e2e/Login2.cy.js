describe('Test login functionality', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  beforeEach(() => {
    // Ignore reCAPTCHA and null-related exceptions
    Cypress.on('uncaught:exception', (err) => {
      if (
        err.message.includes('reCAPTCHA') ||
        err.message.includes("Cannot set properties of null")
      ) {
        return false;
      }
    });
  });

  it('Navigate to login screen', () => {
    cy.visit('https://dev.waada.pk/login', {
      onBeforeLoad(win) {
        win.grecaptcha = {
          ready(cb) { cb(); },
          render: () => 'fake-widget-id',
          execute: () => Promise.resolve('fake-token')
        };
      }
    });

    cy.wait(5000);

    // Enter credentials
    cy.get('input[type="email"]', { timeout: 10000 }).should('be.visible').type(email);
    cy.get('input[type="password"]').should('be.visible').type(password);

    // Click Sign In
    cy.get('.btn-primary').should('not.be.disabled').click();

    

    //Click on nav bar 
   cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg').click();
   
  });
});
