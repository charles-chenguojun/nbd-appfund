class Debounced {
    /**
     * @param func 需要包装的函数
     * @param delay 延迟时间，单位ms
     * @param immediate 是否默认执行一次(第一次不延迟)
     */
    public use = (func: Function, delay: number, immediate: boolean = false): Function => {
        let timer: any
        return (...args: any) => {
            if (immediate) {
                func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
                immediate = false
                return
            }
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
}
function getColor(num: number | null): string {
    if (!num) {
        return '#333'
    }
    if (num > 0) {
        return '#E63640'
    } else {
        return '#179901'
    }
}
function toPsInt(num: number, count: number = 2) {
    if (!num) {
        return undefined
    }
    return (num * 100 as any).toFixed(count)
}
export { Debounced, getColor, toPsInt }
