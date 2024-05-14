import { Networking } from '@framework/networking/src/Networking';
import { _decorator, Component, Node } from 'cc';

@_decorator.ccclass('Entry')
export class Entry extends Component {
    start() {
        const networking = new Networking();
        networking.start();
    }
}