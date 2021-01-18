/**
 * Checks if given number is a prime number or not
 * @param num number
 */
export const isPrime = (num: number): boolean => {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}
