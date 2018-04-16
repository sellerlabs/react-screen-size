import React from 'react';
import MediaProvider from '../src/MediaProvider';
import connectScreenSize from '../src/connectScreenSize';
import { mediaQueries } from '../src/media-rules';
import { mount } from 'enzyme';
import { setupMatchMedia } from './utils';


const matchMedia = setupMatchMedia(mediaQueries);
const defaultScreenSize = {
  atLeastSm: false,
  atLeastMd: false,
  atLeastLg: false,
  atLeastXl: false,
  atMostXs: false,
  atMostSm: false,
  atMostMd: false,
  atMostLg: false,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  mobile: false,
  desktop: false
};

const Stub = jest.fn(() => (<div />));
const mapScreenSizeToProps = props => ({
  mobile: props.atMostSm,
  desktop: props.atLeastMd,
});

const ConnectedStub = connectScreenSize(mapScreenSizeToProps)(Stub);

describe('connectScreenSize', () => {
  const Wrapper = ({ foo }) => (
    <MediaProvider screenSize={defaultScreenSize} matchMedia={matchMedia}>
      <ConnectedStub foo={foo} />
    </MediaProvider>
  );

  const wrapped = mount(<Wrapper foo="bar" />);

  const component = wrapped.find(Stub);
  let expectedProps = {
    mobile: false,
    desktop: false,
    foo: 'bar'
  };

  it('passes props to children', () => {
    expect(component.props()).toEqual(expectedProps);
  });

  it('stays the same when a strict query applies', () => {
    Stub.mockClear();
    matchMedia(mediaQueries.atLeastXl).enable();
    expect(Stub.mock.calls.length).toBe(0);
    expect(component.props()).toEqual(expectedProps);
  });

  it('updates the component when an `at least` query applies', () => {
    matchMedia(mediaQueries.atLeastMd).enable();
    expectedProps = {
      ...expectedProps,
      desktop: true
    };
    expect(component.props()).toEqual(expectedProps);
  });

  it('updates the component when new props are passed', () => {
    expectedProps = {
      ...expectedProps,
      foo: 'baz'
    };
    wrapped.setProps({ foo: 'baz' });
    expect(component.props()).toEqual(expectedProps);
  });
});
