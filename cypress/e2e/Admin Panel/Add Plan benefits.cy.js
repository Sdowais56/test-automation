import LoginPage from '../pages/LoginPage'
import Addbenefits from '../pages/Planbenefit'


describe('Plan Benefits', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  const login = new LoginPage();

 const plan_benefits= new Addbenefits();



  const planbenefits={

    coveragevalue : '4',
    coveragefrequency : 'monthly',
    maxbenefit : '40000',
    waitingdays : '0',
    secondcoveragevalue : '4',
   secondcoveragefrequency : 'Yearly',
   secondmaxbenefit : '50000',
   secondwaitingdays : '0'



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

  it('Add benefits in plan ', () => {
    
        login.visit();

        //Wait for sometime
        cy.wait(5000);


        login.enteremail(email);
        login.enterpassword(password);
        login.clicklogin();

        //Add first plan benefit 
        plan_benefits.create_benefit( planbenefits);

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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(4).click();

   //Navigate to plan screen
   cy.get('span.menu-item').eq(12).click();


   // Navigate to View Plan screen (open in same tab)

   cy.get('.text-warning', { timeout: 10000 }).should('exist');


cy.get('.text-warning').eq(0)     // select the <i> icon
  .parents('a')              // go up to the clickable <a> element
  .invoke('removeAttr', 'target')   // remove _blank
  .click();

//Navigate to Add benefits screen 
cy.get('.btn-success').click();


//Select coverage name
cy.get('.select2-selection').click();
cy.get('.select2-results__option[aria-selected]').eq(8).click();

//Enter coverage Value
cy.get('.form-control').eq(1).type('1000');

//Enter coverage frequency 
cy.get('.form-control').eq(2).type('monthly');

//Enter max benefit 
cy.get('.form-control').eq(4).type('30000');

//Enter waiting days
cy.get('.form-control').eq(5).type('0');

//Click on store button 
cy.get('button:not(:disabled)').eq(3).click();

//Add another plan benefit 
cy.get('.btn-success').click();

//Select coverage name
cy.get('.select2-selection').click();
cy.get('.select2-results__option[aria-selected]').eq(9).click();

//Enter coverage Value
cy.get('.form-control').eq(1).type('1000');

//Enter coverage frequency 
cy.get('.form-control').eq(2).type('monthly');

//Enter max benefit 
cy.get('.form-control').eq(4).type('30000');

//Enter waiting days
cy.get('.form-control').eq(5).type('0');

//Click on store button 
cy.get('button:not(:disabled)').eq(3).click();


 });

});
*/
