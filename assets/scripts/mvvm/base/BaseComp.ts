import { _decorator, Component, Node, SpriteFrame } from 'cc';
import { BaseViewModel, ViewModelDependent } from './BaseViewModel';
import { bind, BindableRegExp, BindRegExp, MakeBindableKey, MakeBinderKey } from './Decorator';
const { ccclass, property } = _decorator;

@ccclass('BaseComp')
export class BaseComp extends Component implements ViewModelDependent {

    public dependentDestroyed: boolean

    protected viewModel: BaseViewModel

    private keysWithBinder: Map<string, string>

    protected onLoad(): void {
        this.viewModel = this.constructor['__comp__vm__'];
        this.viewModel.componentLoaded(this);

        this.keysWithBinder = new Map<string, string>();
        let checkIfOneVm;
        let toBeBounded = [];
        const keys = Object.keys(this);
        keys.forEach( k => {
            if (this[k] instanceof BaseViewModel) {
                if (!checkIfOneVm) {
                    checkIfOneVm = this[k];
                } else {
                    throw new Error(`No more than one ViewModel for a component! \n ViewModel key=${k} is prohibited!`);
                }
            }
        });
        const keysOfPrototype = Object.keys(Object.getPrototypeOf(this));
        keysOfPrototype.forEach( k => {
            if (BindRegExp.test(k)) {
                toBeBounded.push(k);
            }
        });
        this.viewModel && this.startBinding(this.viewModel, toBeBounded);
    }

    protected onDestroy(): void {
        this.dependentDestroyed = true;
    }

    private startBinding(vm: BaseViewModel, properties: any[]) {
        const prototype = Object.getPrototypeOf(this);
        properties.forEach(k => {
            const originKey = BindRegExp.exec(k) ? BindRegExp.exec(k)[1] : undefined;
            const vmKey = MakeBindableKey(originKey);
            if (!(`${vmKey}` in vm)) {
                throw new Error(`Did not find key=${vmKey} in the ViewModel!`);
            }
            Object.defineProperty(this, originKey, {
                get: function() {
                    return vm[originKey];
                },
                configurable: false,
                enumerable: false,
            });
            const binder = prototype[MakeBinderKey(originKey)];
            this.keysWithBinder.set(originKey, binder);
            if (binder && vm[originKey]) {
                this.executeBinding(binder, k, vm[originKey]);
            }
        })
    }

    private executeBinding(binder: string, key: string, value: any) {

        const isSetter = !binder.includes('()');
        if (isSetter) {
            try {
                switch (typeof value) {
                    case 'undefined':
                    case 'boolean':
                    case 'number':
                        eval(`${binder}=${value}`);
                        break;
                    case 'string':
                        eval(`${binder}=\'${value}\'`);
                        break;
                    case 'object':
                        eval(`${binder}=value`);
                        break
                    default:
                        throw new Error(`@bind did not support this type: ${typeof value}`)
                }
            } catch (e) {
                console.error(`modelDidChange error occurred while executing ${binder} for key:${key} and value:${value}`, e);
            }
        } else {
            try {
                eval(binder.replace('()', '(value)'));
            } catch (e) {
                console.error(`modelDidChange error occurred while executing ${binder} for key:${key} and value:${value}`, e);
            }
        }
        
    }

    public modelDidChange(key: string, value: any, previousValue: any) {
        if (!this.keysWithBinder) {
            return;
        }
        const binder = this.keysWithBinder.get(key);
        if (binder) {
           this.executeBinding(binder, key, value);
        }
    }
}

