import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState, ChangeEvent } from "react";
import { ElementStates } from "../../types/element-states";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { stacks } from "./stack-functions";



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

  //Время анимации
  function setTime() {
    return new Promise<void>((res) => setTimeout(res, 1000));
  }

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
    await setTime()
    setStack([...stacks.getElements()])
    setInputValue("");
    await setTime()
    setLoader({ ...loader, push: false })
    setIsActive('false');
  }

  //Удаление из стека
  const popStack = async () => {
    setLoader({ ...loader, delete: true })
    setIsActive(stacks.getTop());
    await setTime();
    stacks.pop();
    setStack([...stacks.getElements()])
    await setTime();
    setLoader({ ...loader, delete: false })
    setIsActive('false');
  }

  //Очистить стек
  const cleanStack = async () => {
    setLoader({ ...loader, reset: true })
    await setTime()
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
            maxLength={4}
            isLimitText
            value={inputValue}
            onChange={onChange}
          />
          <Button
            text={'Добавить'}
            type={'submit'}
            isLoader={loader.push}
            onClick={pushStack}
            disabled={!inputValue}

          />
          <Button
            text={'Удалить'}
            type={'button'}
            isLoader={loader.delete}
            onClick={popStack}
            disabled={stacks.isEmpty()}
          />
        </div>

        <Button
          text={'Очистить'}
          type={'reset'}
          isLoader={loader.reset}
          onClick={cleanStack}
          disabled={stacks.isEmpty()}
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
