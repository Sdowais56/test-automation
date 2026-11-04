//Generate unique name after every test run

const name = 'test_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);

  //Generate unique short name after every test 

  const shortname = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 3);


describe('Test Underwriter', () => {
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

  it('Create new underwriter', () => {
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
   //cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(4).click();
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('Admin').click();

   //Navigate to underwriter screen
   //cy.get('span.menu-item').eq(11).click();
   cy.get('span.menu-item').contains('Underwriter').click();


   //Navigate to Add underwriter
   cy.get('.btn-secondary').click();

   //Enter Name 
   cy.get('.form-control').eq(0).type(name);
  
   //Enter Prefix
   cy.get('.form-control').eq(1).type(shortname);

   //Enter primary email
   cy.get('.form-control').eq(2).type('Testunderwriter@hotmail.com');

   //Enter website 
   cy.get('.form-control').eq(3).type('https://www.pakqatar.com.pk/');

   //Upload file
   cy.get('input[type="file"]').attachFile('Policy.png');

   //Create underwriter
   cy.get('button:not(:disabled)').eq(1).click();

   //Click on back button 
   //cy.get('button:not(:disabled)').eq(0).click();




});
});