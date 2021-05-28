class Edit {
    get editTitle () {
        return cy.get('input[id="title"]')
    }

    clearTitle () {
        this.editTitle.clear()
    }

    get submitButton () {
        return cy.get('form > button:nth-of-type(1)')
    }

    clickSubmitButton () {
        this.submitButton.click()
    }

    get header () {
        return cy.get('h1[class="title-style"]')
    }
}

export const edit = new Edit