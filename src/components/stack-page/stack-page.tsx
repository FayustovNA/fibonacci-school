import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FormEvent, useState, ChangeEvent } from "react";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";

export const StackPage: React.FC = () => {

  //Стейты
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    reset: false
  });
  const [stack, setStack] = useState<Array<string[]>>();

  //Время анимации
  function setTime() {
    return new Promise<void>((res) => setTimeout(res, 500));
  }

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue(target.value);
  };

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
            isLoader={loader.add}

          />
          <Button
            text={'Удалить'}
            type={'button'}
            isLoader={loader.delete}

          />
        </div>

        <Button
          text={'Очестить'}
          type={'reset'}
          isLoader={loader.reset}

        />
      </div>
      <ul className={style.line}>
        {stack?.map((item: any, index: number) =>
          <Circle key={index} letter={item.item} state={item.state} />
        )}
      </ul>
    </SolutionLayout>
  );
};
