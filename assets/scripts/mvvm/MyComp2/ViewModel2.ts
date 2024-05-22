import { ViewModel, bindable, EventDispatcher, NetworkingEvents, View } from 'framework';
export class ViewModel2 extends ViewModel {

    @bindable
    myString: string = 'default value';

    constructor(comp: typeof View) {
        super(comp);
        EventDispatcher.addListener(NetworkingEvents.DATA2, (data) => {
            this.myString = data.value;
        });
    }
}

