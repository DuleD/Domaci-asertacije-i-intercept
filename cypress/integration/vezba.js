
describe('pocetak', () => {
    it('homepage', () => {
        cy.visit('https://gradebook.vivifyideas.com/')
        cy.get('a[href="/register"]').click()
    })

    it('register fill', () => {
        cy.intercept('POST', 'https://gradebook-api.vivifyideas.com/api/register', (req) => {}).as('validregister')
        cy.get('input[id="first_name"]').type('Markic')
        cy.get('input[id="last_name"]').type('Kralj')
        cy.get('input[id="email"]').type('Kraljev@gmail.com')
        cy.get('input[id="password"]').type('pass1234')
        cy.get('input[id="password_confirmation"]').type('pass1234')
        cy.get('label[for="terms_conditions"]').click()
        cy.get('button[type="submit"]').click()

        cy.wait('@validregister').then((intercept) => {
            cy.log(JSON.stringify(intercept.response))
            expect(intercept.response.statusCode).to.eql(201)
        })
    })

    /*it('Register page works', () => {
        cy.intercept('GET', 'https://gradebook.vivifyideas.com/register', (req) => {}).as('validregister')
        cy.visit('https://gradebook.vivifyideas.com/register')
        cy.wait('@validregister').then((intercept) => {
            //cy.log(JSON.stringify(intercept.response))
            expect(intercept.response.statusCode).to.eql(200)
        })
       
    })*/
})