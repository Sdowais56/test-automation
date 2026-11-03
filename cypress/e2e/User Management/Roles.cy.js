const rolename = 'user_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);


describe('Test Roles in User Management', () => {
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

  it('Create New Role ', () => {
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
  // cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(10).click();
  cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('User Management').click();

   //Navigate to Roles screen
  // cy.get('span.menu-item').eq(59).click();
    cy.get('span.menu-item').contains('Roles').click();
  


   //Click on New button 
   cy.get('button:not(:disabled)').eq(0).click();

   //Wait for sometime
   cy.wait(2000);
   
   //Enter role name
   cy.get('.form-control').eq(0).type(rolename);

   //Select checkbox 
   cy.get('.custom-control').eq(0).click();

   //Navigate to plans tab 
   cy.get('.nav-tabs .nav-link').eq(1).click();

   //Select checkbox 
  // cy.get('#plans > .table-responsive > .display > #table_body > :nth-child(1) > :nth-child(2)').click();
   cy.get('input#plan-5.custom-control-input.role-plan').click();
   
   
   //Scroll down
   cy.scrollTo('bottom');

   //Save module 
   cy.get('button:not(:disabled)').eq(1).click();


});
});
