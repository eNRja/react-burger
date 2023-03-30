export function addZero(num: string | number) {
    if (num >= 0 && num <= 9) {
        return '0' + num;
    } else {
        return num;
    }
}