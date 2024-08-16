import React from 'react';
import * as styles from './text.css';
import classNames from 'classnames';

export enum EColor {
black = 'black',
orange = 'orange',
green = 'green',
white = 'white',
grayf4 = 'grayf4',
grayf3 = 'grayf3',
grayEC = 'grayEC',
grayd9 = 'grayd9',
grayc4 = 'grayc4',
gray99 = 'gray99',
gray66 = 'gray66',
}
type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

interface ITextProps {
As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
children?: React.ReactNode;
size: TSizes;
mobileSize?: TSizes;
tabletSize?: TSizes;
desktopSize?: TSizes;
color?: EColor;
}

export function Text(props: ITextProps) {
  const {
    As = 'span',
     color = EColor.black,
     children,
     size,
     mobileSize,
     desktopSize,
     tabletSize
  } = props;

  const classes = classNames(
    styles[`s${size}`],
    {[styles[`m${mobileSize}`]]: mobileSize},
    {[styles[`t${tabletSize}`]]: tabletSize},
    {[styles[`d${desktopSize}`]]: desktopSize},
    styles[color]
  );

  return (
<As className={classes}>
  {children}
</As>
  );
}
