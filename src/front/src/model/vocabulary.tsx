export default class Translation {
    from!: string;
    to!: string;
    transResult!: TransResult

    Translation(from: string, to: string, transResult: TransResult) {
        this.from = from;
        this.to = to;
        this.transResult = transResult;
    }
}

class TransResult {
    src!: string;
    dst!: string;

    TransResult(src: string, dst: string) {
        this.src = src;
        this.dst = dst;
    }
}