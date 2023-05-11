export function waitTime(delay: number) {
    return new Promise<void>((res) => setTimeout(res, delay));
}