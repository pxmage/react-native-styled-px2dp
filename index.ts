const { Dimensions } = require('react-native')
const styled = require('styled-components/native').default;

type IOrientation = 'portrait'|'landscape'

// current deisgn width and height which are affected by orientation
// they will switch value with each other after orientation changed
let currentDesignWidth, currentDesignHeight
// device orientation, 'protrait' by default
let orientation: IOrientation = 'portrait'
// always re-get current screen width(becuz of oritation changes)
const currentScreenWidth = () => Dimensions.get('window').width

const relativeCaculator = (px: number) => {
  return ((px / currentDesignWidth) * currentScreenWidth()).toFixed(2)
}

const stringToRelativePX = (cssStr: string) => {
  return cssStr.replace(/([\d|.]+)px/gm, (matched, pxNumber) => {
    // you have to write px in styled components
    // and css-to-react-native(a dependency of Styled Components) will translate it to RN unit, which is dp
    return relativeCaculator(pxNumber) + "px";
  });
}

const interpolationToRelativePX = (interpolation) => {
  if (typeof interpolation === 'string') {
    return stringToRelativePX(interpolation)
  } else { // deal with non-string interpolations like functions

    if (typeof interpolation === 'function') {
      // wrap the original function with stringToRelativePX and rewrite it
      const originFunction = interpolation
      const wrappedInterpolation = (...args) => stringToRelativePX(originFunction(...args))
      return wrappedInterpolation
    }
    
    // just return if it is non-function interpolation
    return interpolation;
  }
}

const flexibleStyled = new Proxy(styled, {
  get: (target, prop) => 
    // return Tagged Template Literal to pretend styled component
    (strings, ...interpolations) => {
      const transformedStrings = strings.map(stringToRelativePX)
      const transformedInterpolations = interpolations.map(interpolationToRelativePX)

      return target[prop](transformedStrings, ...transformedInterpolations)
    }
})

const updateOrientation = (newOrientation: IOrientation) => {
  if(newOrientation !== orientation) {
    let temp = currentDesignWidth
    currentDesignWidth = currentDesignHeight
    currentDesignHeight = temp
    orientation = newOrientation
  }
}

interface IFlexibleInitProps {
  designWidth: number,
  designHeight?: number,
  orientation?: IOrientation
}
const getFlexibleStyled = (props: IFlexibleInitProps) => {
  currentDesignWidth = props.designWidth

  if(props.designHeight) {
    currentDesignHeight = props.designHeight
  }

  if(props.orientation) {
    orientation = props.orientation
    // throws warns if it is not a typical 'portrait' or 'landscape'
    if(orientation === 'portrait' && props.designWidth > props.designHeight) {
      console.warn("You are setting orientation to 'portrait' while you passed a designWidth greater than designHeight")
    } else if (orientation === 'landscape' && props.designWidth < props.designHeight) {
      console.warn("You are setting orientation to 'landscape' while you passed a designWidth less than designHeight")
    }
  }

  return { styled: flexibleStyled, px2dp: relativeCaculator, updateOrientation}
}

export default getFlexibleStyled
