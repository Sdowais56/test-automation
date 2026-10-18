import LoginPage from '../pages/LoginPage'
import UserManagement from '../pages/UserManagementPage'

describe('User Management', () => {

  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  //creating instance
  const Login = new LoginPage()
  const User = new UserManagement()


  

  const userdata = {
    //name1: 'Regression_POM5',
   // email: 'saad5@yopmail.com',
    firstname: 'Test',
    lastname: 'Automation',
    //code: '092923',
  //  cnic: '4220176297798',
  //  phonenumber: '03332080896',
    password: 'Saadowais@123',
    confirmpassword: 'Saadowais@123'
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

  it('Create New User', () => {

    //visit login page
    Login.visit()

    //Wait for sometime
    cy.wait(5000);

    //Enter email and password
    Login.login(email,password) 

    //Click on side menu 
    User.navbar()

    //Click on dropdown
    User.dropdownmenu()

    //Navigate to user screen
    User.navigatetouser()

    //Click on Add user button
    User.adduser()

    //Create user
    User.createuser(userdata)
    
  });
});