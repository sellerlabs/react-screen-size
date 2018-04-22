import { atLeastMediaQueries, mediaQueries } from './media-rules';


const alKeys = Object.keys(atLeastMediaQueries);
const defaultScreenSize = Object.keys(mediaQueries).reduce((acc, cur) => {
  acc[cur] = false
  return acc
}, {})




class Provider {
  constructor(medias = {}, screenSize = {}, matchMedia = window.matchMedia) {
    this.listeners = []
    this.medias = { ...mediaQueries, ...medias };
    this.screenSize = { ...defaultScreenSize, ...screenSize };
    this.mediaQueryLists = Object.keys(this.medias).reduce((acc, media) => {
      const curMatchMedia = matchMedia(this.medias[media])
      acc[media] = curMatchMedia;
      return acc;
    }, {});

    // Only add media change listeners on 'atLeast' queries
    // so we don't trigger more than one at a time
    alKeys.forEach(key => {
      this.mediaQueryLists[key].addListener(() => this.update());
    });
  }

  getScreenSize() {
    return this.screenSize;
  }

  update() {
    this.screenSize = { ...this.screenSize };
    Object.keys(this.screenSize).forEach((key) => {
      this.screenSize[key] = this.mediaQueryLists[key].matches;
    });
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1);
    };
  }
}

export default Provider;
