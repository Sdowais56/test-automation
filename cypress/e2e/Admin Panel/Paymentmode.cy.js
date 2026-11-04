describe('Test Payment mode', () => {
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

  it('Add New Payment Mode', () => {
    cy.visit('https://dev.waada.pk/login', {
      onBeforeLoad(win) {
        win.grecaptcha = {
          ready(cb) { cb(); },
          render: () => 'fake-widget-id',
          execute: () => Promise.resolve('fake-token')
        };
      }
        
    });
    
     
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
 //  cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(4).click();
 cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('Admin').click();


   //Navigate to Payment mode screen
  // cy.get('span.menu-item',{ timeout: 10000 }).eq(17).should('be.visible').click();
   cy.get('span.menu-item',{ timeout: 10000 }).contains('Payment Modes').click();



   //Click on add button 
   cy.get('.btn-success').eq(0).click();

   

   //Enter discount 
  cy.get('.form-control').eq(2).type(23);

  //Click on discount type and select first value
  cy.get('.custom-select').eq(0).select(1);

  //Select status 
  cy.get('.custom-select').eq(1).select(1);

  //Enter details 
  cy.get('.note-editor .note-editing-area .note-editable').type('Testing');

  //Create payment mode
  cy.get('.waves-button-input').click();

   

})
})

