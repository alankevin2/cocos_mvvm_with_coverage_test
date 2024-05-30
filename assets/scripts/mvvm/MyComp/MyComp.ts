import { _decorator, director, Label, macro, SpriteFrame, Sprite, AnimationClip, Animation } from 'cc';
import { ViewModel1 } from './ViewModel1';
import { UseViewModel, bind, View } from 'framework';

const { ccclass, property } = _decorator;

@ccclass('MyComp')
@UseViewModel(ViewModel1)
export class MyComp extends View {

    @property(Label) myLabel: Label;
    @property(Label) updateLabel: Label;
    @property(Sprite) mySprite: Sprite;
    @property(Animation) myAnimation: Animation;
    @property(Sprite) lighting: Sprite;
    @property(Sprite) wave: Sprite;

    @bind('this.myLabel.string') someString: string;
    @bind('this.mySprite.spriteFrame') someSpriteFrame: SpriteFrame
    @bind('this.myAnimation.addClip()') animation: AnimationClip
    @bind() someBool: boolean = false;

    someString1: number = 123;
    someObj: object = {};
    time: number = 0;

    protected onLoad(): void {
        super.onLoad();
        let count = 0;
        this.schedule(() => {
            count++;
            this.updateLabel.string = ''+count;
        }, 1, macro.REPEAT_FOREVER);

        if (this.animation) {
            this.myAnimation.addClip(this.animation);
            this.scheduleOnce(() => {
                this.myAnimation.play('animation');
            });
        }

        console.log(this.lighting.customMaterial);
        console.log(this.lighting.spriteFrame.texture);
    }

    protected update(dt): void {
        this.time += dt;
        this.lighting.customMaterial.setProperty('time', this.time);
        this.wave.customMaterial.setProperty('time', this.time);
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
            if (!this.myAnimation.getState('animation').isPlaying) {
                this.myAnimation.play('animation');
            }
        }
        console.log('modelDidChange end ----');
    }
}