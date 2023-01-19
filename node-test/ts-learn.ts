type NewType = number | string
const arr:  number[] = []
const arr1: Array<number> = []
const str: string = ''
function add(x: number, y: number): number {
    return x + y
}
type Fn = (n1: number, n2: number) => number
const fn: Fn = (a, b) => a + b

function add1(x: number, y?: number): number {
    return x
}