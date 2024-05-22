import { _decorator, Component, Node } from 'cc';
import { ViewModel } from 'framework/dist/output.js';
const { ccclass, property } = _decorator;

class SSSS extends ViewModel {

}

// 這裡使用ViewModel模式會報錯，因為他沒有繼承BaseComp
// @UseViewModel(SSSS)
@ccclass('SomeTinyCompnents')
export class SomeTinyCompnents extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
}

