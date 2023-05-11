import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState, ChangeEvent, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import style from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { queue } from "./queue-functions";
import { waitTime } from "../../utils/wait-function";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const MAX_LENGTH_INPUT_VALUE = 4;

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
    await waitTime(SHORT_DELAY_IN_MS);
    setQueues([...queue.getElements()])
    setInputValue("");
    setIsActive('false')
    setLoader({ ...loader, enqueue: false })
  }

  //Удаление из очереди
  const deQueue = async () => {
    setLoader({ ...loader, dequeue: true })
    setIsActive(queue.getHead());
    await waitTime(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setQueues([...queue.getElements()])
    setIsActive('false')
    setLoader({ ...loader, dequeue: false })
  }

  //Очистить все
  const resetQueue = async () => {
    setLoader({ ...loader, reset: true })
    await waitTime(SHORT_DELAY_IN_MS);
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
            maxLength={MAX_LENGTH_INPUT_VALUE}
            isLimitText
            value={inputValue}
            onChange={onChange}
            placeholder="Введите значение"
            disabled={loader.enqueue || loader.dequeue || loader.reset}
          />
          <Button
            text={'Добавить'}
            type={'button'}
            isLoader={loader.enqueue}
            onClick={enQueue}
            disabled={!inputValue || loader.dequeue || loader.reset}
          />
          <Button
            text={'Удалить'}
            type={'button'}
            isLoader={loader.dequeue}
            onClick={deQueue}
            disabled={queue.isEmpty() || loader.enqueue || loader.reset}
          />
        </div>

        <Button
          text={'Очистить'}
          type={'reset'}
          isLoader={loader.reset}
          onClick={resetQueue}
          disabled={queue.isEmpty() || loader.enqueue || loader.dequeue}
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
