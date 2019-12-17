# React resize image

React component for resizing image on the fly with RSZ.io

RSZ.IO is a free image resizing proxy that can resize images, change image formats and optimize images for your web site.

## Install
```
yarn add react-resize-image
```

## Usage
```jsx
import React, { Component } from 'react'
import ResizeImage from 'react-resize-image'

class componentName extends Component {
  render () {
    return (
      <ResizeImage
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg?height=50%25"
        alt="Tsunami bt hokusai"
        options={{ width: 200 }}
      />
    )
  }
}

export default componentName
```

## Props
|Props|Desc|
|----|----|
| `src` | `required` image source, must be absolute path from http or https |
| `alt` | `required` image alt |
| `resizeActive` | `optional` for enabling or disabling resizer. For example if you using your localhost or local development environment, you should disable it.
| `options` | `optional` RSZ.io options |

## Options
Some of rsz.io options

#### width or w
```javascript
{ width: 200 }
{ w: 150 }
{ width: '75%' }
```
Constrains the size of the output image to a given width. The width can be specified in pixels, or as a percentage of the current width. If height is not specified, the resized image will maintain the original aspect ratio. If both height and width are specified, final image dimensions will depend on the resize mode.

#### height or h
```javascript
{ height: 200 }
{ h: 640 }
{ h: '150%' }
```
Constrains the size of the output image to a given height. The height can be specified in pixels, or as a percentage of the current height. If width is not specified, the resized image will maintain the original aspect ratio. If both height and width are specified, final image dimensions will depend on the resize mode. 

#### mode
```js
{ mode: 'max' }
{ mode: 'pad' }
```
If both height and width are specified, mode will determine how the image is resized.

|value|desc|
|---|---|
| `pad`	| The image will be padded out with transparent pixels to become exactly the specified size while maintiaining aspect ratio. By default the padded out image will be centered, and the padding pixels will be white or transparent. The padding can be modified with the anchor parameter. The color of the padding pixels can be modified with the bgcolor parameter. This is the default. |
| `max`	| The image will be scaled to fit within the constraint box while maintaining aspect ratio. The output image is only guaranteed to equal one of the contraints. The other constraint will be smaller than or equal to the size specified. |
| `crop`	| The image will be cropped to match the required aspect ratio. The cropping will be even by default, but can be modified using the anchor, `crop-hint-x` and `crop-hint-y` parameters. |
| `stretch`	| The image will be stretched to fit the specified dimensions. This is the only mode where the image aspect ratio is not preserved. |

---

and many more...

for more options please visit http://rsz.io/