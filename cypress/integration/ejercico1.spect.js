describe('Ejercio 1', () => {
    it('Compra', function(){
        // Inicio Login
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account');
        cy.fixture('login').then((usuario) => {
            cy.login(usuario.username, usuario.password)
        });
        // Fin Login

        // Inicio Buscar producto
        cy.get('#search_query_top').type('dresses{enter}');
        // Fin buscar producto

        // Inicio seleccionar producto
        cy.get(':nth-child(1) > .product-container > .right-block > h5 > .product-name').click();
        cy.get('.exclusive > span').click();
        cy.get('.button-medium > span').click();
        cy.get('.cart_description > .product-name > a').should('contain', 'Printed Summer Dress');
        cy.get('.icon-plus').click();
        // Fin seleccionar producto

        // Inicio checkout
        cy.get('.cart_navigation > .button > span').click();
        cy.get('#ordermsg > .form-control').type('Algun Comentario de la direccion');
        cy.get('.cart_navigation > .button > span').click();
        cy.get('#cgv').click();
        cy.get('.cart_navigation > .button > span').click();
        cy.get('.bankwire').click();
        cy.get('.page-subheading').should('contain', 'Bank-wire payment.');
        cy.get('#cart_navigation > .button > span').click();
        cy.get('.button-exclusive').click();
        // Fin checkout

        // Inicio validar compra
        cy.get('.first_item > .history_date').should('contain', '12/29/2021');
        let total = (28.98 * 2.00) + 2.00
        cy.get('.first_item > .history_price > .price').should('contain', total);
    })
})