import LoginPage from "../pages/LoginPage";
import task from "../pages/Task";

const login = new LoginPage();
const task_addition = new task();

const data = {

  search_task : 'test',
  emp_code : 'T124',
  def_name : 'Test'
}


describe('Task Creation', () => {


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

      it('Create New Task', () => {

        login.visit();

      //Applying wait for five seconds because we need to manually bypass the custom slider before login
        cy.wait(5000);

        //Enter email & password
        login.enteremail(email);
        login.enterpassword(password);

        //Click on login
        login.clicklogin();

        //Create new task
        task_addition.addnew_task(data);
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


   //Navigate to ticket screen
   cy.get('span.menu-item').eq(3).click();

   //View ticket in same tab
   
   cy.window().then((win) => {
  cy.stub(win, 'open').as('windowOpen');
});

 cy.get('table.data-list-view.dataTable').click();


cy.get('@windowOpen', { timeout: 10000 }).should('be.called');

// Wait until window.open is called, then visit that URL manually
cy.get('@windowOpen').should('be.called').then((stub) => {
  const url = stub.getCall(0).args[0];
  cy.visit(url); 
});

//Scroll down 
cy.scrollTo('bottom');

//Tab navigation 
cy.get('.nav.nav-tabs .nav-item .nav-link').eq(4).click();

//Add new task 
cy.get('button.btn.btn-primary.btn-sm.mb-2.waves-effect.waves-light').click();

//Enter task title 
cy.get('input#task-title.form-control').type('Test');

//Wait for sometime
cy.wait(2000);

//Select Assigned to 
//cy.get('.select2-container--default .select2-selection--single .select2-selection__placeholder').eq(0).click();
cy.get('#select2-task_assigned_user_id-container').click();
cy.get('.select2-container--default .select2-search--dropdown .select2-search__field').type('test');
cy.wait(2000);
cy.get('li.select2-results__option').eq(0).click();

//Wait for sometime
cy.wait(2000);

//Select disposition 
cy.get('#select2-task_complaint_disposition-container').click();
cy.get('li.select2-results__option').eq(0).click();

//Wait for sometime
cy.wait(2000);

//Select status
cy.get('#select2-task_status_id-container').click();
cy.get('li.select2-results__option').eq(0).click();

//Enter employee code 
cy.get('#task_employee_code').type('00212')

//Enter defendent name
cy.get('#task_defendant_name').type('Test Defandant name')

//Save Task
cy.get('#task-form > div.modal-footer > button.btn.btn-primary.save-task.waves-effect.waves-light').click();

//Wait for sometime
cy.wait(15000);

//Click OK 
   cy.get('.swal-button').click();
   

    });
  */
  
