import React from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';



const imgMaxSize = 100000000//bytes;
const FileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif']
class App extends React.Component {
  //const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  constructor(props) {
    super(props)
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
        console.log(crop)
        this.setState({crop:crop})
        console.log(this.state)
    }
    handleOnCropComplete = (crop, pixelCrop) => {
        console.log(crop,pixelCrop)
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
            </div>



            : <Dropzone onDrop={this.onDropFn} accept={FileTypes} multiple={false} maxSize={imgMaxSize}>
            {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
            )}
        </Dropzone>}
        
        </div>
        
      );
    }
}

export default App;

