class task{

navbar(){

    cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg')
    .click();
}
wait1(){

    cy.wait(2000);
}
dropdown_menu(){

    /*
    cy.get('.main-menu.menu-light .navigation li.has-sub > a')
    .eq(1)
    .click();
    */
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('Support Tickets').click();
}
ticket_navigation(){

    /*
    cy.get('span.menu-item')
    .eq(3)
    .click();
    */
   cy.get('span.menu-item').contains('Tickets').click();

}
view_ticket(){

     cy.window().then((win) => {
  cy.stub(win, 'open').as('windowOpen');
});

 cy.get('table.data-list-view.dataTable tbody td').eq(0)
 .click();


cy.get('@windowOpen', { timeout: 10000 }).should('be.called');

// Wait until window.open is called, then visit that URL manually
cy.get('@windowOpen').should('be.called').then((stub) => {
  const url = stub.getCall(0).args[0];
  cy.visit(url); 
});
}
scrolldown(){

    cy.scrollTo('bottom');
}
tab_navigation(){

    cy.get('.nav.nav-tabs .nav-item .nav-link')
    .eq(4)
    .click();
}
clicknew_task(){

    cy.get('button.btn.btn-primary.btn-sm.mb-2.waves-effect.waves-light')
    .click();
}
task_title(){

    cy.get('input#task-title.form-control')
    .type('Test');
}
wait2(){
    cy.wait(2000);
}
select_assignedto(search_task){

    cy.get('#select2-task_assigned_user_id-container')
    .click();
   cy.get('.select2-container--default .select2-search--dropdown .select2-search__field')
   .type(search_task);
    cy.wait(2000);
   cy.get('li.select2-results__option').eq(0).click();

}
wait3(){

    cy.wait(2000);
}
complaint_disposition(){

    cy.get('#select2-task_complaint_disposition-container').click();
    cy.get('li.select2-results__option').eq(0).click();
}
wait4(){

    cy.wait(2000);
}

select_status(){

    cy.get('#select2-task_status_id-container').click();
    cy.get('li.select2-results__option').eq(0).click();
}
enter_employeecode(emp_code){

    cy.get('#task_employee_code')
    .type(emp_code)
}
enter_defendentname(def_name){

    cy.get('#task_defendant_name')
    .type(def_name)
}

save_task(){
    cy.get('#task-form > div.modal-footer > button.btn.btn-primary.save-task.waves-effect.waves-light').click();
}

wait5(){

    cy.wait(15000);
}
Click_ok(){

     cy.get('.swal-button').click();
}
addnew_task(insert_tasks){

    this.navbar();
    this.wait1();
    this.dropdown_menu();
    this.ticket_navigation();
    this.view_ticket();
    this.scrolldown();
    this.tab_navigation();
    this.clicknew_task();
    this.task_title();
    this.wait2();
    this.select_assignedto(insert_tasks.search_task);
    this.wait3();
    this.complaint_disposition();
    this.wait4();
    this.select_status();
    this.enter_employeecode(insert_tasks.emp_code);
    this.enter_defendentname(insert_tasks.def_name);
    this.save_task();
    this.wait5();
    this.Click_ok();
}  
}
export default task ;