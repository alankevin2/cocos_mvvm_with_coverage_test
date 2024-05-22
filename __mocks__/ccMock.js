
const _decorator = {
    ccclass: jest.fn(() => {
        // 這裡可以添加任何您希望模擬的行為或返回的值
        return (target) => {
            // 模擬 ccclass 的行為，例如將一些屬性添加到目標類
            target.__ccclassMocked = true;
        };
    }),
    property: jest.fn(() => {
        return (target) => {
            // 模擬 ccclass 的行為，例如將一些屬性添加到目標類
            target.__propertyMocked = true;
        };
    }),
    // 您還可以添加其他 _decorator 提供的裝飾器模擬
};

const cc = {
    // 這裡您可以添加模擬的 'cc' 對象的屬性或方法
    Node: jest.fn(),
    Component: jest.fn(),
    Sprite: jest.fn(),
    SomeClass: jest.fn(() => {
        someMethod: jest.fn()
    }),
    _decorator: _decorator
};

// 繼承類別直接呼叫父類別的class只能這樣mock
cc.Component.prototype.getComponent = jest.fn();

module.exports = cc;