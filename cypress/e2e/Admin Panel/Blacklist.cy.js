import LoginPage from "../pages/LoginPage";
import blacklist from "../pages/Blacklist";


describe('Test Black Listed Customer', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  const login = new LoginPage();
 const insert_blacklist = new blacklist();


  const data = {
    
    name1 :'Test Autonmated script',
    //phonenumber : '3900786014',
   // cnic : '4220177247793',
   // imei : '123456789012',

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

  it('Add New Black Listed Customer', () => {


    login.visit();

    //Wait for sometime
    cy.wait(5000);

    //Enter an email & password
    login.enteremail(email);
    login.enterpassword(password);

    //Click on login button 
    login.clicklogin();

    //Add blacklist
    insert_blacklist.createblack_list(data);
        
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

   //Navigate to Black Listed Customer screen
   cy.get('span.menu-item').eq(24).click();

   //Click on Add new button 
   cy.get('.btn-primary').first().click();

   //Enter name
   cy.get('input#name.form-control').type('test');

   //Enter phone number
   cy.get('input#number.form-control').type('3332060693');

   //Enter cnic
   cy.get('input#cnic.form-control').type('4220176237781');

   //Enter IMEI
   cy.get('input#imei.form-control').type('1002001020020');

   //Click on save button 
   cy.get('.modal-footer > :not(:last-child)').click();

    //Click OK 
   cy.get('.swal-button').click();

*/

})
