import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { useState, ChangeEvent, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { linkedList, Node } from "./list-page-functions";


export const ListPage: React.FC = () => {

  const [list, setList] = useState<Node<string>[]>(linkedList.toArray());
  console.log(list)
  const [inputValue, setInputValue] = useState({
    value: '',
    index: '',
  });

  const [loader, setLoader] = useState({
    pushTail: false,
    pushHead: false,
    deleteTail: false,
    deleteHead: false,
    pushIndex: false,
    deleteIndex: false,
    isLock: false,
  });

  const [isActive, setIsActive] = useState<any>(null);
  const [isActiveTail, setIsActiveTail] = useState<any>(null);
  const [isActiveIndex, setIsActiveIndex] = useState<any>(null);
  const [circleValue, setCircleValue] = useState<any>(null);

  //Время анимации
  function setTime() {
    return new Promise<void>((res) => setTimeout(res, 500));
  }

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue({ ...inputValue, [target.name]: target.value });
  };

  //Добавить в начало
  const addHead = async () => {
    setLoader({ ...loader, pushHead: true, isLock: true })
    setIsActive(0)
    setCircleValue(inputValue.value)
    // addSmallCircleTop(0)
    await setTime();
    linkedList.pushHead(inputValue.value)
    setIsActive(null)
    setList([...linkedList.toArray()])
    console.log(list)
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushHead: false, isLock: false });
  }

  //Добавить в конец
  const addTail = async () => {
    setLoader({ ...loader, pushTail: true, isLock: true });
    setIsActiveTail(linkedList.getSize() - 1)
    setCircleValue(inputValue.value)
    // addSmallCircleTail(linkedList.getSize() - 1)
    await setTime();
    linkedList.pushTail(inputValue.value)
    setIsActiveTail(null)
    setList([...linkedList.toArray()])
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushTail: false, isLock: false });
  }

  //Удалить из начала
  const deleteHead = async () => {
    setLoader({ ...loader, deleteHead: true, isLock: true });
    setIsActive(0)
    setCircleValue(linkedList.getHead()!.value)
    await setTime();
    linkedList.deleteHead()
    setIsActive(null)
    setList([...linkedList.toArray()])
    setLoader({ ...loader, deleteHead: false, isLock: false });
  }

  //Удалить из конца
  const deleteTail = async () => {
    setLoader({ ...loader, deleteTail: true, isLock: true });
    setIsActiveTail(linkedList.getSize() - 1)
    setCircleValue(linkedList.getTail()!.value)
    await setTime();
    linkedList.deleteTail()
    setIsActiveTail(null)
    setList([...linkedList.toArray()])
    setLoader({ ...loader, deleteTail: false, isLock: false });
  }

  //Добавить по индексу
  const addByIndex = async () => {
    setLoader({ ...loader, pushIndex: true });
    setIsActiveIndex(Number(inputValue.index));
    setCircleValue(inputValue.value)
    await setTime();
    linkedList.pushByIndex(Number(inputValue.index), inputValue.value)
    setIsActiveIndex(null)
    setList([...linkedList.toArray()])
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushIndex: false });
  }

  //Удалить по индексу
  const deleteByIndex = async () => {
    setLoader({ ...loader, deleteIndex: true });
    setIsActiveIndex(Number(inputValue.index));
    let currentValue = linkedList.findElement(Number(inputValue.index))
    setCircleValue(currentValue.value)
    await setTime();
    linkedList.deleteByIndex(Number(inputValue.index))
    setIsActiveIndex(null)
    setList([...linkedList.toArray()])
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteIndex: false });
  }

  //Отображение isSmall / head / tail
  const addSmallCircleTop = (index: number) => {
    if (isActive === index || isActiveIndex === index) {
      return (
        <Circle isSmall letter={circleValue} state={ElementStates.Changing} />
      );
    } else if (index === 0) {
      return "head";
    } else {
      return null;
    }
  };

  const addSmallCircleTail = (index: number) => {
    if (isActiveTail === index) {
      return (
        <Circle isSmall letter={circleValue} state={ElementStates.Changing} />
      );
    } else if (index === linkedList.getSize() - 1) {
      return "tail";
    } else {
      return null;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={style.form}>
        <div className={style.forminputvalue}>
          <Input
            maxLength={4}
            isLimitText
            name='value'
            value={inputValue.value}
            onChange={onChange}
            placeholder="Введите значение"
            disabled={loader.isLock === true}
          />
          <Button
            text={'Добавить в head'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.pushHead}
            onClick={addHead}
            disabled={!inputValue.value || loader.isLock === true}
          />
          <Button
            text={'Добавить в tail'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.pushTail}
            onClick={addTail}
            disabled={!inputValue.value || loader.isLock === true}
          />
          <Button
            text={'Удалить из head'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.deleteHead}
            onClick={deleteHead}
            disabled={linkedList.isEmpty() || loader.isLock === true}
          />
          <Button
            text={'Удалить из tail'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.deleteTail}
            onClick={deleteTail}
            disabled={linkedList.isEmpty() || loader.isLock === true}
          />
        </div>

        <div className={style.forminputindex}>
          <Input
            type="number"
            name='index'
            value={inputValue.index}
            onChange={onChange}
            placeholder="Введите индекс"
            disabled={loader.isLock === true}
          />
          <Button
            text={'Добавить по индексу'}
            type={'button'}
            extraClass={style.button_max}
            isLoader={loader.pushIndex}
            onClick={addByIndex}
            disabled={!inputValue.index || !inputValue.value ||
              loader.isLock === true ||
              Number(inputValue.index) > linkedList.getSize() - 1 ||
              Number(inputValue.index) < 0
            }
          />
          <Button
            text={'Удалить по индексу'}
            type={'button'}
            extraClass={style.button_max}
            isLoader={loader.deleteIndex}
            onClick={deleteByIndex}
            disabled={linkedList.isEmpty() || !inputValue.index ||
              loader.isLock === true ||
              Number(inputValue.index) > linkedList.getSize() - 1 ||
              Number(inputValue.index) < 0
            }
          />
        </div>
      </div>
      <ul className={style.line}>
        {list?.map((item: any, index: number) =>
          <div className={style.lineitem} key={index}>
            <Circle
              key={index}
              letter={item.value}
              index={index}
              extraClass={style.circle}
              tail={addSmallCircleTail(index)}
              head={addSmallCircleTop(index)}
              state={isActive && isActiveTail === index ? ElementStates.Changing : ElementStates.Default}
            />
            {index !== list.length - 1 && <ArrowIcon />}
          </div>

        )}
      </ul>
    </SolutionLayout>
  );
};
