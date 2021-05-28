
import { createImg } from '../../pageObjects/createPage.js'
import { navigation } from '../../pageObjects/navigation.js'


describe ('Login through backend and set token in local storage', () => { 
    beforeEach (() => {
        cy.logInThroughBackend()
    })

    it('Enter create gallery and test page content', () => {
        cy.visit('')
        navigation.clickCreateGallery()
        createImg.galleryAppButton.should('be.visible').and('have.text', 'Gallery App')
        createImg.allGalleriesButton.should('be.visible').and('have.text', '\n            All Galleries\n          ')
        createImg.myGalleriesButton.should('be.visible').and('have.text', '\n            My Galleries\n          ')
        createImg.createGalleryButton.should('be.visible').and('have.text', 'Create Gallery\n          ')
        createImg.logoutButton.should('be.visible').and('have.text', '\n            Logout\n          ')

        createImg.pageTitle.should('be.visible').and('have.text', 'Create Gallery')
        createImg.labelTitle.should('be.visible').and('have.text', 'Title:')
        createImg.labelDescription.should('be.visible').and('have.text', 'Descriptions:')
        createImg.labelImages.should('be.visible').and('have.text', 'Images:')

        createImg.inputTitle.should('be.visible')
        createImg.inputDescription.should('be.visible')
        createImg.inputImages.should('be.visible')
        createImg.inputImages.invoke('attr', 'placeholder').should('contain', 'image url')

        createImg.imgButtonUp.should('be.visible')
        createImg.imgButtonDown.should('be.visible')
        createImg.addImageButton.should('be.visible').and('have.text', 'Add image')
        createImg.submitButton.should('be.visible').and('have.text', 'Submit')
        createImg.cancelButton.should('be.visible').and('have.text', 'Cancel')
    })

    it('Create gallery intercept', () => {
        cy.visit('')
        navigation.clickCreateGallery()
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries', (req) => {}).as('validCreateGallery')
        createImg.create('Beogradski', 'Fantom', 'https://www.beforeafter.rs/wp-content/uploads/2019/11/beogradski-fantom-cetiri-decenije-kasnije-10-before-after.jpg')

        cy.wait('@validCreateGallery').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(201)
            expect(intercept.response.body.title).to.eql('Beogradski')
            expect(intercept.response.body.description).to.eql('Fantom')
            cy.log(JSON.stringify(intercept.response))
        })
    })

})