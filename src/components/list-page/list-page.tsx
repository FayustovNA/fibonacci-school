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
import { waitTime } from "../../utils/wait-function";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { valueToNode } from "@babel/types";

const MAX_LENGTH_INPUT_VALUE = 4;

export const ListPage: React.FC = () => {

  const [list, setList] = useState<Node<any>[]>(linkedList.toArray());
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

  //Cтейты анимации удаления и добавления элементов
  const [isActive, setIsActive] = useState<any>(null);
  const [isActiveDelete, setIsActiveDelete] = useState<any>(null);
  const [isActiveTail, setIsActiveTail] = useState<any>(null);
  const [isActiveTailDelete, setIsActiveTailDelete] = useState<any>(null);
  const [isActiveIndex, setIsActiveIndex] = useState<any>(null);
  const [isActiveIndexDelete, setIsActiveIndexDelete] = useState<any>(null);
  const [circleValue, setCircleValue] = useState<any>(null);

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue({ ...inputValue, [target.name]: target.value });
  };

  //Добавить в начало
  const addHead = async () => {
    setLoader({ ...loader, pushHead: true, isLock: true })
    setIsActive(0);
    setCircleValue(inputValue.value);
    linkedList.pushHead(inputValue.value);
    await waitTime(SHORT_DELAY_IN_MS);
    setIsActive(null);
    let list = linkedList.toArray()
    setList(list)
    list[0].state = ElementStates.Modified;
    setList([...linkedList.toArray()])
    await waitTime(SHORT_DELAY_IN_MS);
    list[0].state = ElementStates.Default;
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushHead: false, isLock: false });
  }

  //Добавить в конец
  const addTail = async () => {
    setLoader({ ...loader, pushTail: true, isLock: true });
    setIsActiveTail(linkedList.getSize() - 1)
    setCircleValue(inputValue.value)
    await waitTime(SHORT_DELAY_IN_MS);
    linkedList.pushTail(inputValue.value)
    setIsActiveTail(null)
    let list = linkedList.toArray()
    setList(list)
    setList([...linkedList.toArray()])
    list[linkedList.getSize() - 1].state = ElementStates.Modified;
    setList([...linkedList.toArray()])
    await waitTime(SHORT_DELAY_IN_MS);
    list[linkedList.getSize() - 1].state = ElementStates.Default;
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushTail: false, isLock: false });
  }

  //Удалить из началаs
  const deleteHead = async () => {
    setLoader({ ...loader, deleteHead: true, isLock: true });
    setIsActiveDelete(0)
    setCircleValue(linkedList.getHead()!.value)
    linkedList.getHead()!.value = '';
    await waitTime(SHORT_DELAY_IN_MS);
    linkedList.deleteHead()
    setIsActiveDelete(null)
    setList([...linkedList.toArray()])
    setLoader({ ...loader, deleteHead: false, isLock: false });
  }

  //Удалить из конца
  const deleteTail = async () => {
    setLoader({ ...loader, deleteTail: true, isLock: true });
    setIsActiveTailDelete(linkedList.getSize() - 1)
    setCircleValue(linkedList.getTail()!.value)
    linkedList.getTail()!.value = '';
    await waitTime(SHORT_DELAY_IN_MS);
    linkedList.deleteTail()
    setIsActiveTailDelete(null)
    setList([...linkedList.toArray()])
    setLoader({ ...loader, deleteTail: false, isLock: false });
  }

  //Добавить по индексу
  const addByIndex = async () => {
    setLoader({ ...loader, pushIndex: true, isLock: true });
    setCircleValue(inputValue.value)

    for (let i = 0; i <= Number(inputValue.index); i++) {
      setIsActiveIndex(i);
      list[i].state = ElementStates.Changing
      setList([...linkedList.toArray()])
      await waitTime(SHORT_DELAY_IN_MS);
    }

    linkedList.pushByIndex(Number(inputValue.index), inputValue.value)
    await waitTime(SHORT_DELAY_IN_MS);
    setIsActiveIndex(null)

    setList(linkedList.toArray())
    let newList = linkedList.toArray();

    setList(newList); // сетит полный лист
    setList(linkedList.toArray()) // сетит старый лист!!!

    //Не могу понять почему не сетит новый лист, поэтому не правильно вешается modified на элемент по активному индексу
    console.log(newList)
    console.log(list)

    list.forEach((item) => { item.state = ElementStates.Default })
    setList([...linkedList.toArray()]);
    await waitTime(SHORT_DELAY_IN_MS);

    list[Number(inputValue.index)].state = ElementStates.Modified;
    setList([...linkedList.toArray()])

    await waitTime(SHORT_DELAY_IN_MS);
    list[Number(inputValue.index)].state = ElementStates.Default
    setList([...linkedList.toArray()])

    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushIndex: false, isLock: false });
  }


  //Удалить по индексу
  const deleteByIndex = async () => {
    setLoader({ ...loader, deleteIndex: true, isLock: true });
    let currentValue = linkedList.findElement(Number(inputValue.index))
    setCircleValue(currentValue.value)

    for (let i = 0; i <= Number(inputValue.index); i++) {
      list[i].state = ElementStates.Changing
      setList([...linkedList.toArray()])
      await waitTime(SHORT_DELAY_IN_MS);
    }

    linkedList.findElement(Number(inputValue.index))!.value = '';

    await waitTime(SHORT_DELAY_IN_MS);
    setIsActiveIndexDelete(Number(inputValue.index));

    await waitTime(SHORT_DELAY_IN_MS);
    linkedList.deleteByIndex(Number(inputValue.index))
    setIsActiveIndexDelete(null)
    list.forEach((item) => { item.state = ElementStates.Default })

    setList([...linkedList.toArray()])
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteIndex: false, isLock: false });
  }

  //Отображение isSmall над и под элементом
  const addSmallCircleTop = (index: number) => {
    if (isActive === index || isActiveIndex === index || isActiveTail === index) {
      return (
        <Circle isSmall letter={circleValue} state={ElementStates.Changing} />
      );
    } else if (index === 0) {
      return "head";
    } else {
      return null;
    }
  };

  const addSmallCircleBottom = (index: number) => {
    if (isActiveDelete === index || isActiveTailDelete === index || isActiveIndexDelete === index) {
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
            maxLength={MAX_LENGTH_INPUT_VALUE}
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
              tail={addSmallCircleBottom(index)}
              head={addSmallCircleTop(index)}
              // state={isActive && isActiveTail === index ? ElementStates.Changing : ElementStates.Default}
              state={item.state}
            />
            {index !== list.length - 1 && <ArrowIcon />}
          </div>

        )}
      </ul>
    </SolutionLayout>
  );
};
