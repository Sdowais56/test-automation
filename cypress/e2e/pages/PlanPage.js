const timestamp = Date.now();
const planno = '1'+ timestamp
const premiumlevel = '19.1' + timestamp


class plancreation  {

navbar(){

    cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg')
    .click();
}

wait1(){

    cy.wait(2000);
}

dropdownmenu(){

    cy.get('.main-menu.menu-light .navigation li.has-sub > a')
    .eq(4)
    .click();
}

plannavigation(){

cy.get('span.menu-item')
.eq(12)
.click();
}

addplannavigation(){

    cy.window().then((win) => {
  cy.stub(win, 'open').as('windowOpen');
});

cy.get('.btn-secondary').click();

cy.get('@windowOpen', { timeout: 10000 }).should('be.called');

// Wait until window.open is called, then visit that URL manually
cy.get('@windowOpen').should('be.called').then((stub) => {
  const url = stub.getCall(0).args[0];
  cy.visit(url); 
});
}
clickinside(){

    cy.get('.form-control')
    .eq(0)
    .click();
}

wait2(){

    cy.wait(2000);
}
entername(name1){

    cy.get('.form-control')
    .eq(0)
    .type(name1);
}

enterplannumber(planno){

 cy.get('.form-control')
    .eq(1)
    .type(planno);

}

wait3(){

    cy.wait(2000);
}
enterpremiumlevel(premiumlevel){

    cy.get('.form-control')
    .eq(2)
    .type(premiumlevel);
}

wait4(){

    cy.wait(2000);
}

waitingdays(waitingdays){

    cy.get('.form-control')
    .eq(4)
    .type(waitingdays);
}

refunddays(refunddays){

    cy.get('.form-control')
    .eq(6)
    .type(refunddays);
}

enterprefix(enterprefix){

    cy.get('.form-control')
    .eq(8)
    .type(enterprefix);
}

selectentity(){

    cy.get('select')
    .eq(2)
    .select(1);
}

selectunderwriter(){

    cy.get('select')
    .eq(3)
    .select(1);
}

selectcategory(){
    
    cy.get('select')
    .eq(5)
    .select(1);
}

enteragelimit(agelimit){

    cy.get('.form-control')
    .eq(13)
    .type(agelimit);
}

entergraceperiod(gracepreriod){

    cy.get('.form-control')
    .eq(14)
    .type(gracepreriod);

}

saveplan(){

    cy.get('button:not(:disabled)')
    .eq(1)
    .click();
}
createplan(plan){

    this.navbar();
    this.wait1();
    this.dropdownmenu();
    this.plannavigation();
    this.addplannavigation();
    this.clickinside();
    this.wait2();
    this.entername(plan.name1);
    this.enterplannumber(planno);
    this.wait3();
    this.enterpremiumlevel(premiumlevel);
    this.wait4();
    this.waitingdays(plan.waitingdays);
    this.refunddays(plan.refunddays);
    this.enterprefix(plan.enterprefix);
    this.selectentity();
    this.selectcategory();
    this.enteragelimit(plan.agelimit);
    this.entergraceperiod(plan.graceperiod);
    this.saveplan();

}
}

export default plancreation