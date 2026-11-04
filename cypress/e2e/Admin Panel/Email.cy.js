describe('Test Email Template', () => {
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

  it('Add New Email Template', () => {
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


   //Navigate to Email template screen
  // cy.get('span.menu-item').eq(27).click();
  cy.get('span.menu-item').contains('Email Templates').click();


   //Click on Add Email template 
   cy.get('.btn-primary').first().click();

   //Click on Email code dropdown and select first value

   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(0).click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Wait for sometime
   cy.wait(2000);

   //Enter Heading/Subject 
   cy.get('.form-control').eq(0).type('Testing Email');

   

   //Wait for sometime
   cy.wait(2000);

   //Click receiver and select first value
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(1).click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Wait for sometime
   cy.wait(2000);

   //Click status and select first value
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(2).click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();


    //Wait for sometime
   cy.wait(2000);


   //Click language and select first value
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(3).click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Wait for sometime
   cy.wait(2000);

   //Enter email content 
   cy.get('.note-editor .note-editing-area .note-editable').type('Testing');

   //Click on submit button 
   cy.get('.waves-float').last().click();

   //Click OK 
   cy.get('.swal-button').click();

/*
   //Click status and select first value
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(3).click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Wait for sometime
   cy.wait(2000);


   //Click on languages and select first value
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(4).click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Wait for sometime
   cy.wait(2000);


   //Click on entity and select first value
   cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered').eq(5).click();
   cy.get('.select2-results__option[aria-selected]').eq(0).click();

   //Wait for sometime
   cy.wait(2000);


   //Click on submit button 
   cy.get('.btn-primary').eq(0).click();
   */

})
})

 