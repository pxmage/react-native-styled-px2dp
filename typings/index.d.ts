/// <reference types="styled-components-react-native" />
import { ReactNativeStyledInterface, DefaultTheme } from "styled-components/native";
declare type IOrientation = 'portrait' | 'landscape';
interface IFlexibleInitProps {
    designWidth: number;
    designHeight?: number;
    orientation?: IOrientation;
}
declare const getFlexibleStyled: (props: IFlexibleInitProps) => {
    styled: ReactNativeStyledInterface<DefaultTheme>;
    px2dp: (px: number) => number;
    updateOrientation: (newOrientation: IOrientation) => void;
};
export default getFlexibleStyled;
