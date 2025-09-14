describe("E-commerce Flow - Sauce Demo", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/v1/");
  });

  it("should log in, search for a product, add to cart, and verify cart count", () => {
    // Login
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();

    
    cy.get(".inventory_item")
      .contains("Sauce Labs Backpack")
      .should("be.visible");

    
    cy.contains("Sauce Labs Backpack")
      .parents(".inventory_item")
      .find("button")
      .click();
    cy.get(":nth-child(2) > .pricebar > .btn_primary").click();

    
    cy.get(".shopping_cart_badge").should("contain", "2");
    cy.get(".shopping_cart_link").click();
    cy.contains("Sauce Labs Backpack")
      .parents(".cart_item")
      .find("button")
      .click();
    cy.get(".cart_item").should("have.length", 1);
    cy.contains("Sauce Labs Backpack").should("not.exist");
    cy.contains("CHECKOUT").click();
    cy.get("#first-name").type("John");
    cy.get("#last-name").type("Doe");
    cy.get("#postal-code").type("12345");
    cy.get(".btn_primary.cart_button").click();
    cy.contains("FINISH").click();
    cy.contains("THANK YOU FOR YOUR ORDER").should("be.visible");
  });
});
