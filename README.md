[![Build Status](https://travis-ci.org/eloytoro/react-screen-size.svg?branch=master)](https://travis-ci.org/eloytoro/react-screen-size)
[![npm version](https://badge.fury.io/js/react-screen-size.svg)](https://badge.fury.io/js/react-screen-size)

## react-screen-size

A HoC to connect your components to screen size changes.  Based on the
[react-screen-size](https://github.com/eloytoro/react-screen-size)
package.  Modified to match the breakpoints of
[react-flexbox-grid](https://roylee0704.github.io/react-flexbox-grid/) and
[flexboxgrid2](https://github.com/evgenyrodionov/flexboxgrid2) (which `react-flexbox-grid` is
based on).

### Other versions

* [react-screen-size@1.x](https://github.com/eloytoro/react-screen-size/tree/v1.x)
* [react-screen-size@2.x](https://github.com/eloytoro/react-screen-size/tree/master)


### Why would you need this

Your component logic depends on screen size and you only want props to update when breakpoints
are reached by a resize.


### Quick Example

```jsx
const Container = ({ xs, mobile, tablet, desktop }) => (
  ...
)

const mapScreenSizeToProps = ({ mobile, tablet, desktop, xs, atLeastMd, atMostSm }) => ({
  isMobile: atMostSm,
  isTablet: tablet,
  isDesktop: atLeastMd,
  isXs: xs,
  isAtLeastMd: atLeastMd,
  isAtMostSm: atMostSm,
})

export default connectScreenSize(mapScreenSizeToProps)(Container);
```

## API

### <MediaProvider [medias] [screenSize]>

Components declared inside of a `MediaProvider` will be listening to screen changes.  So wrap
your whole application's JSX with `<MediaProvider></MediaProvider>`.

#### Props

* `medias` (_Object?_): Extend definitions for screen size criterias. Default values are:

```javascript
{
  atLeastSm: 'only screen and (min-width: 576px)',
  atLeastMd: 'only screen and (min-width: 768px)',
  atLeastLg: 'only screen and (min-width: 992px)',
  atLeastXl: 'only screen and (min-width: 1200px)',
  atMostXs: 'only screen and (max-width: 575px)',
  atMostSm: 'only screen and (max-width: 767px)',
  atMostMd: 'only screen and (max-width: 991px)',
  atMostLg: 'only screen and (max-width: 1199px)',
  xs: 'only screen and (max-width: 575px)',
  sm: 'only screen and (min-width: 576px) and (max-width: 767px)',
  md: 'only screen and (min-width: 768px) and (max-width: 991px)',
  lg: 'only screen and (min-width: 992px) and (max-width: 1199px)',
  xl: 'only screen and (min-width: 1200px)',
  mobile: 'only screen and (max-width: 575px)', // alias of `xs`
  tablet: 'only screen and (min-width: 576px) and (max-width: 767px)', // alias of `sm`
  desktop: 'only screen and (min-width: 768px)' // alias of `atLeastMd`
}
```

* `screenSize` (_Object?_): Set initial value of the screenSize passed to connected components,
  useful this for server side rendering. Example values (based on an arbitrary screen with of 900px)
  are:

```javascript
{
  atLeastSm: true,
  atLeastMd: true,
  atLeastLg: false,
  atLeastXl: false,
  atMostXs: false,
  atMostSm: false,
  atMostMd: true,
  atMostLg: true,
  xs: false,
  sm: false,
  md: true,
  lg: false,
  xl: false,
  mobile: false,
  tablet: false,
  desktop: true
}
```

### `connectScreenSize(mapScreenSizeToProps)`

Subscribes a React component to screen size changes.

#### Arguments

* `mapScreenSizeToProps(screenSize): screenSizeProps` (_Function_): Any time the screen size updates
`mapScreenSizeToProps` will be called with the active media queries as an object structure, these
are the possible values
* `screensize.atLeastSm`
* `screensize.atLeastMd`
* `screensize.atLeastLg`
* `screensize.atLeastXl`
* `screensize.atMostXs`
* `screensize.atMostSm`
* `screensize.atMostMd`
* `screensize.atMostLg`
* `screensize.xs`
* `screensize.sm`
* `screensize.md`
* `screensize.lg`
* `screensize.xl`
* `screensize.mobile`
* `screensize.tablet`
* `screensize.desktop`

#### Returns

A react component that will inject the resulting object of calls to `mapScreenSizeToProps` as props
into your component

### Also exports

* `mediaRules` - Media rules you can use with [Radium](https://github.com/FormidableLabs/radium)
  * Ex: `mediaRules.xs === '@media only screen and (max-width: 575px)'`
* `mediaQueries` - Same as `mediaRules`, but without the `@media`
