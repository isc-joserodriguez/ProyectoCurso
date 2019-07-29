export function DateConvert(date: string) {
    const newDate = new Date(date);
    const m = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const d = ('0' + newDate.getDate()).slice(-2);
    return [m, d, newDate.getFullYear()].join('-');
}
