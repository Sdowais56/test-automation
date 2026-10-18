class LoginPage{

visit(){
cy.visit('https://dev.waada.pk/login', {
      onBeforeLoad(win) {
        win.grecaptcha = {
          ready(cb) { cb(); },
          render: () => 'fake-widget-id',
          execute: () => Promise.resolve('fake-token')
}
    }
})
      
}
enteremail(email){

        cy.get('input[type="email"]', { timeout: 10000 })
        .should('be.visible')
        .type(email);

}
enterpassword(password){

    cy.get('input[type="password"]')
    .should('be.visible')
    .type(password);
}

clicklogin(){
    cy.get('.btn-primary')
    .should('not.be.disabled')
    .click();
}

login(email,password){

    this.enteremail(email)
    this.enterpassword(password)
    this.clicklogin()

}

}
export default LoginPage
