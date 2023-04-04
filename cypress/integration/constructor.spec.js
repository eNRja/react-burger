const login = {
    email: "satukov90@yandex.ru",
    password: "123321"
}

const burgerClass = '[class^=burger-components_BurgerComponents_]'

describe('constuctor page', () => {

    beforeEach(() => {
        cy.visit('dashboard');
    });

    it('show ingredient detail', () => {
        cy.contains('Соберите бургер');
        cy.get('[class^=ingredient-item_Link]').first().click();
        cy.get('[class^=modal_]').contains('Детали ингредиента');
        cy.get('[class^=modal_ModalEscBtn_]').click();
        cy.get('[class^=modal_]').should('not.exist');
    });

    it('create order', () => {
        const dataTransfer = new DataTransfer();
        cy.get('a').contains('Краторная булка').trigger('dragstart', { dataTransfer });
        cy.get(burgerClass).trigger('drop', { dataTransfer });
        cy.get('a').contains('Соус фирменный Space Sauce').trigger('dragstart', { dataTransfer });
        cy.get(burgerClass).trigger('drop', { dataTransfer });
        cy.get('a').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart', { dataTransfer });
        cy.get(burgerClass).trigger('drop', { dataTransfer });
        cy.get('a').contains('Хрустящие минеральные кольца').trigger('dragstart', { dataTransfer });
        cy.get(burgerClass).trigger('drop', { dataTransfer });
        cy.get('a').contains('Мини-салат Экзо-Плантаго').trigger('dragstart', { dataTransfer });
        cy.get(burgerClass).trigger('drop', { dataTransfer });
        cy.get('button').contains('Оформить заказ').click();
        cy.location('pathname').then(($pathname) => {
            if ($pathname === '/login') {
                cy.get('[name=email]').type(login.email);
                cy.get('[name=password]').type(login.password);
                cy.get('button').contains('Войти').click().wait(3000);
                cy.get('button').contains('Оформить заказ').click();
            } else {
                cy.get('button').contains('Оформить заказ').click();
            }
        })
        cy.get('[class^=order-details_ModalOrderTitle_]', { timeout: 20000 }).contains(/\d+/);
        cy.get('[class^=modal_ModalEscBtn_]').click()
        cy.contains('идентификатор заказа').should('not.exist');
    });
})