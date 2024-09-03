// first import the 3rd party Cypress plugins
// to make them available in every command


import 'cypress-data-session'

import 'cypress-map'


// @ts-ignore
chai.use(require('chai-sorted'))

// import custom commands
import './commands'

import 'cypress-mochawesome-reporter/register';