import LoginPage from "../pages/LoginPage";
import claims from "../pages/Claims";

describe('Claims Creation', () => {
  
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  const login = new LoginPage ();
  const claim = new claims();

  const data = {

    Dateof_birth : '1996-08-26',
   // Dateof_incident : '2026-05-14',
    contact : '03332060693'
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

  it('Create New Claim', () => {
   
    login.visit();

    //Applying wait for five seconds because we need to manually bypass the custom slider before login
    cy.wait(5000);

    //Enter email & password
    login.enteremail(email);
    login.enterpassword(password);

    //Click on login button 
    login.clicklogin();

    //Add new claim
    claim.createclaim(data);
        
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

   //Navigate to support screen
   cy.get('span.menu-item').eq(1).click();

   //Click on view policy 
 // cy.get('table.dataTable td, table.dataTable th').eq(5).click();

 cy.get('#support-table tbody tr')
  .first()
  .invoke('attr', 'onclick')
  .then(onclick => {
    const url = onclick.match(/'(.*?)'/)[1]
    cy.visit(url)
  })

  //Navigate to claim screen
  cy.get('.btn:not(:disabled):not(.disabled)').eq(1).click();

  //Enter insurer date of birth 
  cy.get('input.form-control').eq(0).type('1996-08-26');

  //Click on claimed benefit and select benefit

  cy.get('input.select2-search__field').click();

  cy.get('.select2-results__option[aria-selected]')
 .eq(0)
 .click();

 //Enter date of incident 
 cy.get('input.form-control').eq(3).type('2026-04-23');

 //Select incident city
 cy.get('.select2-container .select2-selection--single').eq(0).click();

 cy.get('.select2-results__option[aria-selected]')
 .eq(0)
 .click();

 //Enter Notifier contact
 cy.get('.form-control').eq(11).type('03332060693');

 //Select Relation with insured

  cy.get('.select2-container .select2-selection--single').eq(1).click();

 cy.get('.select2-results__option[aria-selected]')
 .eq(1)
 .click();

 //Click on save button 
cy.get('button:not(:disabled)').eq(1).click();

*/

