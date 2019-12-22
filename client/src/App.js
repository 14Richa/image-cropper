import React from 'react';
//import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {image64toCanvasRef, extractImageFileExtensionFromBase64, downloadBase64File, base64StringtoFile} from './ResuableUtils';
import { Upload, message, Icon, PageHeader, Button, Descriptions } from 'antd';
import { Menu, Dropdown, Row, Col } from 'antd';
import 'antd/dist/antd.css'
//const imgMaxSize = 100000000//bytes;
const FileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif']



class App extends React.Component {

constructor(props) {
    super(props)
    this.imagePreviewCanvasRef = React.createRef();
    this.state = {
        imgSrc: null,
        croppedImageURL: null,
        fileList: [], 
        crop: {
            unit: 'px',
            height: 755,
            width: 450,
            //zoom: 1,
            
        } 
    }
}
    

onDropFn = (info) => {
    let fileList = [];
    console.log(info);
    if (info.file.status === 'uploading' ) {

        //Reduce the file to the latest one.
        fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        const currentFile = fileList[0].originFileObj;
        const currentFileType = currentFile.type;
        if(FileTypes.includes(currentFileType))
        {
            const reader = new FileReader()
                
                reader.addEventListener("load", () => {
                    let image = new Image();
                    image.src = reader.result;
                    image.onload = () => {
                        if(image.width !== 1024 || image.height !== 1024){
                            message.error(`Image is ${image.height} x ${image.width}. Please upload 1024 x 1024 image`);
                            fileList = [];
                        }
                        else
                        {
                            message.success(`${info.file.name} file uploaded successfully`);
        
                            fileList = fileList.map(file => {
                                        if (file.response) {
                                            file.url = file.response.url;
                                          }
                                          return file;
                                        });
                            
                            this.setState({
                            imgSrc: reader.result,
                            imgSrcExt:  extractImageFileExtensionFromBase64(reader.result),
                            fileList: fileList 
                            })
                        }
                    };
        
                }, false)
                reader.readAsDataURL(currentFile);  
        }
        else
        {
            message.error("File Type not supportedgit ");
        }
    }
    else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        this.setState({fileList: []});

    }
};



OnImageLoad = (image) => {
        //console.log(image)
        this.imageRef = image;
};
OnCropChange = (crop) => {
        console.log("Crop inside Cropchange ", crop)
        this.setState({crop:crop})
        //console.log(this.state)
};
    handleOnCropComplete = (crop, pixelCrop) => {

        console.log("Crop inside Cropcomplete", crop);
        
        const canvasRef = this.imagePreviewCanvasRef.current;
        //console.log(canvasRef);
        const {imgSrc} = this.state;
        console.log("CanvasRef", canvasRef);
        if(this.imageRef) image64toCanvasRef(canvasRef, imgSrc, crop, this.imageRef);
    };

    handleClearToDefault = (event) =>{
        //if (event) event.preventDefault()
        const canvas = this.imagePreviewCanvasRef.current
        const ctx = canvas.getContext('2d');
        console.log(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.setState({
            imgSrc: null,
            imgSrcExt: null
        })
    };

    changeCrop = ({ key }) => {
    //message.info(`Click on item ${key}`);
    let h,w;
    switch(key) {
        case "1":
        h = 755; w= 450;
        break;
        case "2":
        h = 365; w= 450;
        break;
        case "3":
        h = 365; w= 212;
        break;
        case "4":
        h = 380; w= 380;
        break;
        default:
        h=0; w=0;
    }
    this.setState({
        crop: {
            x:0,
            y:0,
            unit: "px",
            height: h,
            width: w
        }
    })
    this.handleOnCropComplete({
            unit: "px",
            height: h,
            width: w
        });

    }

    menu = (
    <Menu onClick={this.changeCrop}>
    <Menu.Item key="1">755 x 450</Menu.Item>
    <Menu.Item key="2">365 x 450</Menu.Item>
    <Menu.Item key="3">365 x 212 </Menu.Item>
    <Menu.Item key="4">380 x 380 </Menu.Item>
    <Menu.Item key="5">Custom</Menu.Item>
    </Menu>
    );

    handleDownloadClick = (event) => {
        event.preventDefault()
        const {imgSrc}  = this.state
        if (imgSrc) {
            const canvasRef = this.imagePreviewCanvasRef.current        
            const {imgSrcExt} =  this.state
            const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
            const myFilename = "previewFile." + imgSrcExt

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
            console.log(myNewCroppedFile)
            // download file
            downloadBase64File(imageData64, myFilename)
            this.handleClearToDefault()
        }
    }

render(){
    const {imgSrc, croppedImageURL, fileList} = this.state
      return(
        <div>
            <PageHeader style={{border: '1px solid rgb(235, 237, 240)'}}
                        title="Image Cropper"
                        subTitle="Small utility to crop images and store them locally"
            >

            <Descriptions size="small" column={2}>
                <Descriptions.Item label="Created">Richa Sharma</Descriptions.Item>
                <Descriptions.Item label="Tech"> <a href="https://reactjs.org/" target = "_blank"  >ReactJS</a> and <a href="https://ant.design/docs/react/introduce" target = "_blank">Ant design </a></Descriptions.Item>
                
                <Descriptions.Item label="Remarks">
                    Upload an image and choose the size you wish to crop to. You can choose pre-determined blocks or can do custom crop as well. It accepts images of size 1024x1024 only. 
                </Descriptions.Item>
            </Descriptions>

            <Row style={{ padding: '20px 50px' }}>
                <Col span={4}>
                    <Upload  fileList={[]} onChange={this.onDropFn}  >
                    <Button  disabled={imgSrc}>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                    </Upload>  
                </Col>
                <Col span={8}>
                    <Dropdown.Button overlay={this.menu} disabled={!imgSrc}>
                        <a className="ant-dropdown-link" href="#">Select the crop size</a>
                    </Dropdown.Button>
                </Col>
                <Col span={2}>
                    <Button  disabled={!imgSrc} onClick={this.handleDownloadClick}>Download</Button>
                </Col>
                <Col span={6}>
                    <Button   disabled={!imgSrc} onClick={this.handleClearToDefault}>Clear</Button>
                </Col>
            </Row>
            </PageHeader>

        {
            imgSrc !== null ? 
            <div>
                <Row style={{ padding: '20px 20px' }}> 
                    <Col span={12}>
                        <ReactCrop  src = {imgSrc} 
                                    crop = {this.state.crop} 
                                    onImageLoaded = {this.OnImageLoad}
                                    onComplete = {this.handleOnCropComplete}
                                    onChange = {this.OnCropChange}/>
                    </Col>
                    <Col span={4}>
                    </Col>
                    <Col span={8}>
                    <p> Preview Crop </p>
                        <canvas ref={this.imagePreviewCanvasRef}></canvas>
                    </Col>
                </Row>
            </div>
            : ""
        }        
        </div>
        
      );
    }
}

export default App;
