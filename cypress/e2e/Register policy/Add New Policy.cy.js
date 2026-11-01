//importing classes 

import LoginPage from '../pages/LoginPage'
import createpolicy from '../pages/Policypage'

describe('Add New policy', () => {

  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  //creating instance
  const Login = new LoginPage()
  const policy = new createpolicy()

  const policydata = {
   // mobilenumber : '3212367819',
    name1 : 'Test Automated Flow scripted',
   // cnic :'4220176239989',


  }

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (
        err.message.includes('reCAPTCHA') ||
        err.message.includes("Cannot set properties of null")
      ) {
        return false;
      }
      });
    });
      it('Create New Policy', () => {

    //visit login page
    Login.visit()

    //Applying wait for five seconds because we need to manually bypass the custom slider before login
    cy.wait(5000);

    //Enter email and password
    Login.login(email,password) 

   

    //Create Policy
    policy.createpolicy(policydata)
    
  
  });
});