import LoginPage from "../pages/LoginPage";
import Module from "../pages/Modules";

describe('Test Modules in User Management', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  const login = new LoginPage();
  const module = new Module();
 
  const module_data = {

    //'name1': 'Sprint hundred two Automation',
   // 'child_name': 'Test hundred two Automation'
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

  it('Create New Module ', () => {
    
    login.visit();

    //Applying wait for five seconds because we need to manually bypass the custom slider before login
    cy.wait(5000);

    //Enter email and password
   
    login.enteremail(email);
    login.enterpassword(password);

    //click on login
    login.clicklogin();

    //Add Module
    module.createmodule(module_data);
        
    });

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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(10).click();

   //Navigate to Modules screen
   cy.get('span.menu-item').eq(53).click();

   

   //Click on New button 
   cy.get('button:not(:disabled)').eq(0).click();

   //Enter module name
   cy.get('.form-control').eq(0).type('Regression script ninety one');

   //Select icon
   cy.get('.select2-selection').click();
   cy.get('.select2-results__option[aria-selected]').eq(1).click();

   //Click on save button 
   cy.get('button:not(:disabled)').eq(1).click();

   //Wait for sometime
   cy.wait(2000);

   //Scroll down
   cy.scrollTo('bottom');
   

   //Add module's child 
   cy.get('i.text-danger.feather.icon-plus').last().click();

   //Enter module name
   cy.get('.form-control').eq(0).type('Chid regression script ninety one');

   //Select icon
   cy.get('.select2-selection').click();
   cy.get('.select2-results__option[aria-selected]').eq(1).click();

   //Click on save button 
   cy.get('button:not(:disabled)').eq(1).click();

   
  //Scroll down
   cy.scrollTo('bottom');

   //Wait for sometime
   cy.wait(2000);

  
   //Click to view child category
   cy.get('i.fa.fa-plus ').last().click();
   
  

   //Scroll down
   cy.scrollTo('bottom');

   //Save module 
   cy.get('button:not(:disabled)').click();
*/

