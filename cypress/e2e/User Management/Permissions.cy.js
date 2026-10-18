describe('Test Permissions in User Management', () => {
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

  it('Create New Permission', () => {
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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(10).click();

   //Navigate to Permissions screen
   cy.get('span.menu-item').eq(58).click();

   //Click on New button 
   cy.get('button:not(:disabled)').eq(0).click();

   //Enter name 
   cy.get('input#first-name.form-control').type('New permission regression 101');

   //Select category 
   cy.get('select#permission_category.type.form-control').select(2);

   //Add permission
   cy.get('button:not(:disabled)').eq(2).click();

});
});
