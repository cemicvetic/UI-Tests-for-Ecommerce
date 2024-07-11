import { LoginInfo } from '..'
import { LoginPage } from '../../support/pages/login.page'
import { InventoryPage } from '../../support/pages/inventory.page'
import { InventoryData } from '../../fixtures/inventory-data'
import { CheckoutPage } from '../../support/pages/checkout.page'

const users = Cypress.env('users')
const item = Cypress._.sample(InventoryData)


