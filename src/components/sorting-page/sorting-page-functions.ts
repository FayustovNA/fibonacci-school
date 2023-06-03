import { ElementStates } from "../../types/element-states";
import { waitTime } from "../../utils/wait-function";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type ArrayTypes = {
    index: number;
    state: ElementStates;
};

//Получение рандомного массива
function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const MAX_VALUE_ARRAY = 100;
const MIN_VALUE_ARRAY = 0;
const MAX_LENTH_ARRAY = 18;
const MIN_LENTH_ARRAY = 0;

export function randomArr(): any {
    const minValue = MIN_VALUE_ARRAY;
    const maxValue = MAX_VALUE_ARRAY;
    const minLength = MIN_LENTH_ARRAY;
    const maxLength = MAX_LENTH_ARRAY;
    const arrLength = Math.round(getRandomArbitrary(minLength, maxLength));

    const arr = [];

    for (let i = 0; i < arrLength; i++) {
        const randomItem = Math.round(getRandomArbitrary(minValue, maxValue));
        arr.push({ index: randomItem, state: ElementStates.Default });
    }

    return arr;
}

//Сортировка "Выбор"
export const selectionSortUp = async (array: Array<ArrayTypes>, setFunction?: any, loader?: any, setLoader?: any) => {
    // let count = 0;
    if (setLoader) {setLoader({ ...loader, up: true, down: false, new: false });}
    for (let i = 0; i < array.length; i++) {
        let indexMin: any = i;
        array[indexMin].state = ElementStates.Changing;
        if (setFunction) {setFunction([...array]);}
        await waitTime(SHORT_DELAY_IN_MS)
        for (let j = i + 1; j < array.length; j++) {
            if (array[j].index < array[indexMin].index) {
                array[j].state = ElementStates.Changing;
                indexMin = j
            }
            // count += 1
        }
        let tmp: any = array[i].index
        array[i].index = array[indexMin].index
        array[indexMin].index = tmp
        array[indexMin].state = ElementStates.Default;
        array[i].state = ElementStates.Modified;
    }
    if (setFunction) {setFunction([...array]);}
    if (setLoader) {setLoader({ ...loader, up: false, down: false, new: false });}
   console.log(array)
    return array
}
export const selectionSortUpTest = async (array: Array<ArrayTypes>) => {
    for (let i = 0; i < array.length; i++) {
        let indexMin: any = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[indexMin]) {
                indexMin = j
            }
        }
        let tmp: any = array[i]
        array[i] = array[indexMin]
        array[indexMin] = tmp
    }
    return array
}


export const selectionSortDown = async (array: Array<ArrayTypes>, setFunction?: any, loader?: any, setLoader?: any) => {
    // let count = 0;
    if (setLoader) {setLoader({ ...loader, up: false, down: true, new: false });}
    
    for (let i = 0; i < array.length; i++) {
        let indexMin: any = i
        array[indexMin].state = ElementStates.Changing;
        if (setFunction) {setFunction([...array]);}
        await waitTime(SHORT_DELAY_IN_MS)
        for (let j = i + 1; j < array.length; j++) {
            if (array[j].index > array[indexMin].index) {
                array[j].state = ElementStates.Changing;
                indexMin = j
            }
            // count += 1
        }
        let tmp: any = array[i].index
        array[i].index = array[indexMin].index
        array[indexMin].index = tmp
        array[indexMin].state = ElementStates.Default;
        array[i].state = ElementStates.Modified;
    }
    if (setFunction) {setFunction([...array]);}
    if (setLoader) {setLoader({ ...loader, up: false, down: false, new: false });}
    return array
}
export const selectionSortDownTest = async (array: Array<ArrayTypes>) => {
    for (let i = 0; i < array.length; i++) {
        let indexMin: any = i
        await waitTime(SHORT_DELAY_IN_MS)
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] > array[indexMin]) {
                indexMin = j
            }
        }
        let tmp: any = array[i]
        array[i] = array[indexMin]
        array[indexMin] = tmp
    }
    return array
}

//Сортировка "Пузырек"
export const bubbleSortUp = async (array: Array<ArrayTypes>, setFunction: any, loader: any, setLoader: any) => {
    setLoader({ ...loader, up: true, down: false, new: false });
    for (let i = 0; i < array.length; i++) {
        await waitTime(SHORT_DELAY_IN_MS)
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            if (array[j].index > array[j + 1].index) {
                await waitTime(SHORT_DELAY_IN_MS)
                setFunction([...array]);
                let tmp = array[j].index
                array[j].index = array[j + 1].index
                array[j + 1].index = tmp
            }
            array[j].state = ElementStates.Default;
        }
        array[array.length - i - 1].state = ElementStates.Modified;
    }
    setFunction([...array]);
    setLoader({ ...loader, up: false, down: false, new: false });
}
export const bubbleSortUpTest = async (array: Array<ArrayTypes>) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let tmp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tmp
            }
        }
    }
 return array
}

export const bubbleSortDown = async (array: Array<ArrayTypes>, setFunction: any, loader: any, setLoader: any) => {
    setLoader({ ...loader, up: false, down: true, new: false });
    for (let i = 0; i < array.length; i++) {
        await waitTime(SHORT_DELAY_IN_MS)
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            if (array[j].index < array[j + 1].index) {
                await waitTime(SHORT_DELAY_IN_MS)
                setFunction([...array]);
                let tmp = array[j].index
                array[j].index = array[j + 1].index
                array[j + 1].index = tmp
            }
            array[j].state = ElementStates.Default;
        }
        array[array.length - i - 1].state = ElementStates.Modified;
    }
    setFunction([...array]);
    setLoader({ ...loader, up: false, down: false, new: false });
}
export const bubbleSortDownTest = async (array: Array<ArrayTypes>) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] < array[j + 1]) {
                let tmp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tmp
            }
        }
    }
    return array
}