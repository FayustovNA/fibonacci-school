import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState, ChangeEvent } from "react";
import { ElementStates } from "../../types/element-states";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { stacks } from "./stack-functions";
import { waitTime } from "../../utils/wait-function";
import { DELAY_IN_MS } from "../../constants/delays";

const MAX_LENGTH_INPUT_VALUE = 4;

export const StackPage: React.FC = () => {

  //Стейты
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState({
    push: false,
    delete: false,
    reset: false
  });
  const [stack, setStack] = useState<Array<any>>();
  const [isActive, setIsActive] = useState<any>(null);

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue(target.value);
  };

  //Добавление в стек
  const pushStack = async () => {
    setLoader({ ...loader, push: true })
    setIsActive(stacks.getTop());
    stacks.push(inputValue);
    await waitTime(DELAY_IN_MS);
    setStack([...stacks.getElements()])
    setInputValue("");
    await waitTime(DELAY_IN_MS);
    setLoader({ ...loader, push: false })
    setIsActive('false');
  }

  //Удаление из стека
  const popStack = async () => {
    setLoader({ ...loader, delete: true })
    setIsActive(stacks.getTop());
    await waitTime(DELAY_IN_MS);
    stacks.pop();
    setStack([...stacks.getElements()])
    await waitTime(DELAY_IN_MS);
    setLoader({ ...loader, delete: false })
    setIsActive('false');
  }

  //Очистить стек
  const cleanStack = async () => {
    setLoader({ ...loader, reset: true })
    await waitTime(DELAY_IN_MS);
    stacks.cleanStack();
    setStack([...stacks.getElements()])
    setInputValue("");
    setIsActive('false')
    setLoader({ ...loader, reset: false })
  }

  return (
    <SolutionLayout title="Стек">
      <div className={style.form}>
        <div className={style.forminput}>
          <Input
            maxLength={MAX_LENGTH_INPUT_VALUE}
            isLimitText
            value={inputValue}
            onChange={onChange}
            disabled={loader.delete || loader.push || loader.reset}
          />
          <Button
            text={'Добавить'}
            type={'submit'}
            isLoader={loader.push}
            onClick={pushStack}
            disabled={!inputValue || loader.delete || loader.reset}

          />
          <Button
            text={'Удалить'}
            type={'button'}
            isLoader={loader.delete}
            onClick={popStack}
            disabled={stacks.isEmpty() || loader.push || loader.reset}
          />
        </div>

        <Button
          text={'Очистить'}
          type={'reset'}
          isLoader={loader.reset}
          onClick={cleanStack}
          disabled={stacks.isEmpty() || loader.push || loader.delete}
        />
      </div>
      <ul className={style.line}>
        {stack?.map((item: any, index: number) =>
          <Circle
            key={index}
            index={index}
            letter={item}
            head={index + 1 === stacks.getTop() && !stacks.isEmpty() ? 'top' : ""}
            state={index === isActive ? ElementStates.Changing : ElementStates.Default} />
        )}
      </ul>
    </SolutionLayout>
  );
};
