const timestamp = Date.now();

//Unique Generation of some values
const cnic = '42' + timestamp.toString().slice(-11); //CNIC
const mobilenumber = '13' + timestamp.toString().slice(-9); //Mobile number


class createpolicy {

 navbar(){

   cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg')
   .click();
}

dropdownmenu(){

    cy.get('.main-menu.menu-light .navigation li.has-sub > a')
    .eq(7)
    .click();
}

addpolicy(){

     cy.get('span.menu-item')
     .eq(43)
     .click();
}

wait1(){

    cy.wait(3000);
}

selectentity(){

     cy.get('.custom-select')
     .eq(0)
     .select(1);
}

selectradiobutton(){

    cy.get('input[type=radio]')
    .eq(3)
    .click();
}
entermobilenumber(mobilenumber){

    cy.get('.form-control')
    .eq(0)
    .type (mobilenumber);
}

wait2(){

    cy.wait(3000);
}
entername(name1){

     cy.get('.form-control')
     .eq(1)
     .click();

     cy.wait(3000);
    cy.get('.form-control')
   .eq(1)
   .type(name1);
}
selectcity(){

    cy.get('.select2-container--default .select2-selection--single .select2-selection__rendered')
    .eq(0)
    .click();

   cy.get('.select2-results__option')
   .eq(0)
   .click();
}
clickonshowmore(){

    cy.get('.btn:not(:disabled):not(.disabled)')
    .eq(4)
    .click();
}
entercnic(cnic){

    cy.get('.form-control')
    .eq(2)
    .type(cnic);
}
savepolicy(){

    cy.get('.btn:not(:disabled):not(.disabled)')
    .eq(5)
    .click();

   cy.get('.swal-button')
   .eq(1)
   .click();

}

   
   
createpolicy(policy){

    this.navbar()
    this.dropdownmenu()
    this.addpolicy()
    this.wait1()
    this.selectentity()
    this.selectradiobutton()
    this.entermobilenumber(mobilenumber)
    this.wait2()
    this.entername(policy.name1)
    this.selectcity()
    this.clickonshowmore()
    this.entercnic(cnic)
    this.savepolicy()
    
}
}
export default createpolicy