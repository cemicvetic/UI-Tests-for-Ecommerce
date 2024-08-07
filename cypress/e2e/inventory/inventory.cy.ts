interface Item {
  name: string
  desc: string
  price: number
}

beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

it('has every item from the inventory', () => {
  cy.fixture('inventory.json').then((items) => {
    items.forEach((item: Item) => {
      cy.log(`checking 🎁 **${item.name}**`)
      cy.contains('.inventory_item', item.name).within(() => {
        cy.contains('.inventory_item_name', item.name)
        cy.contains('.inventory_item_desc', item.desc)
        cy.contains('.inventory_item_price', item.price)
      })
    })
  })
})
