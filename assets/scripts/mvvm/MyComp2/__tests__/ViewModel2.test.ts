import { jest, describe, test, expect } from '@jest/globals';

import { Component } from 'cc';
// @ts-ignore 因爲我們的framework裡面的 "View" 繼承了 cc.Component，方變開發上使用，所以在jest環境要在定義給他
global.cc = { Component };

// @ts-ignore 這裡是示範其他pnpm包，本身也只提供ESM模組（還沒有.d.ts)
import baseSum from 'lodash-es/_baseSum.js';

// 示範直接引入framework
import { View, bindable } from'framework';

// 示範引用一些很基礎的typescript
import Some from '../Some';

// 示範真正我們要測試的ViewModel
import { ViewModel2 } from '../ViewModel2';

describe('yo', () => {
    test('yo yo', () => {
        console.log(View)
        console.log(bindable);
        console.log(baseSum([1,2,3], (v: number) => v * 2));
    });
    
    test('some', () => {
        const some = new Some();
        expect(some.someMethod()).toBe('123');
    });

    test('ViewModel2', () => {
        const MyView = class extends View {};
        const vm = new ViewModel2(MyView);
        expect(vm.myString).toBe('default value123');
    });
});