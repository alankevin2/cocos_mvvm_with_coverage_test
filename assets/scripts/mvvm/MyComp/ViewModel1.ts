import { AnimationClip, ImageAsset, SpriteFrame, Texture2D, absMaxComponent, resources } from 'cc';
import { ViewModel, bindable, EventDispatcher, NetworkingEvents, encodePerson, decodePerson } from 'framework/dist/output.js';
import PersonModel from '@src/model/microevent/Person';
export class ViewModel1 extends ViewModel {

    @bindable someString: string;
    @bindable someBool: boolean = true;
    @bindable animation: AnimationClip;
    @bindable someSpriteFrame: SpriteFrame;

    someObj: number = 2;
    person: PersonModel

    constructor(comp: any) {
        super(comp);
        
        this.person = new PersonModel('lironghao', 18);
        this.person.bind('change:name', (name) => {
            this.onReceived({ name });
        });
        setTimeout(() => {
            this.person.setName('This is data1');
        }, 3000);

        const a = encodePerson(this.person);
        console.log(a);
        console.log(decodePerson(a));
        // EventDispatcher.addListener(NetworkingEvents.DATA1, this.onReceived.bind(this));
        // EventDispatcher.addListener(NetworkingEvents.DATA2, this.onReceived.bind(this));
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

