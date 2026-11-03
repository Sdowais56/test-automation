//Generate Unique parent name after every test run 

const parentname = 'user_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);

  //Generate Unique child name after every test run 

  const childname = 'user_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);

class Module {

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
        .eq(10)
        .click();
        */
       cy.get('.main-menu.menu-light .navigation li.has-sub > a').contains('User Management').click();

    }

    navtomodule(){
/*
        cy.get('span.menu-item')
        .eq(58)
        .click();
        */
       cy.get('span.menu-item').contains('Modules').click();


    }

    

    clickonnew(){

        cy.get('button:not(:disabled)')
        .eq(0)
        .click();

    }

    entername(parentname){

        cy.get('.form-control')
        .eq(0)
        .type(parentname);

    }

    selecticon(){

        cy.get('.select2-selection')
        .click();

       cy.get('.select2-results__option[aria-selected]')
       .eq(1)
       .click();


    }

    savebutton_click(){

        cy.get('button:not(:disabled)')
        .eq(1)
        .click();

    }

     wait2(){

        cy.wait(2000);

    }
    
    scroll(){

        cy.scrollTo('bottom');
    }

    addchild(){

        cy.get('i.text-danger.feather.icon-plus')
        .last()
        .click();

    }

    enter_childname(childname){

           cy.get('.form-control')
           .eq(0)
           .type(childname);

    }

    select_childicon(){

        cy.get('.select2-selection')
        .click();

      cy.get('.select2-results__option[aria-selected]')
     .eq(1)
     .click();

    }

    save_childbutton(){

        cy.get('button:not(:disabled)')
        .eq(1)
        .click();

    }

    scroll2(){

        cy.scrollTo('bottom');
    }

    wait3(){

        cy.wait(2000);
    }

   
    

    viewchild_category(){

        cy.get('i.fa.fa-plus ')
        .last()
        .click();

    }
        

    scroll3(){

        cy.scrollTo('bottom');

    }
   

    createmodule(add_module){

        this.navbar();
        this.wait1();
        this.dropdownmenu();
        this.navtomodule();
        this.clickonnew();
        this.entername(parentname);
        this.selecticon();
        this.savebutton_click();
        this.wait2();
        this.scroll();
        this.addchild();
        this.enter_childname(childname);
        this.select_childicon();
        this.save_childbutton();
        this.scroll2();
        this. wait3();
        this.viewchild_category();
        this.scroll3();
       
          

    }
}
export default Module ;