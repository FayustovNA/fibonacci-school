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
  });

  // const [isActive, setIsActive] = useState<any>(null);

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
    setLoader({ ...loader, pushHead: true })
    await setTime();
    linkedList.pushHead(inputValue.value)
    await setTime();
    setList([...linkedList.toArray()])
    console.log(list)
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushHead: false });
  }

  //Добавить в конец
  const addTail = async () => {
    setLoader({ ...loader, pushTail: true });
    await setTime();
    linkedList.pushTail(inputValue.value)
    setList([...linkedList.toArray()])
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushTail: false });
  }

  //Удалить из начала
  const deleteHead = async () => {
    setLoader({ ...loader, deleteHead: true });
    await setTime();
    linkedList.deleteHead()
    setList([...linkedList.toArray()])
    setLoader({ ...loader, deleteHead: false });
  }

  //Удалить из конца
  const deleteTail = async () => {
    setLoader({ ...loader, deleteTail: true });
    await setTime();
    linkedList.deleteTail()
    setList([...linkedList.toArray()])
    setLoader({ ...loader, deleteTail: false });
  }

  //Добавить по индексу
  const addByIndex = async () => {
    setLoader({ ...loader, pushIndex: true });
    await setTime();
    linkedList.pushByIndex(Number(inputValue.index), inputValue.value)
    setList([...linkedList.toArray()])
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, pushIndex: false });
  }

  //Удалить по индексу
  const deleteByIndex = async () => {
    setLoader({ ...loader, deleteIndex: true });
    await setTime();
    linkedList.deleteByIndex(Number(inputValue.index))
    setList([...linkedList.toArray()])
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteIndex: false });
  }

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
          />
          <Button
            text={'Добавить в head'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.pushHead}
            onClick={addHead}
            disabled={!inputValue.value}
          />
          <Button
            text={'Добавить в tail'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.pushTail}
            onClick={addTail}
            disabled={!inputValue.value}
          />
          <Button
            text={'Удалить из head'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.deleteHead}
            onClick={deleteHead}
            disabled={linkedList.isEmpty()}
          />
          <Button
            text={'Удалить из tail'}
            type={'button'}
            extraClass={style.button}
            isLoader={loader.deleteTail}
            onClick={deleteTail}
            disabled={linkedList.isEmpty()}
          />
        </div>

        <div className={style.forminputindex}>
          <Input
            type="number"
            name='index'
            value={inputValue.index}
            onChange={onChange}
            placeholder="Введите индекс"
          />
          <Button
            text={'Добавить по индексу'}
            type={'button'}
            extraClass={style.button_max}
            isLoader={loader.pushIndex}
            onClick={addByIndex}
            disabled={!inputValue.index || !inputValue.value}
          />
          <Button
            text={'Удалить по индексу'}
            type={'button'}
            extraClass={style.button_max}
            isLoader={loader.deleteIndex}
            onClick={deleteByIndex}
            disabled={linkedList.isEmpty() || !inputValue.index}
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
            />
            {index !== list.length - 1 && <ArrowIcon />}
          </div>

        )}
      </ul>
    </SolutionLayout>
  );
};
