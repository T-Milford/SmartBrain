import React from 'react';
import '../SmartBrain/SmartBrain.css';

// https://image.shutterstock.com/image-photo/collage-portraits-ethnically-diverse-mixed-260nw-725291137.jpg
            const Image = ({ source, boxes}) => {
                const faceBoxes = boxes.map((box, i) => (
                            <div key={i} className='bounding-box' 
                                    style={{top: box.top + '%', right: box.right + '%', bottom: box.bottom + '%', left: box.left + '%'}}/>
                ))
                return (
                    <div className='center ma'>
                        <div className='mt2 absolute'>
                            <img id='image' style={{width: '400px', height: '100%'}} src={source} alt='pretty'/>
                           {faceBoxes}
                        </div>
                    </div>
                )
            }
export default Image;