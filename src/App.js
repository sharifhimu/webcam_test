import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Webcam from "react-webcam";


function App() {

  const [click, setClick] = useState(false)

  const webcamRef = React.useRef(null);

  const contentType = 'image/jpeg';

  const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
     b64Data = b64Data.split(',')[1]
    console.log('b64Data ', b64Data );
    const byteCharacters = window.atob( b64Data );
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, {type: contentType});
    console.log('blob ', blob );
    return blob;
  }

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();

      console.log('img ', imageSrc );

      const blob = b64toBlob(imageSrc, contentType);
      const blobUrl = URL.createObjectURL(blob);

      console.log('blob ', blobUrl );

      let file = new File([blobUrl], "demo");

      console.log('file ', file );

      // fetch(imageSrc).then(res => console.log( 'res ', res.blob() ) )

      // var image = new Image();
      // image.src = imageSrc;
      // document.body.appendChild(image);

      // console.log('url ', image.src );

      setClick(false)
    },
    [webcamRef]
  );

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
  };


  return (
    <>

    <button onClick={() => setClick(true)} > camera </button>

    {
      click &&
      <>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
    }

    </>
  );
}

export default App;
