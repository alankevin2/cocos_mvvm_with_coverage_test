import { Networking } from 'framework/dist/output.js';
import { _decorator, Component, Node } from 'cc';

@_decorator.ccclass('Entry')
export class Entry extends Component {
    start() {
        const networking = new Networking();
        networking.start();
    }
}