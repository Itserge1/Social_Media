import { DialogContent, DialogActions, Box } from '@mui/material'

import React, { useState } from "react";
const CropEasy = ({photoURL}) => {
    const [crop, setCrop] = useState({x:0, y:0});
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)

    }
    return(
        <div>
            <DialogContent dividers
            // Addin some css to my componet
            sx={{
                background:"#333",
                position:"relative",
                height:400,
                with:"auto",
                minWidth: {sm:500},
            }}
            >
                <Cropper 
                image={photoURL}
                crop={crop}
                Zoom={zoom}
                rotation={rotation}
                aspect={1}

                oneZoomChange = {setZoom}
                oneRotationChange = {setRotation}
                oneCropChange = {setCrop}
                oneCropComplete ={cropComplete}
                />
            </DialogContent>

            <DialogActions sx={{flexDirction:"colum", mx:3, my:2}}>
                <Box>

                </Box>
            </DialogActions>
        </div>
    )
}

export default CropEasy;