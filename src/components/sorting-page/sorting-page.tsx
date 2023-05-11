import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState, ChangeEvent, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import style from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { randomArr } from "./sorting-page-functions";
import { bubbleSortUp, selectionSortUp, selectionSortDown, bubbleSortDown } from "./sorting-page-functions";
import { ArrayTypes } from "./sorting-page-functions";
import { waitTime } from "../../utils/wait-function";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export const SortingPage: React.FC = () => {

  const [array, newArray] = useState<ArrayTypes[]>(randomArr());
  const [radio, setRadio] = useState('bubble');
  const [loader, setLoader] = useState({
    up: false,
    down: false,
    new: false
  });

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setRadio(target.value);
  };

  //Получение новго массива
  const setNewArray = async () => {
    setLoader({ ...loader, new: true });
    await waitTime(SHORT_DELAY_IN_MS);
    newArray((randomArr()))
    setLoader({ ...loader, new: false });
  }

  //Выбор направление сортировки
  const directionSort = (direction: any) => {
    if (radio === "bubble") {
      sortBubble(array, direction);
    } else {
      sortSelection(array, direction);
    }
  };

  //Сортировка выбор
  const sortSelection = async (arr: ArrayTypes[], direction: any) => {
    if (direction === Direction.Ascending) {
      selectionSortUp(array, newArray, loader.up, setLoader)
    } else { selectionSortDown(array, newArray, loader.down, setLoader) }
  }

  //Сортировка пузырек
  const sortBubble = async (arr: ArrayTypes[], direction: any) => {
    if (direction === Direction.Ascending) {
      bubbleSortUp(array, newArray, loader.up, setLoader)
    } else { bubbleSortDown(array, newArray, loader.down, setLoader) }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.mainpanel}>
        <div className={style.radio}>
          <RadioInput
            label={'Выбор'}
            name={'selection'}
            checked={radio === 'selection' ? true : false}
            onChange={onChange}
            value={'selection'}
            disabled={loader.up === true || loader.down === true || loader.new === true}
          />
          <RadioInput
            label={'Пузырек'}
            name={'bubble'}
            onChange={onChange}
            value={'bubble'}
            checked={radio === 'bubble' ? true : false}
            disabled={loader.up === true || loader.down === true || loader.new === true}
          />
        </div>
        <div className={style.leftbutton}>
          <Button
            text={'По возрастанию'}
            extraClass={style.button}
            type={'button'}
            sorting={Direction.Ascending}
            isLoader={loader.up}
            onClick={() => directionSort(Direction.Ascending)}
            disabled={loader.down === true || loader.new === true}
          />
          <Button
            text={'По убыванию'}
            extraClass={style.button}
            type={'button'}
            sorting={Direction.Descending}
            onClick={() => directionSort(Direction.Descending)}
            isLoader={loader.down}
            disabled={loader.up === true || loader.new === true}
          />
        </div>
        <Button
          text={'Новый массив'}
          extraClass={style.button}
          type={'submit'}
          onClick={setNewArray}
          isLoader={loader.new}
          disabled={loader.up === true || loader.down === true}
        />
      </div>
      <ul className={style.array}>
        {array?.map((item: any, index: number) =>
          <Column
            key={index}
            index={item.index}
            state={item.state}
          />
        )}
      </ul>
    </SolutionLayout >
  );
};
