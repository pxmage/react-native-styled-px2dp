declare type IOrientation = 'portrait' | 'landscape';
interface IFlexibleInitProps {
    designWidth: number;
    designHeight?: number;
    orientation?: IOrientation;
}
declare const getFlexibleStyled: (props: IFlexibleInitProps) => {
    styled: any;
    px2dp: (px: number) => string;
    updateOrientation: (newOrientation: IOrientation) => void;
};
export default getFlexibleStyled;
