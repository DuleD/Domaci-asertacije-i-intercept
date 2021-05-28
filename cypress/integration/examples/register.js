import { navigation } from '../../pageObjects/navigation.js'
import { registration } from '../../pageObjects/fillregister.js'
const faker = require('faker')

var userData = {
    randomName: faker.name.findName(),
    randomLastName: faker.name.lastName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password() + faker.datatype.number(),
    randomConfirmPassword: faker.internet.password(),
    randomShortPassword: faker.internet.password(2),
    randomPasswordOnlyString: faker.lorem.word(8)
}

describe ('Check register page content, Register and use intercept', () => {
    before (() => {
        cy.visit('')
        navigation.clickRegister()
    })

    it ('Open register page, URL should include /register, header Register on the page, 6 labels with correct names, 6 input boxes, submit button, T&C should be unchecked', () => {
        cy.url().should('include', '/register')
        registration.galleryAppButton.should('be.visible').and('have.text', 'Gallery App')
        registration.naslov.should('have.text', 'Register')
        registration.termsAndConditions.should('not.be.checked')
        registration.registerLabels.should('have.length', 6).and('have.text', 'First NameLast NameEmailPasswordConfirmed PasswordAccepted terms and conditions')
        registration.registerInputs.should('have.length', 6)
        registration.submit.should('be.visible').and('have.text', 'Submit').and('have.css', 'background-color', 'rgb(72, 73, 75)')
    })
        
    it('Register with intercept, check if it leads us to homepage, check status and token', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/register', (req) => {}).as('validRegister')
        registration.registerAccount(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword)
        registration.clickAcceptTerms()
        registration.clickSubmit()
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')

        cy.wait('@validRegister').then((intercept) => {
            //cy.log(JSON.stringify(intercept.response))
            //cy.log(JSON.stringify(intercept.response.statusCode))
            expect(intercept.response.statusCode).to.eql(200)

            //cy.log(JSON.stringify(window.localStorage))

            //cy.log(JSON.stringify(intercept.response.body.access_token))
            expect(intercept.response.body.access_token).to.exist

            //window.localStorage.setItem('token', intercept.response.body.access_token) token je vec automatski setovan jer se ovo izvrsava i u frontendu a ne samo u backendu kao request
        })
    })
    

})

describe ('Register through backend and set token in local storage', () => { 
    before (() => {
        cy.registerThroughBackend()  //u commands js
    })

    it('visit gallery', () => {
        cy.visit('')
    })

})