describe('Test Certificate Management', () => {
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

  it('Add New Certificate', () => {
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
  // cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(4).click();
  cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('Admin').click();
  

   //Navigate to Certificate Management screen
   //cy.get('span.menu-item').eq(28).click();
   cy.get('span.menu-item').contains('Certificate Management').click();
   

   //Click on New Button 
 cy.window().then((win) => {
  cy.stub(win, 'open').as('windowOpen');
});

cy.get('.btn-secondary').click();

cy.get('@windowOpen', { timeout: 10000 }).should('be.called');

// Wait until window.open is called, then visit that URL manually
cy.get('@windowOpen').should('be.called').then((stub) => {
  const url = stub.getCall(0).args[0];
  cy.visit(url); 
});

//Click on entity and select first value
cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(0).click();
cy.get('.select2-results__option[aria-selected]').eq(0).click();

//Click on underwriter and select first value
cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(1).click();
cy.get('.select2-results__option[aria-selected]').eq(0).click();

//Click on status and select first value
cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(3).click();
cy.get('.select2-results__option[aria-selected]').eq(0).click();

//Click on category and select first value
cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(4).click();
cy.get('.select2-results__option[aria-selected]').eq(0).click();

//Enter Description
cy.get('.note-editor .note-editing-area .note-editable').type('Testing');

//Click on submit button 
   cy.get('.waves-float').last().click();

   //Click OK 
   cy.get('.swal-button').click();




})
})