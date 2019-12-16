import React, { Component } from 'react';
//import Resizer from 'react-image-file-resizer';
import ImageUploader from 'react-images-upload';

class App extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {

var width, height;

var img = document.createElement("img");
img.onload = function() {
    // `naturalWidth`/`naturalHeight` aren't supported on <IE9. Fallback to normal width/height
    // The natural size is the actual image size regardless of rendering.
    // The 'normal' width/height are for the **rendered** size.

    width  = img.naturalWidth  || img.width;
    height = img.naturalHeight || img.height; 
    console.log(height);
    // Do something with the width and height
}

// Setting the source makes it start downloading and eventually call `onload`
img.src = picture[0];


        console.log(picture[0]);
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        return (
          <div>
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                minFileSize={1204}
                withPreview = {true}
            />
           </div>

        );
    }
}

export default App;

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.fileChangedHandler = this.fileChangedHandler.bind(this);
//         this.state = {img: null};
//     }
 
//     fileChangedHandler(event) {
//         var fileInput = false
//         if(event.target.files[0]) {
//             fileInput = true
//         }
//         if(fileInput) {
//             Resizer.imageFileResizer(
//                 event.target.files[0],
//                 1204,
//                 1204,
//                 'JPG',
//                 100,
//                 0,
//                 uri => {
//                     this.setState({image: uri});
//                     console.log(this.state);
//                 },
//                 'base64'
//             );
//         }
//     }
 
//     render() {
//         return (
//             <div className="App">
//                 <input  type="file" onChange={this.fileChangedHandler}/>
//                 <img src={this.state.image} />
//                 <p> "Hello" </p>
//                 <p> {console.log(this.state.image)}</p>
//             </div>
//         );
//     }
// }
 
//export default App;

