import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState, ChangeEvent, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";


export const ListPage: React.FC = () => {



  return (
    <SolutionLayout title="Связный список">
      <div className={style.form}>
        <div className={style.forminputvalue}>
          <Input
            maxLength={4}
            isLimitText
            // value={inputValue}
            // onChange={onChange}
            placeholder="Введите значение"
          />
          <Button
            text={'Добавить в head'}
            type={'button'}
            extraClass={style.button}
          // isLoader={loader.enqueue}
          // onClick={enQueue}
          // disabled={!inputValue}
          />
          <Button
            text={'Добавить в tail'}
            type={'button'}
            extraClass={style.button}
          // isLoader={loader.enqueue}
          // onClick={enQueue}
          // disabled={!inputValue}
          />
          <Button
            text={'Удалить из head'}
            type={'button'}
            extraClass={style.button}
          // isLoader={loader.dequeue}
          // onClick={deQueue}
          // disabled={queue.isEmpty()}
          />
          <Button
            text={'Удалить из tail'}
            type={'button'}
            extraClass={style.button}
          // isLoader={loader.dequeue}
          // onClick={deQueue}
          // disabled={queue.isEmpty()}
          />
        </div>

        <div className={style.forminputindex}>
          <Input
            type="number"
            // value={inputValue}
            // onChange={onChange}
            placeholder="Введите индекс"
          />
          <Button
            text={'Добавить по индексу'}
            type={'button'}
            extraClass={style.button_max}
          // isLoader={loader.reset}
          // onClick={resetQueue}
          // disabled={queue.isEmpty()}
          />
          <Button
            text={'Удалить по индексу'}
            type={'button'}
            extraClass={style.button_max}
          // isLoader={loader.reset}
          // onClick={resetQueue}
          // disabled={queue.isEmpty()}
          />
        </div>
      </div>
      {/* <ul className={style.line}>
        {queues?.map((item: any, index: number) =>
          <Circle
            key={index}
            letter={item}
            index={index}
            head={index === queue.getHead() && !queue.isEmpty() ? 'head' : ""}
            tail={index + 1 === queue.getTail() && !queue.isEmpty() ? 'tail' : ""}
            state={index === isActive ? ElementStates.Changing : ElementStates.Default}
          />
        )}
      </ul> */}
    </SolutionLayout>
  );
};
