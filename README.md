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
Setup a `styled` according to your design draft.

Say we have an iphone6 design draft which is 750x1334, then: 
```javascript
// my-styled.js
import getFlexibleStyled from 'react-native-styled-px2dp';

export const { styled } = getFlexibleStyled({
  designWidth: 750
})
```

### 3. use your configured `styled`
Now you can write css px values exactly what your design draft tells you ;)

The library will translate px into dp according to the design width of your design draft.
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
#### Deal with rotation
#### Get `vw` and `vh`
to be continued.

## How it works?
to be continued.

## Inspiration
to be continued.
