import React, { useRef, useState } from "react";
import "./Crop.css"
// importing the material ui button, Slider.
import Button from "@material-ui/core/Button"
import Slider from "@material-ui/core/Slider"

// importing Cropper fron react-easy-crop
import Cropper from "react-easy-crop" 

const Crop = () => {
    // creatinat the Cropper componets props (AKA:argument need for the Cropper componet to work)
    const[image, setImage] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({x:0,y:0})
    const [zoom, setZoom] = useState(1)

    // Creating a reference to use later
    const inputRef = useRef();

    // This function make a normal button act like an input type file
    const triggerFillesSelectPopup = () => inputRef.current.click();

    // This function is going to set the new dimmession of our image
    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        // console.log(croppedAreaPercentage, croppedAreaPixels)
        setCroppedArea(croppedAreaPixels);
    }

    // 
    const onSelectFile = (event) => {
        // console.log(event)
        // Cheking if we select file or not
        if(event.target.files && event.target.files.length > 0) {
            // creating an object
            const reader = new FileReader()
            // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) 
            // stored on the user's computer, using File or Blob objects to specify the file or data to read
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener('load', () => {
                // console.log(reader)
                // console.log(reader.result)
                setImage(reader.result);
            })
        }
    }

    
    return(
        <div>
            <div className="Crop-container">
                <div className="Crop-container-cropper">
                    {
                        // creating a condition befor displaying the croper and the slider;(condition: If we selected an image)
                        image? (
                            <>
                            <div className="Crop-Cropper">
                                <Cropper 
                                image={image} 
                                crop={crop} 
                                zoom={zoom} 
                                aspect={1} 
                                onCropChange={setCrop} 
                                onZoomChange={setZoom} 
                                onCropComplete={onCropComplete}
                                />
                            </div>
                            {/* the Cropper componet required some props(image for example) */}
                            {/* aspect={1} will crop or image as a square. as long as the end result is 1*/}
                            {/* our image will be crop as a square (aspect={2/2}, aspect={4/4}). PS: aspect={2} will give us a rectangle */} 
                            <div className="Crop-Slider">
                                <Slider min={1} max={3} step={0.1} value={zoom} onChange={(event,zoom) => setZoom(zoom)}/>
                                {/*  min={1} need to be equat to the default zoom value */}
                            </div>
                            </>
                        ): null
                    }
                </div>
                <div className="Crop-container-buttons">
                    <input type="file" accept="image/*"ref={inputRef} style={{display:"none"}} onChange={onSelectFile}/>
                    <Button variant="contained" color="primary" onClick={triggerFillesSelectPopup}>Choose</Button>
                    <Button variant="contained" color="secondary">Download</Button>
                </div>
            </div>
        </div>
    )
}

export default Crop;