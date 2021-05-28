class Login {
    get loginEmail () {
        return cy.get('input[id="email"]')
    }

    get loginPassword () {
        return cy.get('input[id="password"]')
    }

    get loginSubmit () {
        return cy.get('button[type="submit"]')
    }
    clickSubmitButton () {
        this.loginSubmit.click()
    }

    loginAccount (email, password) {
        email = this.loginEmail.type(email)
        password = this.loginPassword.type(password)
    }
}

export const login = new Login