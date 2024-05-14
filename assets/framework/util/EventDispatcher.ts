type Callbacks = (data: any)=>void;

export default class EventDispatcher {

    private static listeners: Map<string, Callbacks[]> = new Map();

    static addListener(event: string, callback: (data: any) => void): void {
        const arr = this.listeners.get(event);
        if (!arr) {
            this.listeners.set(event, [callback]);
        } else {
            arr.push(callback);
        }
    }

    static remove(event: string, callback?: (data:any) => void): void {
        let arr = this.listeners.get(event);
        if (callback) {
            const index = arr.indexOf(callback);
            if (index != -1) {
                arr = arr.splice(0, index).concat(arr.splice(index, arr.length))
                this.listeners.set(event, arr);
            }
        } else {
            this.listeners.set(event, []);
        }
    }

    static removeAllListeners() {
        this.listeners.clear();
    }

    static emit(event: string, data: any) {
        const arr = this.listeners.get(event);
        arr && arr.forEach(cb => {
            cb(data);
        });
    }
}