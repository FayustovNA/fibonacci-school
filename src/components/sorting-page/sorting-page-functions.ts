import { ElementStates } from "../../types/element-states";

export type ArrayTypes = {
    index: number;
    state: ElementStates;
};

//Время анимации
function setTime() {
    return new Promise<void>((res) => setTimeout(res, 500));
}

//Получение рандомного массива
function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function randomArr(): any {
    const minValue = 0;
    const maxValue = 100;
    const minLength = 3;
    const maxLength = 18;
    const arrLength = Math.round(getRandomArbitrary(minLength, maxLength));

    const arr = [];

    for (let i = 0; i < arrLength; i++) {
        const randomItem = Math.round(getRandomArbitrary(minValue, maxValue));
        arr.push({ index: randomItem, state: ElementStates.Default });
    }

    return arr;
}

//Сортировка "Выбор"
export const selectionSortUp = async (array: Array<ArrayTypes>, setFunction: any, loader: any, setLoader: any) => {
    // let count = 0;
    setLoader({ ...loader, up: true, down: false, new: false });
    for (let i = 0; i < array.length; i++) {
        let indexMin: any = i;
        array[indexMin].state = ElementStates.Changing;
        setFunction([...array]);
        await setTime()
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
    setFunction([...array]);
    setLoader({ ...loader, up: false, down: false, new: false });
}

export const selectionSortDown = async (array: Array<ArrayTypes>, setFunction: any, loader: any, setLoader: any) => {
    // let count = 0;
    setLoader({ ...loader, up: false, down: true, new: false });
    for (let i = 0; i < array.length; i++) {
        let indexMin: any = i
        array[indexMin].state = ElementStates.Changing;
        setFunction([...array]);
        await setTime()
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
    setFunction([...array]);
    setLoader({ ...loader, up: false, down: false, new: false });
}

//Сортировка "Пузырек"
export const bubbleSortUp = async (array: Array<ArrayTypes>, setFunction: any, loader: any, setLoader: any) => {
    setLoader({ ...loader, up: true, down: false, new: false });
    for (let i = 0; i < array.length; i++) {
        // array[i].state = ElementStates.Changing;
        await setTime()
        //console.log(array[i].index)
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            if (array[j].index > array[j + 1].index) {
                await setTime()
                setFunction([...array]);
                console.log(array[j])
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

export const bubbleSortDown = async (array: Array<ArrayTypes>, setFunction: any, loader: any, setLoader: any) => {
    setLoader({ ...loader, up: false, down: true, new: false });
    for (let i = 0; i < array.length; i++) {
        // array[i].state = ElementStates.Changing;
        await setTime()
        //console.log(array[i].index)
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            if (array[j].index < array[j + 1].index) {
                await setTime()
                setFunction([...array]);
                console.log(array[j])
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