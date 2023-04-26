import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FormEvent, useState, ChangeEvent } from "react";
import style from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";

export const FibonacciPage: React.FC = () => {

  //Стейты
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [fiboArr, setFiboArray] = useState<Array<number>>();

  //Время анимации
  function setTime() {
    return new Promise<void>((res) => setTimeout(res, 500));
  }

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue(target.value);
  };

  //Расчет последовательности Фибоначчи
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    // if (Number(inputValue) == 1) {
    //   let fiboArr = [];
    //   fiboArr.push(0);
    //   setFiboArray([...fiboArr])
    //   await setTime();
    //   fiboArr.push(1);
    //   setFiboArray([...fiboArr])
    // }
    // let fiboArr = [0];
    // setFiboArray([...fiboArr])
    // await setTime();
    // fiboArr.push(1);
    // setFiboArray([...fiboArr])
    // await setTime();
    // for (let i = 2; i <= Number(inputValue); i++) {
    //   const prevNum1 = fiboArr[i - 1];
    //   const prevNum2 = fiboArr[i - 2];
    //   fiboArr.push(prevNum1 + prevNum2);
    //   setFiboArray([...fiboArr])
    //   await setTime();
    // }
    // setLoader(false);
    // setInputValue("");
    // console.log(fiboArr)

    let initArr = [0, 1]
    for (let i = 2; i <= Number(inputValue); i++) {
      const prevNum1 = initArr[i - 1];
      const prevNum2 = initArr[i - 2];
      initArr.push(prevNum1 + prevNum2);
    };

    for (let i = 0; i < initArr.length; i++) {
      await setTime();;
      setFiboArray(initArr.slice(0, i + 1));
    }
    setLoader(false);
    setInputValue("");
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          type="number"
          max={19}
          min={1}
          value={inputValue}
          onChange={onChange}
          isLimitText={true}
          placeholder="Введите чило"
        />
        <Button
          text={'Рассчитать'}
          type={'submit'}
          isLoader={loader}
          disabled={!inputValue || Number(inputValue) > 19 || Number(inputValue) < 1}
        />
      </form>
      <ul className={style.line}>
        {fiboArr?.map((item: any, index: number) =>
          <Circle key={index} letter={String(item)} index={index} />
        )}
      </ul>
    </SolutionLayout>
  );
};
