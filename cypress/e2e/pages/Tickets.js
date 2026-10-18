class Tickets {

     //Click on nav bar 
    navbar(){
   cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg')
   .click();

}

   //Wait for sometime
wait1(){

   cy.wait(2000);

}

//Click on the dropdown menu 

dropdownmenu(){
   cy.get('.main-menu.menu-light .navigation li.has-sub > a')
   .eq(1)
   .click();
}


   //Navigate to ticket screen

navto_ticket(){

    cy.get('span.menu-item').eq(3).click();
}
   

   //Click on add new ticket 
   new_ticket(){

    cy.get('.btn-secondary').click();
   }
   

   //Enter mobile number 

   entermobile_number(contact){

    cy.get('.form-control')
    .eq(1)
    .type(contact);
   }
   

  //Select Category 
  select_category(){

    cy.get('.select2-container .select2-selection--single')
    .eq(3)
    .click();

     cy.get('.select2-results__option').eq(0).click();
  }

  //Wait for sometime

 wait2(){

     cy.wait(2000);

 }
 

 //Select sub Category

 select_subcategory(){

    cy.get('select#ticket_parent_id.form-control')
    .select(1);
 }


 //Select entity

 select_entity(){

     cy.get('select#entity_id.form-control')
     .select(1);
 }


 //Enter Description

 enter_description(description){

    cy.get('textarea#description.form-control')
    .type(description);

 }

 //Enter Customer name 

 customer_name(customer_name){

    cy.get('input#customer_name.form-control')
    .type(customer_name);
 }
 

  /*
      cy.window().then((win) => {
  const input = win.document.getElementById('customer_name');
  input.value = 'Test Automation';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  */

  //Click on save button 

  save_button(){

     cy.get('button:not(:disabled)')
     .eq(1)
     .click();
  }
 

  //Wait for sometime 
  wait3(){

     cy.wait(15000);

  }
 
 
  //Click on OK 

  click_ok(){

    cy.get('.swal-button').click();

  }  
  createticket(insert_ticket){

    this.navbar();
    this.wait1();
    this.dropdownmenu();
    this.navto_ticket();
    this.new_ticket();
    this.entermobile_number(insert_ticket.contact);
    this.select_category();
    this.wait2();
    this.select_subcategory();
    this.select_entity();
    this.enter_description(insert_ticket.description);
    this.customer_name(insert_ticket.customer_name);
    this.save_button();
    this.wait3();
    this.click_ok();

  }
}
export default Tickets;
