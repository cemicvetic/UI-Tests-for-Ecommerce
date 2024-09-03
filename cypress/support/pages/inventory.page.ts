export const InventoryPage = {
  getCartBadge() {
    return cy.get('.shopping_cart_link').find('.shopping_cart_badge')
  },

  addItemToCart(name: string) {
    cy.contains('.inventory_item', name)
      .contains('button', 'Add to cart')
      .click()
  },
}
