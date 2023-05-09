//Получение рандомного массива
export function getFibonacciNumbers(number: number) {
    let initArr = [0, 1]
    for (let i = 2; i <= number; i++) {
        const prevNum1 = initArr[i - 1];
        const prevNum2 = initArr[i - 2];
        initArr.push(prevNum1 + prevNum2);
    }
    return initArr
}