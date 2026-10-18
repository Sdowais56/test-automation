import LoginPage from '../pages/LoginPage'
import plancreation from '../pages/PlanPage'

describe('Plan Creation', () => {


  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  const login = new LoginPage();
  const plan = new plancreation();

  const plandata ={
         name1 : 'Scripted Automation',
        // planno : 'pr248',
        // premiumlevel : '8.1',
         waitingdays : '9',
         refunddays : '0',
         enterprefix : 'fix',
         agelimit : '23',
         graceperiod : '10'
         
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

  it('Create plan', () => {
    
    //Visit login page
    login.visit();

    //Wait for sometime
    cy.wait(5000);

    //Enter email and password
    login.enteremail(email);
    login.enterpassword(password);

    //Click on login button 
    login.clicklogin();

    //Plan creation 
    plan.createplan(plandata);
        
    });

});


