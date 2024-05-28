export const InventoryPage = {
  getCartBadge() {
    return cy.get('.shopping_cart_link').find('.shopping_cart_badge')
  },
  /**
   * @param {string} name Item name
   */
  addItemToCart(name) {
    cy.contains('.inventory_item', name)
      .contains('button', 'Add to cart')
      .click()
  },
}