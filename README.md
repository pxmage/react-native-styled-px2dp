# react-native-styled-px2dp 🎩
**Write CSS px in react-native using styled-components and adapt multi resolution screens automatically.**

## How to use

### 1. install
```
yarn add react-native-styled-px2dp
```

or

```
npm i react-native-styled-px2dp --save
```

note: `react-native` and `styled-components` are required peer dependencies.

### 2. configure your `styled`
Setup a `styled` according to your visual design.

Say we have an iphone6 visual design which is 750x1334, then: 
```javascript
// my-styled.js
import getFlexibleStyled from 'react-native-styled-px2dp';

export const { styled } = getFlexibleStyled({
  designWidth: 750
})
```

### 3. use your configured `styled`
Now you can write css px values exactly what your visual design tells you ;)

The library will translate px into dp according to the design width of your visual design.
```javascript
import { styled } from 'path-to-your/my-styled'
export const Logo = styled.Image`
  position: absolute;
  width: 413px;
  height: 175px;
  top: 50px;
  left: 50px;
  margin-left: -206px;
`
```

## Further Usage
#### Get px2dp caculator in javascript
Sometimes you might want to **caculate style programmatically**, you can get the caculator directly from `getFlexibleStyled`
```javascript
export const { styled, px2dp} = getFlexibleStyled({
  designWidth: 750
})
```
and then you can use it in your code like:
```javascript
<View style={{width: parseInt(px2dp(1368))}}></View>
```
#### Deal with orientation
In some complex applications, you might need to deal with device orientation and re-render your application in a width-height-switched resolution, but don't worry, `react-native-styled-px2dp` will cover your back.

First, you need to specify both width and height of your visual design, and the original orientation.
```javascript
export const {styled, updateOrientation} = getFlexibleStyled({
  designWidth: 1920,
  designHeight: 1080,
  orientation: 'landscape' // 'landscape' or 'portrait'
})
```

Second, call `updateOrientation` when the orientation changes, the library will change its inside logic for the changed orientation (like switch the value of designWidth and designHeight).
```javascript
() => { // some orientation change callback
  updateOrientation('portrait')  // 'landscape' or 'portrait'
}
```

**Note: ** You should always call `updateOrientation` before you render components in your target orientation. In some cases you might need to add some delay before render using `setTimeout`.

links:
- [Expo - ScreenOrientation](https://docs.expo.io/versions/latest/sdk/screen-orientation/)
- [react-native-orientation](https://github.com/yamill/react-native-orientation)

## How it works?
to be continued.

## Inspirations
inspired by:
- [amfe/lib-flexible](https://github.com/amfe/lib-flexible)
- [styled-px2vw](https://github.com/hnzycfcfed/styled-px2vw)

