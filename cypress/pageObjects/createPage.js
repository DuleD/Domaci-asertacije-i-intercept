class CreateImg {
    get imgName () {
        return cy.get('input[id="title"]')
    }
    
    get imgUrl () {
        return cy.get('input[type="url"]').eq(0)
    }

    get secondImgUrl () {
        return cy.get('input[type="url"]').eq(1)
    }

    get imgDescr () {
        return cy.get('input[id="description"]')
    }

    get submitBtn () {
        return cy.get('form > button:nth-of-type(1)')
    }

    get galleryAppButton () {
        return cy.get('a[class="navbar-brand router-link-active"]')
    }

    get allGalleriesButton () {
        return cy.get('a[class="nav-link nav-buttons router-link-active"]')
    }

    get myGalleriesButton () {
        return cy.get('a[href="/my-galleries"]')
    }

    get createGalleryButton () {
        return cy.get('a[href="/create"]')
    }

    get logoutButton () {
        return cy.get('a[class="nav-link nav-buttons"]').eq(1)
    }

    get pageTitle () {
        return cy.get('h1[class="title-style"]')
    }

    get labelTitle () {
        return cy.get('label[for="title"]')
    }

    get labelDescription () {
        return cy.get('label[for="descriptions"]').eq(0)
    }

    get labelImages () {
        return cy.get('label[for="descriptions"]').eq(1)
    }

    get imgButtonUp () {
        return cy.get('button[class="input-buttons"]').eq(0)
    }

    get imgButtonDown () {
        return cy.get('button[class="input-buttons"]').eq(1)
    }

    get inputTitle () {
        return cy.get('input[id="title"]')
    }

    get inputDescription () {
        return cy.get('input[id="description"]')
    }

    get inputImages () {
        return cy.get('input[type="url"]')
    }

    get addImageButton () {
        return cy.get('button[type="button"]').eq(2)
    }

    get submitButton () {
        return cy.get('button[type="submit"]').eq(0)
    }

    get cancelButton () {
        return cy.get('button[type="submit"]').eq(1)
    }

    get errorTitle () {
        return cy.get('p[class="alert alert-danger"]')
    }

    get addImage () {
        return cy.get('form div:nth-of-type(3) > [type]')
    }

    get nextArrow () {
        return cy.get('span[class="carousel-control-next-icon"]')
    }

    get previousArrow () {
        return cy.get('span[class="carousel-control-prev-icon"]')
    }
    
    get firstImg () {
        return cy.get('img[src="https://www.beforeafter.rs/wp-content/uploads/2019/11/beogradski-fantom-cetiri-decenije-kasnije-10-before-after.jpg"]')
    }

    get secondImg () {
        return cy.get('img[src="https://objektiv.rs/wp-content/uploads/2020/08/beogradski-fantom.png"]')
    }

    clickNextArrow () {
        this.nextArrow.click()
    }

    clickPreviousArrow () {
        this.previousArrow.click()
    }

    clickAddImage () {
        this.addImage.click()
    }

    create(imeSlike, descSlike, urlSlike, urlDrugeSlike) {

        imeSlike = imeSlike || undefined  //if kako bismo mogli da smestimo prazan string
        if (imeSlike != undefined) {
            this.imgName.type(imeSlike)
        }

        descSlike = descSlike || undefined
        if (descSlike != undefined) {
            this.imgDescr.type(descSlike)
        }
        
        urlSlike = urlSlike || undefined
        if (urlSlike != undefined) {
            this.imgUrl.type(urlSlike)
        }

        this.addImage.click()

        urlDrugeSlike = this.secondImgUrl.type(urlDrugeSlike)

        //this.imgName.type(imeSlike)  //this znaci dobavi element iz postojece klase (class AuthLogin)
        //this.imgUrl.type(urlSlike)
        this.submitBtn.click()
    }
}

export const createImg = new CreateImg()