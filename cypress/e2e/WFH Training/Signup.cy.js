const timestamp = Date.now() ;

//Unique Generation of some values
  const cnic = '42' + timestamp.toString().slice(-11); //CNIC
  const phonenumber = '31' + timestamp.toString().slice(-8); //Phone number
  const email = `user_${Date.now()}@yopmail.com`; //email

describe('Training Signup', () => {

it('Test Sign up functionality',() =>{

    cy.visit('http://web-training.waada.pk/signup?code=jazzMPI21')


    //Enter name 
    cy.get('label span.input__label').eq(0).type('Test Automated');

    //Enter phone number
    cy.get('label span.input__label').eq(1).type(phonenumber);
   
    //Enter an email
    cy.get('label span.input__label').eq(2).type(email);

    //Click on sendotp
    cy.get('.auth-section .auth-form .green-button').click();

    //Wait for sometime 
    cy.wait(60000);

    //Click on verify otp 
    cy.get('.auth-section .otp-section .otp-block .green-button').click();

    //Wait for sometime 
    cy.wait(10000);

    //Enter CNIC
    cy.get('.form-control').eq(3).type(cnic);

    //Upload front and back CNIC
    cy.get('.custom-file input').eq(0).attachFile('Saad CNIC front.jpeg');
    cy.get('.custom-file input').eq(1).attachFile('Saad CNIC Back.jpeg');

    //Save Profile
    cy.get('.agent-profile .form-card .btn-row button').click()




});
});