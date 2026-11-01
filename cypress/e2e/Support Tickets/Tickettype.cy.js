describe('Ticket Type', () => {


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

      it('Add new ticket type', () => {

        cy.visit('https://dev.waada.pk/login', {
      onBeforeLoad(win) {
        win.grecaptcha = {
          ready(cb) { cb(); },
          render: () => 'fake-widget-id',
          execute: () => Promise.resolve('fake-token')
}
    }
})

//Applying wait for five seconds because we need to manually bypass the custom slider before login
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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(1).click();


   //Navigate to ticket screen
   cy.get('span.menu-item').eq(4).click();

   //Add new ticket type 
   cy.get('.btn-primary').first().click();

   //Enter name 
   cy.get('input[type="text" i]').type('Test');

   //Wait for sometime
   cy.wait(2000);

   //Enter description 
   cy.get('textarea.form-control').type('Test');

   //Select parent
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').click();
   cy.get('li.select2-results__option').eq(0).click();

   //Save task type
   cy.get('button:not(:disabled)').eq(0).click();

      })
    })
