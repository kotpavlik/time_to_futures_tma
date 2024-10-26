type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): DebouncedFunction<T> => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }
}