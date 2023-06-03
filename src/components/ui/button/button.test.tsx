import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

// Тестирование компонента Button
// Проверяем при помощи снэпшотов корректную отрисовку:
// кнопки с текстом;
// кнопки без текста;
// заблокированной кнопки;
// кнопки с индикацией загрузки.
// Проверяем корректность вызова колбека при клике на кнопку

describe("Button", () => {
    it("renders correctly with text prop", () => {
      const button = renderer.create(<Button text="Sort" />).toJSON();
      expect(button).toMatchSnapshot();
    });

    it("renders correctly without text prop", () => {
      const button = renderer.create(<Button text="" />).toJSON();
      expect(button).toMatchSnapshot();
    });
  
    it("renders correctly with disabled prop", () => {
      const button  = renderer.create(<Button disabled />);
      expect(button).toMatchSnapshot();
    });

      it("renders correctly with isLoader prop", () => {
      const button  = renderer.create(<Button isLoader />);
      expect(button).toMatchSnapshot();
    });

    it("correctly calls the callback function", () => {
      window.alert = jest.fn();
      render(<Button text="Sort" onClick={() => alert("Сallback!")} />);
      const button = screen.getByText("Sort");
      fireEvent.click(button);
      expect(window.alert).toHaveBeenCalledWith("Сallback!");
    });
    
  });