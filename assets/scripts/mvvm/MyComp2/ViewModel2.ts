import { BaseViewModel } from '../base/BaseViewModel';
import { bindable } from '../base/Decorator';

export class ViewModel2 extends BaseViewModel {

    @bindable
    myString: string = 'default value';

    constructor(comp) {
        super(comp);
    }
}

