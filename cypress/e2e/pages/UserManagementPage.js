const timestamp = Date.now();
  
//Unique Generation of some values
  const cnic = '42' + timestamp.toString().slice(-11); //CNIC
const phonenumber = '03' + timestamp.toString().slice(-9); //Phone number
const name1 = 'user_' + timestamp //User name
const email = `user_${Date.now()}@test.com`; //email
const code = '1' + timestamp //employeecode

class UserManagement{

    

    navbar(){

   cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg')
   .click();
}

dropdownmenu(){

    /*
    cy.get('.main-menu.menu-light .navigation li.has-sub > a')
    .eq(10)
    .click();
    */
   cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('User Management').click();
}

navigatetouser(){
/*
 cy.get('span.menu-item')
 .eq(57)
 .click();
 */
cy.get('span.menu-item').contains('Users').click();

}

adduser(){

 cy.get('.btn-success')
 .click();

}
entername(name1){

cy.get('.form-control')
.eq(0)
.type(name1);

}

enteremail(email){

cy.get('.form-control')
.eq(1)
.type(email);


}

enterfirstname(firstname){

cy.get('.form-control')
.eq(2)
.type(firstname);

}

enterlastname(lastname){

cy.get('.form-control')
.eq(3)
.type(lastname);

}

entercode(code){

cy.get('.form-control')
.eq(4)
.type(code);

}

selectfirstrole(){

    cy.get('.select2-container .select2-selection--multiple')
    .eq(0).
    click();

    cy.get('.select2-results__option')
    .eq(1).
    click();
}

selectentity(){

    cy.get('select')
    .eq(3)
    .select(1);
}

enterCNIC(cnic){

    cy.get('.form-control')
    .eq(9)
    .type(cnic);

}

enterphonenumber(phonenumber){

     cy.get('.form-control')
     .eq(10)
     .type(phonenumber);
}

enterpassword(password) {
  cy.get('input[type="password"]').first()
    .should('be.visible')
    .clear()
    .type(password);
}

enterconfirmpassword(confirmpassword) {
  cy.get('input[type="password"]').last()
    .should('be.visible')
    .clear()
    .type(confirmpassword);
}
/*
enterpassword(password){

    cy.get('.form-control')
    .eq(19)
    .type(password);

}
    */
/*
enterconfirmpassword(confirmpassword){

    cy.get('.form-control')
    .eq(20)
    .type(confirmpassword);

    
}
    */
enterconfirmpassword(confirmpassword) {
  cy.get('input[placeholder="Confirm password is required"]')
    .type(confirmpassword);
}

clickoncreateuser(){

    cy.get('.waves-button-input')
    .click();
}



createuser(user){

    this.entername(name1)
     this.enteremail(email)
    this.enterfirstname(user.firstname)
    this.enterlastname(user.lastname)
    this.entercode(code)
    this.selectfirstrole()
    this.selectentity()
    this.enterCNIC(cnic)
    this.enterphonenumber(phonenumber)
    this.enterpassword(user.password)
    this.enterconfirmpassword(user.confirmpassword)
    this.clickoncreateuser()
}
}

export default UserManagement
