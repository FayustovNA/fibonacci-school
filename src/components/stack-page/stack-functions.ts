interface IStack<T> {
    push?: (item: T) => void;
    pop?: () => void;
    peak: () => T | null;
    isEmpty?: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: (T | null)[] = [];
    private top = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    push = (item: T) => {
        this.container.push(item);
        this.top++;
        this.length++;
    };

    pop = () => {
        if (this.container.length > 0) {
            this.container.pop();
            this.top--;
            this.length--;
        }
    }

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.top]
    };

    cleanStack = () => {
        this.container = [];
        this.top = 0;
        this.length = 0;
    };

    getElements = () => this.container;
    getTop = () => this.top;

    isFull = () => this.length === this.size;
    isEmpty = () => this.length === 0;
    isLength = () => this.length;
}


export const stacks = new Stack<string>(0);