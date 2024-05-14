import { _decorator, Component, Node } from 'cc';
import { UseViewModel } from '@src/mvvm/base/Decorator';
import { BaseViewModel } from '@src/mvvm/base/BaseViewModel';
const { ccclass, property } = _decorator;


class SSSS extends BaseViewModel {

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

