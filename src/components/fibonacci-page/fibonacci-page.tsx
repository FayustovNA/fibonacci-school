import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FormEvent, useState, ChangeEvent } from "react";
import style from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { getFibonacciNumbers } from "./fibonacci-functions";
import { waitTime } from "../../utils/wait-function";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const MIN_INPUT_NUMBER = 1;
const MAX_INPUT_NUMBER = 19;

export const FibonacciPage: React.FC = () => {

  //Стейты
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [fiboArr, setFiboArray] = useState<Array<number>>();

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue(target.value);
  };

  //Расчет последовательности Фибоначчи
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const fiboArray = getFibonacciNumbers(Number(inputValue));
    for (let i = 0; i < fiboArray.length; i++) {
      await waitTime(SHORT_DELAY_IN_MS);;
      setFiboArray(fiboArray.slice(0, i + 1));
    }
    setLoader(false);
    setInputValue("");
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          type="number"
          max={MAX_INPUT_NUMBER}
          min={MIN_INPUT_NUMBER}
          value={inputValue}
          onChange={onChange}
          isLimitText={true}
          placeholder="Введите чило"
          disabled={loader === true}
        />
        <Button
          text={'Рассчитать'}
          type={'submit'}
          isLoader={loader}
          disabled={!inputValue || Number(inputValue) > MAX_INPUT_NUMBER || Number(inputValue) < MIN_INPUT_NUMBER}
        />
      </form>
      <ul className={style.line}>
        {fiboArr?.map((item: number, index: number) =>
          <Circle key={index} letter={String(item)} index={index} />
        )}
      </ul>
    </SolutionLayout>
  );
};
