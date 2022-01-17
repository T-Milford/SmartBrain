import React from 'react';

const Input = ({ updateInput, getFaces }) => {
    return (
    <div>
        <p className='f4 center'>
            Enter an image URL to detect face(s).
        </p>
        <div className='center'>
            <div className='shadow-5 ba br3 center pa4'>
                <input 
                    onChange={updateInput}
                    className='f4 pa2 w-70 center'   
                    type='text' 
                     />
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib blue'
                    onClick={getFaces}
                    >Find face!
                </button>
            </div>
        </div>
    </div>
    )
}



export default Input;