import React,{useState} from 'react'
import { Viewer } from '@react-pdf-viewer/core'; // install this library
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core'; // install this library


export const App = () => {

  // this is the new instance of the plugin used
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // consts for onchange event 
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // const for submission
  const [viewPdf, setViewPdf]=useState(null);

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
        }else{
        setPdfFile(null);
        setPdfFileError('Por favor, seleccione un archivo de formato PDF');
          }
            }else{
              console.log('Select your file');
              }
  }

  // this is the form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
    }else{
      setViewPdf(null);
    }
  } 

  return (
    <div className= 'background'>
      <div>
        <header className= 'header'>
          <b>B a m b i V i e w</b>  
        </header>
        </div>
        <br></br>
        
        <form className='formGroup' onSubmit={handlePdfFileSubmit}>
          <input type="file" className='formControl'
            required onChange={handlePdfFileChange}
          />
          {pdfFileError&&<div className='errorMsg'>{pdfFileError}</div>}
          <br></br>
          <button type="submit" className='submitButton'>
             SUBIR ARCHIVO
          </button>
        </form>
      <br></br> 
        <div className='pdfContainerHidden'>
        {/* if we dont have a pdf or the viewPdf state is null, we dont show the viewer*/}
        {!viewPdf}
        </div>
          <div className= 'viewerHeaderHidden'> </div>
          {viewPdf&&<div className= 'viewerHeader'> <b> VIEWER </b> </div>}
        
        <div className='pdfContainer'>
          {/* if we do have a pdf, we then show the viewer */}
          {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={viewPdf}
              plugins={[defaultLayoutPluginInstance]} />
            </Worker></>}
          </div>
          </div>
  )
}

export default App
