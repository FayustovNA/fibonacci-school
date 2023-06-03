describe('Routing', function () {
  before(function () {
    cy.visit('');
  });

  it("should navigate to the main page", () => {
    cy.visit("/");
    cy.wait(500);
    cy.contains("МБОУ АЛГОСОШ");
    cy.wait(500);
  });

  it("should navigate to the recursion page", () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/recursion");
    cy.contains("Строка");
    cy.wait(500);
  });

  it("should navigate to the Fibonacci page", () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.wait(500);
  });

  it("should navigate to the sorting page", () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/sorting");
    cy.contains("Сортировка массива");
    cy.wait(500);
  });

  it("should navigate to the stack page", () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/stack");
    cy.contains("Стек");
    cy.wait(500);
  });

  it("should navigate to the queue page", () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/queue");
    cy.contains("Очередь");
    cy.wait(500);
  });

  it("should navigate to the list page", () => {
    cy.visit("/");
    cy.wait(500);
    cy.visit("/list");
    cy.contains("Связный список");
    cy.wait(500)
  });
}); 
