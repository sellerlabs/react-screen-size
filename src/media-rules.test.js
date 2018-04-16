import mediaRules, { atLeastMediaQueries, mediaQueries } from './media-rules'

it('should output correct atLeast media queries', () => {
  expect(atLeastMediaQueries).toEqual({
    atLeastSm: 'only screen and (min-width: 576px)',
    atLeastMd: 'only screen and (min-width: 768px)',
    atLeastLg: 'only screen and (min-width: 992px)',
    atLeastXl: 'only screen and (min-width: 1200px)',
  })
})

it('should output correct media rules', () => {
  expect(mediaRules).toEqual({
    atLeastSm: '@media only screen and (min-width: 576px)',
    atLeastMd: '@media only screen and (min-width: 768px)',
    atLeastLg: '@media only screen and (min-width: 992px)',
    atLeastXl: '@media only screen and (min-width: 1200px)',
    atMostXs: '@media only screen and (max-width: 575px)',
    atMostSm: '@media only screen and (max-width: 767px)',
    atMostMd: '@media only screen and (max-width: 991px)',
    atMostLg: '@media only screen and (max-width: 1199px)',
    xs: '@media only screen and (max-width: 575px)',
    sm: '@media only screen and (min-width: 576px) and (max-width: 767px)',
    md: '@media only screen and (min-width: 768px) and (max-width: 991px)',
    lg: '@media only screen and (min-width: 992px) and (max-width: 1199px)',
    xl: '@media only screen and (min-width: 1200px)',
    mobile: '@media only screen and (max-width: 767px)',
    desktop: '@media only screen and (min-width: 768px)'
  })
})

it('should output correct media queries', () => {
  expect(mediaQueries).toEqual({
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
    mobile: 'only screen and (max-width: 767px)',
    desktop: 'only screen and (min-width: 768px)'
  })
})
