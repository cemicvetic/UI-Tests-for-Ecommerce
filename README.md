# UI Tests for E-commerce 🛒

Welcome to the **UI Tests for E-commerce** project! This repository contains end-to-end (E2E) tests for an e-commerce platform using Cypress. ✨

## Project Structure 📁

Here's a quick overview of the project structure:
```plaintext
📦 UI-Tests-for-Ecommerce
├── 📂 .idea
├── 📂 cypress
│ ├── 📂 e2e
│ │ ├── 📂 cart
│ │ ├── 📂 checkout
│ │ ├── 📂 inventory
│ │ ├── 📂 login
│ │ ├── index.ts
│ │ └── spec.cy.js
│ ├── 📂 fixtures
│ ├── 📂 support
│ │ ├── 📂 pages
│ │ │ ├── commands.ts
│ │ │ ├── component-index.html
│ │ │ ├── component.js
│ │ │ └── index.d.ts
│ ├── 📂 videos
├── 📂 node_modules
├── 📂 taste-the-sauce
├── .gitignore
├── README.md
├── cypress.config.js

```


## Installation 🛠️

Clone the repository:
   ```sh
   git clone https://github.com/cemicvetic/UI-Tests-for-Ecommerce.git
   ```
## Navigate to the project directory:



  ```sh
cd UI-Tests-for-Ecommerce
 ```
## Install dependencies:

  ```sh

npm install
 ```

## Running Tests 🚀

  ```sh

npm run cy:open
 ```
This will open the Cypress Test Runner, where you can run individual test files.

## Folder Structure 🗂️
```plaintext
cypress/e2e: Contains the E2E test files categorized into different modules such as cart, checkout, inventory, and login.
cypress/fixtures: Contains test data.
cypress/support: Contains custom commands and utility functions.
The pages folder inside it includes the page objects.
 ```
