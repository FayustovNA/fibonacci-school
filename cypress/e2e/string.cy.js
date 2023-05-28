import { DEFAULT, MODIFIED, circle } from '../constans';

describe("String Component", () => {
    beforeEach(() => {
      cy.visit("/recursion");
      cy.wait(500);
    });

    it("should disable button if input is empty", () => {
      cy.get("Input").should("have.value", "");
      cy.contains("Развернуть").should("be.disabled");
    });
  
    
    it("should reverse string correctly", () => {

     const input = "web+";
     cy.get("Input").type(input).should('have.value', input);;
     cy.contains('Развернуть').should("not.be.disabled").click();
  

     cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains('w');
     cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains('e');
     cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains('b');
     cy.get(circle).eq(3).should("have.css", "border", DEFAULT).contains('+');
     cy.wait(500);

     cy.get(circle).eq(0).should("have.css", "border", MODIFIED).contains('+');
     cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains('e');
     cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains('b');
     cy.get(circle).eq(3).should("have.css", "border", MODIFIED).contains('w');
     cy.wait(500);

     cy.get(circle).eq(0).should("have.css", "border", MODIFIED).contains('+');
     cy.get(circle).eq(1).should("have.css", "border", MODIFIED).contains('b');
     cy.get(circle).eq(2).should("have.css", "border", MODIFIED).contains('e');
     cy.get(circle).eq(3).should("have.css", "border", MODIFIED).contains('w');
     cy.wait(500);

     cy.get("Input").should("have.value", "");
      cy.contains('Развернуть').should("be.disabled");  

  })
})