import { CHANGING, DEFAULT, MODIFIED, circle, circleContent, circleLine, circleSmall } from "../constans";

describe("Linked List Component", () => {
  beforeEach(() => {
    cy.visit("/list");
    cy.wait(500);
  });

  it("should disable buttons if input is empty", () => {
    cy.get("Input").should("have.value", "");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить в head").should("be.disabled");
  });

  it('should render default list', () => {
    cy.get(circleContent).first().contains('head')
    cy.get(circle).should('have.css', 'border', DEFAULT)
    cy.get(circleContent).last().contains('tail')
  });

  it('should add element to head', () => {
    cy.get('[name="value"]').type('A').should("have.value", "A");
    cy.contains('Добавить в head').should("not.be.disabled").click();
    cy.get(circleSmall).eq(0).should('have.css', 'border', CHANGING).contains('A');
    cy.wait(500);
    cy.get(circle).first().should("have.css", "border", MODIFIED).contains('A');
    cy.get(circleContent).first().contains('head');
    cy.wait(500);
    cy.get(circle).first().should("have.css", "border", DEFAULT).contains('A');
  });

  it('should add element to tail', () => {
    cy.get('[name="value"]').type('A').should("have.value", "A");
    cy.contains('Добавить в tail').should("not.be.disabled").click();
    cy.get(circleSmall).eq(0).should('have.css', 'border', CHANGING).contains('A');
    cy.wait(500);
    cy.get(circle).last().should("have.css", "border", MODIFIED).contains('A');
    cy.get(circleContent).first().contains('head');
    cy.get(circleContent).last().contains('tail');
    cy.wait(500);
    cy.get(circle).last().should("have.css", "border", DEFAULT).contains('A');
  });

  it('should delete element from head', () => {
    cy.get(circleContent).first().contains('head');
    cy.contains('Удалить из head').should('not.be.disabled').click();
    cy.get(circleContent).first().contains('head');
    cy.get(circleSmall).eq(0).should('have.css', 'border', CHANGING).should('not.be.empty');
    cy.wait(1000);
    cy.get(circleContent).first().contains('head');
    cy.get(circle).first().should("have.css", "border", DEFAULT).should('not.be.empty');
  });

  it('should delete element from tail', () => {
    cy.get(circleContent).last().contains('tail');
    cy.contains('Удалить из tail').should('not.be.disabled').click();
    cy.get(circleSmall).eq(0).should('have.css', 'border', CHANGING).should('not.be.empty');
    cy.wait(1000);
    cy.get(circleContent).last().contains('tail');
    cy.get(circle).last().should("have.css", "border", DEFAULT).should('not.be.empty');
  });

  it('should add element by index', () => {
    const inputIndex = 2;
    cy.get('[name="value"]').type('A').should("have.value", "A");
    cy.get('[name="index"]').type(inputIndex).should("have.value", inputIndex);
    cy.contains('Добавить по индексу').should('not.be.disabled').click();
    cy.get(circle).eq(0).should("have.css", "border", CHANGING);
    cy.get(circleSmall).eq(0).should('have.css', 'border', CHANGING).contains('A');
    cy.wait(1000);
    cy.get(circleSmall).eq(0).should('have.css', 'border', CHANGING).contains('A');
    cy.get(circle).eq(1).should("have.css", "border", CHANGING);
    cy.wait(1000);
    cy.get(circle).eq(2).should("have.css", "border", DEFAULT).contains('A');
    cy.get(circle).should('have.css', 'border', DEFAULT);
    cy.get(circleContent).last().contains('tail');
    cy.get(circleContent).first().contains('head');
  });

  it('should delete element by index', () => {
    const inputIndex = 2;
    cy.get('[name="index"]').type(inputIndex).should("have.value", inputIndex);
    cy.contains('Удалить по индексу').should('not.be.disabled').click();
    cy.get(circle).eq(0).should("have.css", "border", CHANGING);
    cy.wait(1000);
    cy.get(circle).eq(0).should("have.css", "border", CHANGING);
    cy.get(circle).eq(1).should("have.css", "border", CHANGING);
    cy.get(circle).eq(2).should("have.css", "border", CHANGING);
    cy.get(circleSmall).should('have.css', 'border', CHANGING).should('not.be.empty');
    cy.wait(1000);
    cy.get(circle).should('have.css', 'border', DEFAULT);
    cy.get(circleContent).last().contains('tail');
    cy.get(circleContent).first().contains('head');
  });

})
