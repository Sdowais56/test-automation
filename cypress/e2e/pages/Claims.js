const today = new Date();
const Dateof_incident = today.toISOString().split('T')[0];

class claims {

    navbar(){

        cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg')
        .click();
    }

    wait1(){

        cy.wait(2000);
    }

    dropdownmenu(){

        cy.get('.main-menu.menu-light .navigation li.has-sub > a')
        .eq(1)
        .click();
    }

    navto_support(){

        cy.get('span.menu-item')
        .eq(1)
        .click();

    }
    viewpolicy(){

        cy.get('#support-table tbody tr')
       .first()
      .invoke('attr', 'onclick')
      .then(onclick => {
       const url = onclick.match(/'(.*?)'/)[1]
        cy.visit(url)
  })
    }

    nav_toclaim(){

        cy.get('.btn:not(:disabled):not(.disabled)')
        .eq(1)
        .click();
    }
    enter_DOB(Dateof_birth){

        cy.get('input.form-control')
        .eq(0)
        .type(Dateof_birth);
    }
    select_benefit(){

        cy.get('input.select2-search__field').click();

     cy.get('.select2-results__option[aria-selected]')
     .eq(0)
     .click();
    }

    enter_DOI(Dateof_incident){

        cy.get('input.form-control')
        .eq(3)
        .type(Dateof_incident);
    }

    incident_city(){

        cy.get('.select2-container .select2-selection--single').eq(0).click();

       cy.get('.select2-results__option[aria-selected]')
       .eq(0)
      .click();

    }
    enternotifier_contact(contact){

        cy.get('.form-control')
        .eq(13)
        .type(contact);
    }
    relation_insured(){

        cy.get('.select2-container .select2-selection--single').eq(1).click();

       cy.get('.select2-results__option[aria-selected]')
     .eq(1)
      .click();

    }
    claim_handler(){

        cy.get('.select2-container .select2-selection--single').eq(3).click();
        cy.get('.select2-results__option[aria-selected]')
     .eq(1)
      .click();
        

    }
    save_button(){

        cy.get('button:not(:disabled)')
        .eq(1)
        .click();
    }

    createclaim(insert_claim){

        this.navbar();
        this.wait1();
        this.dropdownmenu();
        this.navto_support();
        this.viewpolicy();
        this.nav_toclaim();
        this.enter_DOB(insert_claim.Dateof_birth);
        this.select_benefit();
        this.enter_DOI(Dateof_incident);
        this.incident_city();
        this.enternotifier_contact(insert_claim.contact);
        this.relation_insured();
        this.claim_handler();
        this.save_button();

    }
}
export default claims ;