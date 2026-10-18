describe('Test login functionality', () => {

  const email='saad.owais@waada.pk';
  const password='Saadowais@123';

  it('Navigate to login screen', () => {

    //Navigation to login screen 
  
    cy.visit('https://dev.waada.pk')

    cy.wait(100000);

    
    
    //Enter email address and password 
    cy.get ('input',{ timeout: 10000 }).eq(1).type(email);
    cy.get('input').eq(2).type(password);

   


   //Click on login button 
   cy.get('.btn-primary').click();

   //Wait for sometime 
   cy.wait(2000);

   //Click on nav bar 
   cy.get('.header-navbar .navbar-container ul.navbar-nav li a.menu-toggle svg').click();
   
    
  })
})