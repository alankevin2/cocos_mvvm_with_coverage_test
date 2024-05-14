import { BaseViewModel } from '@src/mvvm/base/BaseViewModel';
import { bindable } from '@src/mvvm/base/Decorator';
import { AnimationClip, ImageAsset, SpriteFrame, Texture2D, absMaxComponent, resources } from 'cc';

export class ViewModel extends BaseViewModel {

    @bindable someString: string;

    @bindable someBool: boolean = true;

    @bindable animation: AnimationClip;

    @bindable someSpriteFrame: SpriteFrame;

    someObj: number = 2;

    constructor(comp: any) {
        super(comp);
    }

    private onReceived(data: any) {
        if (data.name == 'This is data1') {
            this.someString = data.name;
            this.someBool = false;
            resources.load('images/lironghao/texture', Texture2D, (err, texture: Texture2D) => {
                console.log(err);
                const frame = new SpriteFrame();
                frame.texture = texture;
                this.someSpriteFrame = frame;
            });

            resources.load('anim/animation', AnimationClip, (err, a: AnimationClip) => {
                this.animation = a;
            });

        } else if (data.name == 'This is data1 updated') {
            this.someString = 'ha ha destoryed';
        }
    }
}

