import EventDispatcher from '@framework/util/EventDispatcher';

export class Networking {
    start() {
        setTimeout(() => {
            EventDispatcher.emit(NetworkingEvents.DATA1, {
                name: 'This is data1',
                value: 0,
            });
        }, 5000);

        setTimeout(() => {
            EventDispatcher.emit(NetworkingEvents.DATA1, {
                name: 'This is data1 updated',
                value: 123,
            });
        }, 15000);


        setTimeout(() => {
            EventDispatcher.emit(NetworkingEvents.DATA2, {
                name: 'This is data2',
                value: 'first time111111',
            });
        }, 10000);

        setTimeout(() => {
            EventDispatcher.emit(NetworkingEvents.DATA2, {
                name: 'This is data2',
                value: 'first time222222',
            });
        }, 15000);
    }
}

export enum NetworkingEvents {
    DATA1 = 'DATA1',
    DATA2 = 'DATA2',
}
