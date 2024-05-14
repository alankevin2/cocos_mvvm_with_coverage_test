import { BaseComp } from "./BaseComp";
import { BaseViewModel } from "./BaseViewModel";

/**
 * 提示：被標記為bind的屬性，在class層賦予初始值是沒有意義的，因為實際上會以ViewModel給的值為主。
 * @param binder 
 * @returns 
 */
export function bind(binder?: any): PropertyDecorator {
    return function(target: any, key: string) {
        target[MakeBindKey(key)] = null;
        target[MakeBinderKey(key)] = binder;
    };
}

export function bindable(target: BaseViewModel, key: string) {
    // 這裡只做標記動作，因為此時target是尚未實例化的
    target[MakeBindableKey(key)] = null;
};

export const MakeBindKey = (key: string ) => '_bind_'+key+'_bind_';
export const MakeBinderKey = (key: string ) => '_binder_'+key+'_binder_';
export const MakeBindableKey = (key: string ) => '_bindable_'+key+'_bindable_';

export const BindRegExp = /^_bind_([a-zA-Z][a-zA-Z0-9]*)_bind_$/;
export const BindableRegExp = /^_bindable_([a-zA-Z][a-zA-Z0-9]*)_bindable_$/;

/**
 * 使用ViewModel模式的Component，在整個runtime應只有一個實體。 
 * 因為這個設計模式下，我們只能預先實例化一個ViewModel。
 * @param VMClass 
 * @returns 
 */
export function UseViewModel(VMClass: typeof BaseViewModel): ClassDecorator {
    return function(target: any) {
        if (Object.getPrototypeOf(target) != BaseComp) {
            throw new Error('UseViewModel can only apply on those who inherits BaseComp');
        }
        const vmInstance = new VMClass(target);
        vmInstance.startBinding();
        target['__comp__vm__'] = vmInstance;
    };
}

