import LoginPage from "../pages/LoginPage";
import Entity from "../pages/Entity";

describe('Test Entity', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

   const login = new LoginPage();
   const entity= new  Entity();

   const add_entity = {

   // name1 : ' Automation sprint hundredone',
    prefix : 'ASH',
   // email : 'befautomatedflow1@yopmail.com',
   //  Shortcode : 'BEF1234',
   // phonenumber : '3212377911',
    address : 'Special street',


   }

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

  it('Create new entity', () => {
    

    login.visit();

    //Wait for sometime
    cy.wait(5000);

    //Enter email & password
    login.enteremail(email);
    login.enterpassword(password);

    login.clicklogin();

    //Add new entity
 
    entity.createentity(add_entity);
  
        
    });
    
     /*

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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(4).click();

   //Navigate to entity screen
   cy.get('span.menu-item').eq(16).click();

   //Navigate to add entity screen
   cy.get('.btn-success').click();

   //Enter name 
   cy.get('.form-control').eq(0).type('Regression Test entity ninety one');

   //Enter prefix
   cy.get('.form-control').eq(1).type('REX');

   //Enter primary email
   cy.get('.form-control').eq(2).type('regressiontestninetyone@hotmail.com');

   //Enter short code
   cy.get('.form-control').eq(5).type('REg');

   //Enter phone number 
   cy.get('.form-control').eq(6).type('3332070795');

   //Enter Address
   cy.get('.form-control').eq(7).type('Tenth down street London');

   //Create entity
   cy.get('.btn-primary').click();

   //Wait for sometime
   cy.wait(2000);

   //Go back 
   cy.get('.btn:not(:disabled):not(.disabled)').eq(0).click();


});
*/
});

