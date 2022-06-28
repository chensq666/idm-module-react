export interface IDMExpress {
    replace(expressStr: string, data: any, isFlag?: boolean): any
    eval(expressStr: string, data: object): any
    has(expressStr: string): boolean
    url(key: string): string
}
