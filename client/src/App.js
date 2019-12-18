import React from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {image64toCanvasRef, extractImageFileExtensionFromBase64, downloadBase64File, base64StringtoFile} from './ResuableUtils';


const imgMaxSize = 100000000//bytes;
const FileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif']
class App extends React.Component {
  //const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  constructor(props) {
    super(props)
    this.imagePreviewCanvasRef = React.createRef()
    this.state = {
        imgSrc: null, 
        crop: {
            aspects: 1/1,
            
        } 
    }
  }
  

    alertFile = (files) => {
        if(files && files.length>0){
            const currentFile = files[0];
            const currentFileSize = currentFile.size;
            const currentFileType = currentFile.type;
            if(currentFileSize > imgMaxSize){
                alert("This file is too big");
                return false;
            }
            if(!FileTypes.includes(currentFileType)){
                alert("This file type is not supported");
                return false;
            }
            return true;
        }

    };

    onDropFn = (files, rejectedFiles) => {
        console.log(files);
        if(rejectedFiles && rejectedFiles.length > 0){
           this.alertFile(rejectedFiles);
        }
        if(files && files.length>0 ){
            const isVerified = this.alertFile(files)
            if(isVerified) {
                const currentFile = files[0]
                const reader = new FileReader()
                reader.addEventListener("load", () => {
                    this.setState({
                        imgSrc: reader.result
                    })

                }, false)

                reader.readAsDataURL(currentFile)
            }


        }
    }
    

    handleImageLoaded = (image) => {
        console.log(image)
    }
    handleOnCropChange = (crop) => {
        //console.log(crop)
        this.setState({crop:crop})
        console.log(this.state)
    }
    handleOnCropComplete = (crop, pixelCrop) => {
        //console.log(crop,pixelCrop)

        const canvasRef = this.imagePreviewCanvasRef.current
        const imgSrc = this.state
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
    }

    handleOnDownloadClick = (event) => {
        event.preventDefault()
        const canvasRef = this.imagePreviewCanvasRef.current
        const imgSrc = this.state.imgSrc;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc)
        const myFilename = "previewFile." + fileExtension

        const myNewCropperFile = base64StringtoFile(imgSrc)
        console.log(myNewCropperFile)

        // to download file 

        downloadBase64File(imgSrc, myFilename)
    }

render(){
    const {imgSrc} = this.state
      return (
        <div>
        

        {imgSrc !== null ? 
            <div> 
                

           
            <ReactCrop src = {imgSrc} 
            crop = {this.state.crop} 
            onImageLoaded = {this.handleImageLoaded}
            onComplete = {this.handleOnCropComplete}
            onChange = {this.handleOnCropChange}/>
           

            <br />
            <p> Preview Canvas Crop </p>
            <canvas ref = {this.imagePreviewCanvasRef}></canvas>
            <button onClick = {this.handleOnDownloadClick}> Download </button>
            </div>

           

            : <Dropzone  onDrop={this.onDropFn} accept={FileTypes} multiple={false} maxSize={imgMaxSize}>
            {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <button style = {{marginTop: "140px", marginLeft: "740px"}} ><p> Click here to select a file</p></button>
                  </div>
                </section>
            )}
        </Dropzone>

    }

       
        </div>
        
      );
    }
}

export default App;

