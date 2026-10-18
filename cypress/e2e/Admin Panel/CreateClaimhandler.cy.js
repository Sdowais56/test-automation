describe('Test Create Claim handler', () => {
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
  
it('Add New Claim Handler', () => {
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

   //Wait for sometime
   cy.wait(2000);

   //Click on the dropdown menu 
   cy.contains('.main-menu.menu-light .navigation li.has-sub > a','Admin').click();

   //Navigate to claim handler screen
   cy.contains('span.menu-item','Claim handler').click();

   //Click on Add button
   cy.get('.btn-outline-primary').click();
   cy.url().should('include', 'claim-handler-mappings/create');

   //Click on Policy Category
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Click on Claim handler
   cy.get('.select2-container--default .select2-search--inline .select2-search__field').click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Click on save button 
   cy.contains('.btn-primary','Save').should('be.visible').click();
   

})
})
