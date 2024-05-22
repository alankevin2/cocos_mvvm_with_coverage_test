// typings/microevent.d.ts
declare module 'microevent' {
    export default class MicroEvent {
        bind(event: string, fn: (...args: any[]) => void): void;
        unbind(event: string, fn: (...args: any[]) => void): void;
        trigger(event: string, ...args: any[]): void;
    }
}