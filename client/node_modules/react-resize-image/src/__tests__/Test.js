import React from 'react';

// import { render } from 'enzyme';
import { expect } from 'chai';

import getRSZioUrl from '../getRSZioUrl'

describe('<ResizeImage />', () => {
  
  it('should add rsz.io before hostname', () => {
    const src = 'http://test.com/image.jpeg'
    const expectedSrc = 'http://rsz.io/test.com/image.jpeg'
    expect(getRSZioUrl(src)).to.equal(expectedSrc);
  });

  it('should add query params', () => {
    const src = 'http://test.com/image.jpeg'
    const options = { width: 200 }
    const expectedSrc = 'http://rsz.io/test.com/image.jpeg?width=200'
    expect(getRSZioUrl(src, options)).to.equal(expectedSrc);
  });

  it('should not changing https', () => {
    const src = 'https://test.com/image.jpeg'
    const options = { width: 200 }
    const expectedSrc = 'https://rsz.io/test.com/image.jpeg?width=200'
    expect(getRSZioUrl(src, options)).to.equal(expectedSrc);
  });

  it('should not changing src from relative path', () => {
    const src = '../assets/image.jpeg'
    const expectedSrc = src
    expect(getRSZioUrl(src)).to.equal(expectedSrc);
  });

});