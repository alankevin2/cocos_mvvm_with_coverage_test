import { _decorator, Label, Node, Sprite, SpriteFrame } from 'cc';
import { ViewModel2 } from './ViewModel2';
import { UseViewModel, bind, View } from 'framework/dist/output.js';
const { ccclass, property } = _decorator;

@ccclass('MyComp2')
@UseViewModel(ViewModel2)
export class MyComp2 extends View {

    @property(Label)
    myLabel: Label;

    @bind('this.myLabel.string')
    myString: string = '123';

    protected start(): void {
        
    }
}

