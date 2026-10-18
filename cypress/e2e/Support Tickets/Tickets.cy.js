import LoginPage from "../pages/LoginPage";
import Tickets from "../pages/Tickets";

describe('Tickets Creation', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  const login = new LoginPage();
  const ticket = new Tickets();

  const data = {

    contact : '3332060693',
    description : 'Test Automated Script',
    customer_name : 'Test Automation'
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

  it('Create New Ticket', () => {

    login.visit();

    //Wait for sometime
     cy.wait(5000);

     //Enter an email & password
     login.enteremail(email);
     login.enterpassword(password);

     //Click on login
     login.clicklogin();

     //Add new ticket 

     ticket.createticket(data);
    
        
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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(1).click();

   //Navigate to ticket screen
   cy.get('span.menu-item').eq(3).click();

   //Click on add new ticket 
   cy.get('.btn-secondary').click();

   //Enter mobile number 
   cy.get('.form-control').eq(1).type('3332986663');


   
 

  //Select Category 
 cy.get('.select2-container .select2-selection--single').eq(3).click();

 cy.get('.select2-results__option').eq(0).click();

 //Wait for sometime
 cy.wait(2000);

 //Select sub Category

 cy.get('select#ticket_parent_id.form-control')
 .select(1);

 //Select entity
 cy.get('select#entity_id.form-control').select(1);

 //Enter Description

 cy.get('textarea#description.form-control').type('Testing');

 //Enter Customer name 
 cy.get('input#customer_name.form-control').type('Test Automation');

  /*
      cy.window().then((win) => {
  const input = win.document.getElementById('customer_name');
  input.value = 'Test Automation';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  

  //Click on save button 
  cy.get('button:not(:disabled)').eq(1).click();

  //Wait for sometime 
  cy.wait(15000);
 
  //Click on OK 
  cy.get('.swal-button').click();

  */
