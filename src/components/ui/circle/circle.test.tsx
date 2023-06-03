
import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from '../../../types/element-states';

// Проверяем при помощи снэпшотов корректную отрисовку элемента:
// без буквы;
// с буквами;
// с head;
// с react-элементом в head;
// с tail;
// с react-элементом в tail;
// с index;
// с пропом isSmall ===  true;
// в состоянии default;
// в состоянии changing;
// в состоянии modified.

describe("Circle component", () => {
    it("renders without letter", () => {
        const circle = renderer.create(<Circle letter="" />).toJSON();
        expect(circle).toMatchSnapshot();
      });
    
    it("renders with letter", () => {
        const circle = renderer.create(<Circle letter="A" />).toJSON();
        expect(circle).toMatchSnapshot();
      });

    it("renders with head", () => {
        const circle = renderer.create(<Circle head="head" />).toJSON();
        expect(circle).toMatchSnapshot();
      });

    it("renders with  react element in head", () => {
        const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
      });

    it("renders with tail", () => {
        const circle = renderer.create(<Circle tail="tail" />).toJSON();
        expect(circle).toMatchSnapshot();
      });
    
      it("renders with  react element in tail", () => {
        const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
      });

      it("renders with index", () => {
        const circle = renderer.create(<Circle index={0} />).toJSON();
        expect(circle).toMatchSnapshot();
      });

      it("renders with isSmall prop", () => {
        const circle = renderer.create(<Circle isSmall />).toJSON();
        expect(circle).toMatchSnapshot();
      });

      it("renders in default state", () => {
        const circle = renderer.create(<Circle state={ElementStates.Default}  />).toJSON();
        expect(circle).toMatchSnapshot();
      });

      it("renders in changing state", () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing}  />).toJSON();
        expect(circle).toMatchSnapshot();
      });

      it("renders in modified state", () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified}  />).toJSON();
        expect(circle).toMatchSnapshot();
      });

});