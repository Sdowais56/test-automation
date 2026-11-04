
class Addbenefits{

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

navtoplan(){

/*
cy.get('span.menu-item')
.eq(12)
.click();
*/
cy.get('span.menu-item').contains('Plan').click();

}
viewplanscreen(){

       cy.get('.text-warning', { timeout: 10000 })
       .should('exist');

       cy.get('.text-warning').eq(0)     // select the <i> icon
  .parents('a')              // go up to the clickable <a> element
  .invoke('removeAttr', 'target')   // remove _blank
  .click();

}

addbenefitscreen(){
 
    cy.get('.btn-success')
    .click();
}
selectcoveragename(){

    cy.get('.select2-selection')
    .click();

 cy.get('.select2-results__option[aria-selected]')
 .eq(8)
 .click();

}

entercoveragevalue(coveragevalue){

    cy.get('.form-control')
    .eq(1)
    .type(coveragevalue);
}

entercoveragefrequency(coveragefrequency){

    cy.get('.form-control')
    .eq(2)
    .type(coveragefrequency);
}

entermaxbenefit(maxbenefit){

cy.get('.form-control')
.eq(4)
.type(maxbenefit);

}

enterwaitingdays(waitingdays){

    cy.get('.form-control')
    .eq(5)
    .type(waitingdays);

}
clickonstore(){

cy.get('button:not(:disabled)')
.eq(3)
.click();

}
//Add Second benefit

add_secondbenefit(){


    cy.get('.btn-success')
    .click();
}

select_secondcoveragename(){

cy.get('.select2-selection')
.click();

cy.get('.select2-results__option[aria-selected]')
.eq(9)
.click();

}

enter_secondcoveragevalue(secondcoveragevalue){

    cy.get('.form-control')
    .eq(1)
    .type(secondcoveragevalue);
}

enter_secondcoveragefrequency(secondcoveragefrequency){

    cy.get('.form-control')
    .eq(2)
    .type(secondcoveragefrequency);
}

enter_secondmaxbenefit(secondmaxbenefit){

    cy.get('.form-control')
    .eq(4)
    .type(secondmaxbenefit);
}

enter_secondwaitingdays(secondwaitingdays){

    cy.get('.form-control')
    .eq(5)
    .type(secondwaitingdays);
}

second_clickonstore(){


    cy.get('button:not(:disabled)')
    .eq(3)
   .click();

}

create_benefit(Add_benefit){

    this.navbar();
    this.wait1();
    this.dropdownmenu();
    this.navtoplan();
    this.viewplanscreen();
    this.addbenefitscreen();
    this.selectcoveragename();
    this.entercoveragevalue(Add_benefit.coveragevalue);
    this.entercoveragefrequency(Add_benefit.coveragefrequency);
    this.entermaxbenefit(Add_benefit.maxbenefit);
    this.enterwaitingdays(Add_benefit.waitingdays);
    this.clickonstore();
     this.add_secondbenefit();
    this.select_secondcoveragename();
    this.enter_secondcoveragevalue(Add_benefit.secondcoveragevalue);
    this.enter_secondcoveragefrequency(Add_benefit.secondcoveragefrequency);
    this.enter_secondmaxbenefit(Add_benefit.secondmaxbenefit);
    this.enter_secondwaitingdays(Add_benefit.secondwaitingdays);
    this.second_clickonstore();
}

}
export default Addbenefits ;


