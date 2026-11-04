const timestamp = Date.now() ;

//Unique Generation of some values
  const cnic = '42' + timestamp.toString().slice(-11); //CNIC
  const phonenumber = '31' + timestamp.toString().slice(-8); //Phone number
  const imei= '12'+ timestamp.toString().slice(-12); //IMEI


class blacklist{


navbar(){

    cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg')
    .click();
}

wait1(){

    cy.wait(2000);
}

dropdownmenu(){

    /*
    cy.get('.main-menu.menu-light .navigation li.has-sub > a')
    .eq(4)
    .click();
    */
 cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('Admin').click();
    
}
navto_blacklist(){

    /*
    cy.get('span.menu-item')
    .eq(26)
    .click();
    */
  cy.get('span.menu-item').contains('Black List').click(); 
}
add_new(){

     cy.get('.btn-primary')
     .first()
     .click();
}
entername(name1){

     cy.get('input#name.form-control')
     .type(name1,{force :true});
}
enterphonenumber(phonenumber){

    cy.get('input#number.form-control')
    .type(phonenumber);
}
entercnic(cnic){

    cy.get('input#cnic.form-control')
    .type(cnic);
}
enterimei(imei){

    cy.get('input#imei.form-control')
    .type(imei);
}
save_click(){

    cy.get('.modal-footer > :not(:last-child)')
    .click();
}
click_ok(){

    cy.get('.swal-button')
    .click();
}

createblack_list(add_blacklist){

    this.navbar();
    this.wait1();
    this.dropdownmenu();
    this.navto_blacklist();
    this.add_new();
    this.entername(add_blacklist.name1);
    this.enterphonenumber(phonenumber);
    this.entercnic(cnic);
    this.enterimei(imei);
    this.save_click();
    this.click_ok();
    

}
}
export default blacklist ;