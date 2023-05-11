import React from "react";
import { FormEvent, useState, ChangeEvent, FC } from "react";
import style from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { ElementTypes } from "../../types/element-states";
import { ElementStates } from "../../types/element-states";
import { waitTime } from "../../utils/wait-function";
import { DELAY_IN_MS } from "../../constants/delays";

const MAX_INPUT_VALUE = 11;

export const StringComponent: React.FC = () => {

  //Стейты
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [string, setSrting] = useState<Array<ElementTypes>>();

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue(target.value);
  };

  //Развертывание строки
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let itemLine: any = inputValue.split("").map((item: string) => {
      return { item, state: ElementStates.Default };
    });
    setSrting(itemLine);
    setLoader(true);

    let temp: any = null;
    const mid = Math.floor((itemLine.length) / 2);

    for (var i = 0, j = itemLine.length - 1; i < j; i++, j--) {

      if (i !== j) {
        temp = itemLine[j];
        itemLine[j].state = ElementStates.Changing;
        itemLine[i].state = ElementStates.Changing;
        await waitTime(DELAY_IN_MS);
      }
      itemLine[j] = itemLine[i];
      itemLine[i] = temp;
      itemLine[j].state = ElementStates.Modified;
      itemLine[i].state = ElementStates.Modified;
      setSrting([...itemLine]);
    }
    await waitTime(DELAY_IN_MS);
    itemLine[mid].state = ElementStates.Modified;
    setSrting([...itemLine]);
    setLoader(false);
    setInputValue("");
  };


  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          maxLength={MAX_INPUT_VALUE}
          isLimitText
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text={'Развернуть'}
          type={'submit'}
          isLoader={loader}
          disabled={!inputValue}
        />
      </form>
      <ul className={style.line}>
        {string?.map((item: any, index: number) =>
          <Circle key={index} letter={item.item} state={item.state} />
        )}
      </ul>
    </SolutionLayout>
  );
};
