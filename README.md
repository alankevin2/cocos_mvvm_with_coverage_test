# 設計理念
為符合MVVM精神，一個比較複雜的View，應當有一個ViewModel來負責幫它處理資料，提供它一系列的屬性，能讓它直接做綁定。
View本身只做跟Cocos api 有關係的程式碼，例如找到畫面上的元件、綁定事件等等，如果畫面上的元件需要更新，都應該透過ViewModel做資料綁定。 View本身不處理資料來源格式與本地不符的邏輯。
ex1：View有個Label要顯示玩家額度，而額度不管從哪裡來，原始資料是數值，那他不應該自己去parse string
ex2：View有個SpriteFrame要做顯示，他不應該去理會換什麼圖（甚至是多語系），應當由ViewModel直接提供SpriteFrame格式或string url格式給他做綁定跟更新。

# 實作方式

透過一系列的Decorator來做到綁定，以及封裝好重複性的程式碼。
例如 ViewModel中使用 @bindable 來標記哪些屬性是可以給View做綁定的。 View(實際上是一個Component)則透過@bind()來跟ViewModel做呼應。
```
class ViewModel extends BaseViewModel {
    @bindable
    someString: string = '123'; // 這裡叫做someString，那View想跟他做綁定也要宣告一個一樣的命名
}

...

@UseViewModel(MyVM)
class MyView extends BaseComp {
    @bind('this.myLabel.string')
    someString: string; // 這裡叫做someString去呼應ViewModel的someString
}

```

此外，由於ViewModel需要在Component onLoad前就需要先建立起來，否則等場景或prefab載好時，ViewModel才跟著一起被創建，這樣極有可能會錯過具有realtime性質的資料（ex: websocket stream）
我們透過@UseViewModel這個Decorator 來提前創建，並且跟這個Component做綁定（即使Component還沒實際被new出來）


# 跑jest要注意的部分
由於我們使用pnpm來安裝自己的framework於 node_modules中，這個情況下要測試的案例有依賴它的話，必須額外安裝
```
pnpm babel-jest @babel/core @babel/preset-env
```
