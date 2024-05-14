import { Component } from "cc";
import { BaseViewModel } from "./BaseViewModel";
import { BaseComp } from "./BaseComp";

export default class ViewModelManager  {

    private static hadStartedManagement = false;
    private static vmAndCompMap: Map<Symbol, BaseViewModel> = undefined;

    static beginManagement() {
        this.hadStartedManagement = true;
    }
   
    static add(VMClass: typeof BaseViewModel, comp: typeof BaseComp) {
        if (this.hadStartedManagement) {
            throw new Error(`ViewModelManager had begun management, cannot add ${VMClass.constructor.name} in this moment!`)
        }
        if (!this.vmAndCompMap) {
            this.vmAndCompMap = new Map<Symbol, BaseViewModel>();
        }
        const vmInstance = new VMClass(comp);
        comp['__comp__vm__'] = vmInstance;
    }
}

