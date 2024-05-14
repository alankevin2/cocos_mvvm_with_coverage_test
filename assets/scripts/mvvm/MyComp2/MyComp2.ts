import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
import { ViewModel2 } from './ViewModel2';
import { bind, UseViewModel } from '../base/Decorator';
import { BaseComp } from '../base/BaseComp';
const { ccclass, property } = _decorator;

@ccclass('MyComp2')
@UseViewModel(ViewModel2)
export class MyComp2 extends BaseComp {

    @property(Label)
    myLabel: Label;

    @bind('this.myLabel.string')
    myString: string = '123';

    protected start(): void {
        
    }
}
