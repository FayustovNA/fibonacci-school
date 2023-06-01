import { DEFAULT, circle } from '../constans';

describe("Fibonacci Component", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
    cy.wait(500);
  });

  it("should disable button if input is empty", () => {
    cy.get("Input").should("have.value", "");
    cy.contains("Рассчитать").should("be.disabled");
  });

  it("should generate numbers correctly", () => {
    const input = 6;
    cy.get("Input").type(input).should('have.value', input);;
    cy.contains('Рассчитать').should("not.be.disabled").click();

    cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(0);
    cy.wait(500);
    cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(0);
    cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(1);
    cy.wait(500);
    cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(0);
    cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(1);
    cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains(1);
    cy.wait(500);
    cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(0);
    cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(1);
    cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains(1);
    cy.get(circle).eq(3).should("have.css", "border", DEFAULT).contains(2);
    cy.wait(500);
    cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(0);
    cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(1);
    cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains(1);
    cy.get(circle).eq(3).should("have.css", "border", DEFAULT).contains(2);
    cy.get(circle).eq(4).should("have.css", "border", DEFAULT).contains(3);
    cy.wait(500);
    cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(0);
    cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(1);
    cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains(1);
    cy.get(circle).eq(3).should("have.css", "border", DEFAULT).contains(2);
    cy.get(circle).eq(4).should("have.css", "border", DEFAULT).contains(3);
    cy.get(circle).eq(5).should("have.css", "border", DEFAULT).contains(5);
    cy.wait(500);

    cy.get("Input").should("have.value", "");
    cy.contains("Рассчитать").should("be.disabled");
  });
})