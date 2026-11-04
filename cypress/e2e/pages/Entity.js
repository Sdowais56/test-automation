//Generate unique name after every test run

const name = 'Fastautomated' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);


const timestamp = Date.now();
const Shortcode = '1' + timestamp 

class Entity{

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

navtoentity(){

    /*
    cy.get('span.menu-item')
    .eq(16)
    .click();
    */
   cy.get('span.menu-item').contains('Entity').click();
}

addentity(){

    cy.get('.btn-success').click()
}

entername(name){

    cy.get('.form-control')
    .eq(0)
    .type(name);
}

enterprefix(prefix){

     cy.get('.form-control')
     .eq(1)
     .type(prefix);

}

enteremail(email){

    cy.get('.form-control')
    .eq(2)
    .type(email);
}

entershortcode(Shortcode){

    cy.get('.form-control')
    .eq(5)
    .type(Shortcode);

}

enterphonenumber(phonenumber){

    cy.get('.form-control')
    .eq(6)
    .type(phonenumber);

}

enteraddress(address){

    cy.get('.form-control')
    .eq(7)
    .type(address);
}

create_button(){

     cy.get('.btn-primary')
     .click();

}

wait2(){

    cy.wait(2000);
}

popup_okbutton(){

    cy.get('.swal-button')
    .click();
}

wait3(){

    cy.wait(2000);
}

goback(){

    cy.get('.btn:not(:disabled):not(.disabled)')
    .eq(0)
    .click();
} 

createentity(create_entity){

    this.navbar();
    this.wait1();
    this.dropdownmenu();
    this.navtoentity();
    this.addentity();
    this.entername(name);
    this.enterprefix(create_entity.prefix);
   // this.enteremail(create_entity.email);
    this.entershortcode(Shortcode);
  //  this.enterphonenumber(create_entity.phonenumber);
    this.enteraddress(create_entity.address);
    this.create_button();
    this.wait2();
    this.popup_okbutton();
    this.wait3();
    this.goback();
    
}
}
export default Entity ;