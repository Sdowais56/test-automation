describe('Test View Policy', () => {
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

  it('View policy and Change Status', () => {
    cy.visit('https://dev.waada.pk/login', {
      onBeforeLoad(win) {
        win.grecaptcha = {
          ready(cb) { cb(); },
          render: () => 'fake-widget-id',
          execute: () => Promise.resolve('fake-token')
        };
      }
        
    });
    
     

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
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').eq(5).click();

   //Navigate to View Policies screen
   cy.get('span.menu-item').eq(32).click();

//Click on view policy and opening in same tab

cy.window().then((win) => {
  cy.stub(win, 'open').callsFake((url) => {
    win.location.href = url; // same tab
  });
});

cy.get('table.data-list-view.dataTable tbody td')
  .eq(0)
  .click();

  cy.get('.btn:not(:disabled):not(.disabled)').eq(3).click();

  //Wait for sometime
  cy.wait(2000);

  //Select dispatch assigned status 

  cy.get('select#status_id.custom-select').select(5);

  //Click on ok button 

  cy.get('.btn-primary').eq(1).click();

   
        
    
})
})