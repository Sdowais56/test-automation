//Unique parent name after every test run 

const parentname = 'user_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);

  //Unique child name after every test run 

  const childname = 'user_' + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substring(0, 6);


class disposition{

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
    nav_disposition(){

        cy.get('span.menu-item')
        .eq(30)
        .click();
    }
    click_add(){

        cy.get('.btn-outline-primary')
        .click();

    }
    
    entername(parentname){

        cy.get('.form-control')
        .eq(0)
        .type(parentname);
    }
        

    select_context(){

        cy.get('.form-control')
        .eq(1)
        .select(2);
    }
   
    save_disposition(){

        cy.get('button:not(:disabled)')
        .eq(1)
        .click();

    }

     wait2(){

        cy.wait(2000);

    }
    scroll_down(){

        cy.scrollTo('bottom');

    }
    add_disposition_child(){

        cy.get('i.text-danger.feather.icon-plus')
        .last()
        .click();
    }
    enterchild_name(childname){

        cy.get('.form-control')
        .eq(0)
        .type(childname);
    }

    save_child(){

        cy.get('button:not(:disabled)')
        .eq(1)
        .click();
    }
    scroll_down1(){

        cy.scrollTo('bottom');

    }
    wait3(){

        cy.wait(2000);

    }
    view_childcategory(){

         cy.get('i.fa.fa-plus ')
         .last()
         .click();

    }
    scroll_down2(){

         cy.scrollTo('bottom');
    }
    
    create_disposition(insert_disposition){

        this.navbar();
        this.wait1();
        this.dropdownmenu();
        this.nav_disposition();
        this.click_add();
        this. entername(parentname);
         this.select_context();
         this.save_disposition();
         this.wait2();
         this.scroll_down();
         this.add_disposition_child();
         this.enterchild_name(childname);
         this.save_child();
         this.scroll_down1()
         this.wait3();
          this.view_childcategory();
         this.scroll_down2();


    }
}
export default disposition ;