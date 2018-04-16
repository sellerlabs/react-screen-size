// These values are based on the breakpoints in `flexboxgrid2`, which is what `react-flexbox-grid`
// is based on.  See https://github.com/evgenyrodionov/flexboxgrid2
const SM_MIN = 576
const MD_MIN = 768
const LG_MIN = 992
const XL_MIN = 1200

/**
* @description
* Generates a media selector bounded by the provided minimum and maximum screen widths
* @param  {number} min (Optional) The minimum width to be included
* @param  {number} max (Optional) The maximum width to be included
* @return {string}     The media selector
*/
const gs = (min, max) => {
  const minSelector = min ? ` and (min-width: ${min}px)` : ''
  const maxSelector = max ? ` and (max-width: ${max}px)` : ''
  return `only screen${minSelector}${maxSelector}`
}

/**
 * @description
 * An object containing breakpoints for our supported sizes
 * @type {Object}
 */
export const breakpoints = {
  xs: { min: 0, max: SM_MIN - 1 },
  sm: { min: SM_MIN, max: MD_MIN - 1 },
  md: { min: MD_MIN, max: LG_MIN - 1 },
  lg: { min: LG_MIN, max: XL_MIN - 1 },
  xl: { min: XL_MIN, max: Infinity },
}

const sm = gs(breakpoints.sm.min, breakpoints.sm.max)
const atMostXs = gs(null, breakpoints.xs.max)
const atLeastMd = gs(breakpoints.md.min)
/**
* @description
* We export the 'at least' media queries so they can be used to detect changes in
* screen size between breakpoints.
* @type {Object}
*/
export const atLeastMediaQueries = {
  // xs has no lower bound, so not useful
  atLeastSm: gs(breakpoints.sm.min),
  atLeastMd,
  atLeastLg: gs(breakpoints.lg.min),
  atLeastXl: gs(breakpoints.xl.min),
}

/**
* @description
* The default-exported object containing media strings for use with Radium.
* There are 3 categories of breakpoints:
* - atLeast
* - atMost
* - only
* Each containing the following sizes (where it makes sense):
* - xs
* - sm
* - md
* - lg
* - xl
* You can also use the `mobile` predefined value, which applies for 'sm' and small, or use
* `desktop` for 'md' or larger.
*
* @type {Object}
*
* @usage
* import React from 'react'
* import Radium from 'radium'
* import mediaSelectors from 'constants/media-selectors'
*
* // Then when defining styles
* const styles = {
*     productDescription: {
*         fontSize: '10pt',
*         [mediaSelectors.atMost.md]: {
*             fontSize: '8pt',
*         },
*     },
* }
*
* // In JSX
* const ProductDescription = ({ description }) =>
*     <p style={ styles.productDescription }>{ description }</p>
*
* export default Radium(ProductDescription)
*/
export const mediaQueries = {
  ...atLeastMediaQueries,
  atMostXs,
  atMostSm: gs(null, breakpoints.sm.max),
  atMostMd: gs(null, breakpoints.md.max),
  atMostLg: gs(null, breakpoints.lg.max),
  // xl has no upper bound, so not useful
  xs: gs(null, breakpoints.xs.max),
  sm,
  md: gs(breakpoints.md.min, breakpoints.md.max),
  lg: gs(breakpoints.lg.min, breakpoints.lg.max),
  xl: gs(breakpoints.xl.min),
  // aliases
  mobile: atMostXs,
  tablet: sm,
  desktop: atLeastMd,
}
// Turn queries into rules and return in new object
export default Object.keys(mediaQueries).reduce((acc, cur) => {
  acc[cur] = `@media ${mediaQueries[cur]}`
  return acc
}, {})
