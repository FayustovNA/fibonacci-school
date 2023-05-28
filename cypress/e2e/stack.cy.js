import { CHANGING, DEFAULT, circle, circleContent, circleLine } from "../constans";


describe("Stack Component", () => {
    beforeEach(() => {
      cy.visit("/stack");
      cy.wait(500);
    });
  
    it("should disable buttons if input is empty", () => {
      cy.get("Input").should("have.value", "");
      cy.contains("Добавить").should("be.disabled");
      cy.contains("Удалить").should("be.disabled");
      cy.contains("Очистить").should("be.disabled");
    });

    it("should disable buttons if input is not empty", () => {
        const input = "web+";
        cy.get("Input").type(input).should('have.value', input);;
        cy.contains("Добавить").should("not.be.disabled");
        cy.contains("Удалить").should("be.disabled");
        cy.contains("Очистить").should("be.disabled");
      });


    it('should add items to the stack correctly', () => {
        const input1 = "we";
        cy.get("Input").type(input1).should('have.value', input1);;
        cy.contains('Добавить').should("not.be.disabled").click();
        cy.get(circle).eq(0).should("have.css", "border", CHANGING).contains(input1);
        cy.wait(500);
        cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(input1);
        cy.get(circleContent).children("div:first").should("have.text", "top");
        cy.wait(500);
        cy.get("Input").should("have.value", "");

        const input2 = "b+";
        cy.get("Input").type(input2).should('have.value', input2);;
        cy.contains('Добавить').should("not.be.disabled").click();
        cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(input1);
        cy.get(circle).eq(1).should("have.css", "border", CHANGING).contains(input2);
        cy.wait(500);
        cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(input1);
        cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(input2);
        cy.get(circleContent).eq(1).children("div:first").should("have.text", "top");
        cy.get("Input").should("have.value", "");
  
        const input3 = "15";
        cy.get("Input").type(input3).should('have.value', input3);;
        cy.contains('Добавить').should("not.be.disabled").click();
        cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(input1);
        cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(input2);
        cy.get(circle).eq(2).should("have.css", "border", CHANGING).contains(input3);
        cy.wait(500);
        cy.get(circle).eq(0).should("have.css", "border", DEFAULT).contains(input1);
        cy.get(circle).eq(1).should("have.css", "border", DEFAULT).contains(input2);
        cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains(input3);
        cy.get(circleContent).eq(0).children("div:first").should("not.have.text", "top");
        cy.get(circleContent).eq(1).children("div:first").should("not.have.text", "top");
        cy.get(circleContent).eq(2).children("div:first").should("have.text", "top");

        cy.get("Input").should("have.value", "");
        })



    it('should delete item from the stack correctly', () => {
     const input = ['We', "b+", '15'];

     input.map((item) => {
        cy.get("Input").type(item).should('have.value', item);
        cy.contains('Добавить').should("not.be.disabled").click();
        cy.wait(500);
        });

     cy.contains('Удалить').should("not.be.disabled").click();
     cy.get(circle).eq(2).should("have.css", "border", CHANGING).contains("15");
     cy.wait(500);

     cy.get(circle).should('have.length', 2);
     cy.get(circleContent).eq(1).children("div:first").should("have.text", "top");
     cy.get("Input").should("have.value", "");
        })


    it('should clean the stack correctly', () => {
        const input = ['We', "b+", '15'];

        input.map((item) => {
            cy.get("Input").type(item).should('have.value', item);
            cy.contains('Добавить').should("not.be.disabled").click();
            cy.wait(500);
             });

        cy.contains('Очистить').should("not.be.disabled").click();
        cy.wait(500);

        cy.get("Input").should("have.value", "");
        cy.contains("Добавить").should("be.disabled");
        cy.contains("Удалить").should("be.disabled");
        cy.get(circleContent).should('have.length', 0);

        })
})
