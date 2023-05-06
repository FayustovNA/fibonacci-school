import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState, ChangeEvent, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import style from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { queue } from "./queue-functions";

export const QueuePage: React.FC = () => {

  queue.getElements();


  //Стейты
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState({
    enqueue: false,
    dequeue: false,
    reset: false
  });
  const [queues, setQueues] = useState<any>();
  const [isActive, setIsActive] = useState<any>(null);
  // const [tail, setTail] = useState();
  // const [head, setHead] = useState();


  //Время анимации
  function setTime() {
    return new Promise<void>((res) => setTimeout(res, 500));
  }

  //Сбор данных из формы
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputValue(target.value);
  };

  //Добавление в очередь
  const enQueue = async () => {
    setLoader({ ...loader, enqueue: true })
    setIsActive(queue.getTail());
    queue.enqueue(inputValue);
    await setTime()
    setQueues([...queue.getElements()])
    setInputValue("");
    setLoader({ ...loader, enqueue: false })
    console.log(queue.getHead())
    console.log(queue.getTail())
  }

  //Удаление из очереди
  const deQueue = async () => {
    setLoader({ ...loader, dequeue: true })
    setIsActive(queue.getHead());
    await setTime()
    queue.dequeue();
    setQueues([...queue.getElements()])
    setLoader({ ...loader, dequeue: false })
  }

  //Очистить все
  const resetQueue = async () => {
    setLoader({ ...loader, reset: true })
    await setTime()
    queue.cleanQueue();
    setQueues([...queue.getElements()])
    setInputValue("");
    setIsActive('false')
    setLoader({ ...loader, reset: false })
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={style.form}>
        <div className={style.forminput}>
          <Input
            maxLength={4}
            isLimitText
            value={inputValue}
            onChange={onChange}
            placeholder="Введите значение"
          />
          <Button
            text={'Добавить'}
            type={'button'}
            isLoader={loader.enqueue}
            onClick={enQueue}
            disabled={!inputValue}
          />
          <Button
            text={'Удалить'}
            type={'button'}
            isLoader={loader.dequeue}
            onClick={deQueue}
            disabled={queue.isEmpty()}
          />
        </div>

        <Button
          text={'Очистить'}
          type={'reset'}
          isLoader={loader.reset}
          onClick={resetQueue}
          disabled={queue.isEmpty()}
        />
      </div>
      <ul className={style.line}>
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
      </ul>
    </SolutionLayout>
  );
};
