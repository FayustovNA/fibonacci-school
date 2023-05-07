
interface IStack<T> {
    pushTail: (item: T) => void;
    pushHead: (item: T) => void;
    pushByIndex: (index: number, value: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    deleteByIndex: (index: number) => void;
}

export class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

export class LinkedList<T> implements IStack<T> {
    private top: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private size: number;


    constructor(startList: any) {
        this.top = null;
        this.tail = null;
        this.size = 0;
        for (let item of startList) {
            this.pushHead(item);
            console.log(this.size)
        }
    }

    getSize() {
        return this.size;
    }

    getHead() {
        if (this.top === null) {
            return null;
        }
        return this.top;
    }

    getTail() {
        if (this.tail === null) {
            return null;
        }
        let tail: any = this.top;
        while (tail.next !== null) {
            tail = tail.next;
        }
        return tail;
    }

    pushHead = (item: T): any => {
        const newNode = new Node(item, this.top);
        this.top = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        this.size++;
        return this;
    };

    pushTail = (item: T): any => {
        const newNode = new Node(item);

        if (!this.top || !this.tail) {
            this.top = newNode;
            this.tail = newNode;
            this.size++;
            return this
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.size++;
            return this
        };
    };

    deleteHead = (): any => {
        if (this.isEmpty()) {
            throw new Error("stack is empty");
        }
        if (!this.top) {
            return null;
        }
        this.top = this.top.next;
        this.size--;
    };

    deleteTail = (): any => {
        if (this.isEmpty()) {
            throw new Error("stack is empty");
        }
        if (!this.tail) {
            return null;
        }
        if (this.size === 1) {
            this.top = null;
            this.tail = null;
            this.size--;
            return this
        }
        let currentItem = this.top;
        let previousItem: any = null;

        while (currentItem?.next) {
            previousItem = currentItem;
            currentItem = currentItem.next
        }

        previousItem.next = null;
        this.tail = previousItem;
        this.size--;
        console.log(this.size)
        return this
    };

    pushByIndex(index: number, value: T) {
        if (index < 0 || index > this.size) {
            //
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(value);
            if (index === 0) {
                node.next = this.top;
                this.top = node;
                console.log(node)
            } else {
                let curr = this.top;
                let currIndex = 0;
                while (curr?.next && currIndex < index) {
                    currIndex++
                    if (currIndex !== index) {
                        curr = curr.next
                    }
                }
                if (curr) {
                    node.next = curr.next
                    curr.next = node
                }
            }
            this.size++;
        }
    }

    deleteByIndex(index: number) {
        if (index < 0 || index >= this.size) {
            console.log('Enter a valid index');
        }

        if (index === 0) {
            return this.deleteHead();
        }
        let currentItem: any = this.top;
        let previousItem: any = null;
        for (let i = 0; i < this.size; i++) {
            if (i !== index) {
                previousItem = currentItem;
                currentItem = currentItem.next;
            } else {
                previousItem.next = currentItem.next;
                this.size--;
                return this
            }
        }
        return false
    }

    findElement(index: number) {
        if (!this.top) {
            return null;
        }
        let currentNode: any = this.top;
        let counter = 0;
        while (currentNode) {
            if (counter === index) {
                return currentNode
            }
            counter++;
            currentNode = currentNode.next;
        }
        return null
    }

    toArray() {
        const listArray = [];
        let currentNode = this.top;

        while (currentNode) {
            listArray.push(currentNode);
            currentNode = currentNode.next;
        }
        return listArray
    }


    isEmpty = (): boolean => {
        return this.top === null;
    };
}

//Получение рандомного массива
function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function randomArr(): any {
    const minValue = 0;
    const maxValue = 100;
    const minLength = 1;
    const maxLength = 5;
    const arrLength = Math.round(getRandomArbitrary(minLength, maxLength));

    const arr = [];

    for (let i = 0; i < arrLength; i++) {
        const randomItem = Math.round(getRandomArbitrary(minValue, maxValue));
        arr.push(String(randomItem));
    }

    return arr;
}


export const linkedList = new LinkedList<any>(randomArr());