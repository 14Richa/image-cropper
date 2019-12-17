import React from 'react';
import { storiesOf } from '@storybook/react';

import ResizeImage from '../src/ResizeImage';
import ResizeImageDist from '../index';

const src = 'http://i.ytimg.com/vi/NMfgvXZdTrA/maxresdefault.jpg'
const options = {
  width: 200
}
storiesOf('ResizeImage', module)
  .add('resize', () => <ResizeImage src={src} options={options} />)
storiesOf('ResizeImageDist', module)
  .add('resize', () => <ResizeImageDist src={src} options={options} />)