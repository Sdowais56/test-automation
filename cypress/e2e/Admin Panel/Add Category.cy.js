//Unique parent name after every test run 

const parentname = 'user_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);

  //Unique child name after every test run 

  const childname = 'user_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);


describe('Plan Category', () => {
  const email = 'cc_agent@waada.pk';
  const password = 'CCagent@1234';

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

  it('Add New Category ', () => {
    cy.visit('https://dev.waada.pk/login', {
      onBeforeLoad(win) {
        win.grecaptcha = {
          ready(cb) { cb(); },
          render: () => 'fake-widget-id',
          execute: () => Promise.resolve('fake-token')
        };
      }
        
    });
    
//Applying wait for five seconds because we need to manually bypass the custom slider before login
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

   //Navigate to Category screen
   cy.get('span.menu-item').eq(13).click();



   //Click on New button 
   cy.get('button:not(:disabled)').eq(0).click();

   //Enter category name
   cy.get('.form-control').eq(0).type(parentname);

   //Click on save button 
   cy.get('button:not(:disabled)').eq(1).click();

   

   //Wait for sometime
   cy.wait(2000);

   //Scroll down
   cy.scrollTo('bottom');

   //Add Category's child 
   cy.get('i.text-danger.feather.icon-plus').last().click();

   //Enter category name
   cy.get('.form-control').eq(0).type(childname);

   //Click on save button 
   cy.get('button:not(:disabled)').eq(1).click();

   

   //Wait for sometime
   cy.wait(2000);

   //Click to view child category
   cy.get('.category_collapse_button > i.fa-plus').last().click();

   //Scroll down
   cy.scrollTo('bottom');


});
});