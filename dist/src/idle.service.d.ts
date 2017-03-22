/// <reference path="../../index.d.ts" />
import { Observable } from 'rxjs/Rx';
export declare class IdleService {
    private timeToIdle;
    private timeToTimeout;
    private isIdle;
    private timeDiff;
    private timestart;
    private timeend;
    constructor();
    watchIdle(): Observable<boolean>;
    watchTimeout(): Observable<string>;
    interruptIdle(): void;
    interruptTimeout(): void;
    setTimeToIdle(time: number): void;
    setTimeToTimeout(time: number): void;
}
