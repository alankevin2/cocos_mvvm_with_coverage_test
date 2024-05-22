import { _decorator, director, Label, macro, SpriteFrame, Sprite, AnimationClip, Animation } from 'cc';
import { ViewModel1 } from './ViewModel1';
import { UseViewModel, bind, View } from 'framework/dist/output.js';

const { ccclass, property } = _decorator;

@ccclass('MyComp')
@UseViewModel(ViewModel1)
export class MyComp extends View {

    @property(Label) myLabel: Label;
    @property(Label) updateLabel: Label;
    @property(Sprite) mySprite: Sprite
    @property(Animation) myAnimation: Animation

    @bind('this.myLabel.string') someString: string;
    @bind('this.mySprite.spriteFrame') someSpriteFrame: SpriteFrame
    @bind('this.myAnimation.addClip()') animation: AnimationClip
    @bind() someBool: boolean = false;

    someString1: number = 123;
    someObj: object = {};

    protected onLoad(): void {
        super.onLoad();
        let count = 0;

        this.schedule(() => {
            count++;
            this.updateLabel.string = ''+count;
        }, 1, macro.REPEAT_FOREVER);
    }

    protected onDestroy(): void {
        super.onDestroy();
        console.log('MyComp destroyed');
    }

    private buttonClicked() {
        console.log('scene2 going to load');
        director.loadScene('scene2', () => {
            console.log('scene2 loaded');
        }, undefined);
    }

    public modelDidChange(key: string, value: any, previousValue: any): void {
        super.modelDidChange(key, value, previousValue);
        console.log('modelDidChange start ----');
        console.log(key, value, previousValue);

        if (key === 'animation') {
            this.myAnimation.play("animation");
        }

        console.log('modelDidChange end ----');
    }
}