import { navigation } from "../../pageObjects/navigation";
import { login } from '../../pageObjects/loginpage'
import { createImg } from '../../pageObjects/createPage.js'
import { edit } from '../../pageObjects/editgallery'
var galleryId // moramo ovako kako bismo posle galleryid mogli da stavimo da je jednako nesto
var editovanTitle


describe('open login page', () => {
    beforeEach(() => {
        cy.visit('https://gallery-app.vivifyideas.com/')
        navigation.clickLogin()

        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', (req) => {}).as('validLogin')
        login.loginAccount (Cypress.env('userName'), Cypress.env('password'))
        login.clickSubmitButton()

        cy.wait('@validLogin').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(200)
        

        })
    })

    /*it('Login', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', (req) => {}).as('validLogin')
        login.loginAccount (Cypress.env('userName'), Cypress.env('password'))
        login.clickSubmitButton()

        cy.wait('@validLogin').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(200)
            
        })
    })*/

    it('Create gallery intercept', () => {
        navigation.clickCreateGallery()
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries', (req) => {}).as('validCreateGallery')
        
        createImg.create('Beogradski', 'Fantom', 'https://www.beforeafter.rs/wp-content/uploads/2019/11/beogradski-fantom-cetiri-decenije-kasnije-10-before-after.jpg', 'https://objektiv.rs/wp-content/uploads/2020/08/beogradski-fantom.png')
        cy.wait('@validCreateGallery').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(201)

            cy.log(JSON.stringify(intercept.response))
            galleryId = intercept.response.body.id
        })
    })

    it('Pronadji ID i udji u edit', () => {
        cy.visit('')
        cy.get(`a[href="/galleries/${galleryId}"]`).click()  //Otvaramo galeriju na homepage i klikamo je
        createImg.firstImg.should('be.visible')

        createImg.clickNextArrow()
        createImg.secondImg.should('be.visible')

        createImg.clickPreviousArrow()
        createImg.firstImg.should('be.visible')

        cy.get(`a[href="/edit-gallery/${galleryId}"]`).click()
        editovanTitle = 'Editovano'
        edit.clearTitle()
        edit.editTitle.type(editovanTitle)
        edit.clickSubmitButton()
        edit.header.should('have.text', editovanTitle)

    })
    
})

