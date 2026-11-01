import LoginPage from "../pages/LoginPage";
import disposition from "../pages/Disposition";

describe('Test Disposition', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

  const login = new LoginPage();
  const new_dis= new disposition();

  const data={

   //name1 : 'Test Sr.Automated hundredtwo',
  // name2 : 'Child test Sr.automated hundredtwo'
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

  it('Create new disposition', () => {
    
    login.visit();

    //Applying wait for five seconds because we need to manually bypass the custom slider before login

    //Wait for sometime
    cy.wait(5000);

    //Enter email & password
    login.enteremail(email);
    login.enterpassword(password);

    //Click on Sign in
    login.clicklogin();

    //Add new parent & child disposition
    new_dis.create_disposition(data);



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

   //Navigate to disposition screen
   cy.get('span.menu-item').eq(28).click();

  

   //Navigate to add disposition screen 
   cy.get('.btn-outline-primary').click();

   //Enter name of disposition 
   cy.get('.form-control').eq(0).type('Disposition sprint ninety one');

   //Select context
   cy.get('.form-control').eq(1).select(2);

   //Save disposition 
   cy.get('button:not(:disabled)').eq(1).click();

   

   //Wait for sometime
   cy.wait(2000);

   //Scroll down
   cy.scrollTo('bottom');

   //Add Dispositon's child 
   cy.get('i.text-danger.feather.icon-plus').last().click();

   //Enter name
   cy.get('.form-control').eq(0).type('Chid regression disposition ninety one');

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

   */



