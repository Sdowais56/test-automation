const today = new Date();
const Date_filter = today.toISOString().split('T')[0];


describe('Test Whatsapp Chat', () => {
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

  it('Whatsapp Chat flow', () => {
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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(6).click();

   //Navigate to Whatsapp Chat screen
   cy.get('span.menu-item',{ timeout: 10000 }).eq(41).should('be.visible').click();

   //Wait for sometime
   cy.wait(2000);

   //Switch button off to on
  cy.get('span.switch-text-right').click();

  //Wait for sometime
  cy.wait(2000);

  //Select date 
  
 cy.get('input#dateFilter.form-control', { timeout: 20000 })
  .should('be.visible')
  .and('not.be.disabled')
  .clear()
  .type(Date_filter, { timeout: 20000 })
  .should('have.value', Date_filter);
  /*
   cy.get('input#dateFilter.form-control')
        .type(Date_filter);

  //Wait for sometime
  cy.wait(2000);
  */
  
 
   //Select agent 

   cy.get('select.form-control:not([multiple="multiple"])', { timeout: 20000 })
  .eq(0)
  .select(13)
  .find('option:selected')
  .should('not.have.value', '');
   /*
   cy.get('select.form-control:not([multiple="multiple"])').eq(0).select(13);

   //Wait for sometime
  cy.wait(2000);
  
 
 cy.get('select.form-control:not([multiple="multiple"])', { timeout: 10000 })
  .eq(0)
  .should('be.visible')
  .and('not.be.disabled')
  .find('option', { timeout: 10000 })
  .should('have.length.greaterThan', 13);  
  */ 

//Wait for sometime
cy.wait(2000);

   //Select status - In progress

    cy.get('select.form-control:not([multiple="multiple"])', { timeout: 20000 })
  .eq(1)
  .select(1);

  //Wait for sometime
  cy.wait(2000);
   

   //Select status - Pending 

   cy.get('select.form-control:not([multiple="multiple"])', { timeout: 20000 })
  .eq(1)
  .select(2);

  //Wait for sometime
  cy.wait(2000);


   //Select status - Closed
   cy.get('select.form-control:not([multiple="multiple"])', { timeout: 20000 })
  .eq(1)
  .select(3);

   //Wait for sometime
   cy.wait(2000);

   //Select type

   //Select type - Agent
   cy.get('select.form-control:not([multiple="multiple"])', { timeout: 20000 }).eq(2).select(1);

   //Wait for sometime
   cy.wait(2000);

   //Select status - Bot
   cy.get('select.form-control:not([multiple="multiple"])', { timeout: 20000 }).eq(2).select(2)

   

   //Page refresh command
   cy.reload();

   //Wait for sometime
   cy.wait(2000);

   //Switch button on to off
  cy.get('span.switch-text-left').click();
  
    
   });
});