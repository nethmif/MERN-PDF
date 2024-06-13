// import { useState } from "react";
// import "./App.css";

// function PdfViewer() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [selectedFileUrl, setSelectedFileUrl] = useState(null);

//   const handleUploadFiles = (files) => {
//     const uploaded = [...uploadedFiles];
//     files.forEach((file) => {
//       if (uploaded.findIndex((f) => f.name === file.name) === -1) {
//         uploaded.push(file);
//       }
//     });
//     setUploadedFiles(uploaded);
//   };

//   const handleFileEvent = (e) => {
//     const chosenFiles = Array.prototype.slice.call(e.target.files);
//     handleUploadFiles(chosenFiles);
//   };

//   const handleFileClick = (file) => {
//     const fileUrl = URL.createObjectURL(file);
//     // setSelectedFileUrl(fileUrl);
//     window.open(fileUrl, "_blank");
//   };

//   return (
//     <div className="App">
//       <div className="upload-container">
//         <input
//           id="fileUpload"
//           type="file"
//           multiple
//           accept="application/pdf"
//           onChange={handleFileEvent}
//         />

//         <label htmlFor="fileUpload">
//           <a className="btn btn-primary">Upload Files</a>
//         </label>
//       </div>
//       <div className="uploaded-files-list">
//         {uploadedFiles.map((file) => (
//           <div key={file.name}>
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleFileClick(file);
//               }}
//             >
//               {file.name}
//             </a>
//           </div>
//         ))}
//       </div>

//       {selectedFileUrl && (
//         <div className="pdf-viewer">
//           <iframe
//             src={selectedFileUrl}
//             width="600"
//             height="800"
//             title="PDF Viewer"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PdfViewer;

// import { useState } from "react";
// import axios from "axios";
// import "../App.css";
// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// }

// function PdfViewer() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [selectedFileUrl, setSelectedFileUrl] = useState(null);
//   const [image, setImage] = useState();
//   const handleImage = async (e) => {
//     console.log(e.target.files[0]);
//     // setImage(e.target.files[0]);
//     setImage(await convertToBase64(e.target.files[0]));
//   };
//   console.log(image);
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     console.log(image);
//     try {
//       const data = await axios.post("http://localhost:3000/api/upload", {
//         image,
//       });
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const handleUploadFiles = (files) => {
//     const uploaded = [...uploadedFiles];
//     files.forEach((file) => {
//       if (uploaded.findIndex((f) => f.name === file.name) === -1) {
//         uploaded.push(file);
//       }
//     });
//     setUploadedFiles(uploaded);
//   };

//   const handleFileEvent = (e) => {
//     const chosenFiles = Array.prototype.slice.call(e.target.files);
//     handleUploadFiles(chosenFiles);
//   };
//   const handleFileInputChange = (e) => {
//     handleFileEvent(e);
//     handleImage(e);
//   };
//   const handleFileClick = (file) => {
//     const fileUrl = URL.createObjectURL(file);
//     // setSelectedFileUrl(fileUrl);
//     window.open(fileUrl, "_blank");
//   };

//   return (
//     <div className="AppPdf">
//       {/* <div className="upload-container"> */}
//       <div className="background">
//         <h1 className="titlePdf">PDF Viewer</h1>
//       </div>
//       <form className="formStyle">
//         <input
//           id="fileUpload"
//           type="file"
//           className="form-control"
//           multiple
//           accept="application/pdf"
//           onChange={handleFileInputChange}
//         />

//         {/* <label htmlFor="fileUpload">
//           <a className="btn btn-primary">Upload Files</a>
//         </label> */}
//         <button className=" btn-primaryPdf" onClick={handleUpload}>
//           Upload
//         </button>
//         {/* </div> */}
//       </form>
//       <div className="uploaded-files-list">
//         {uploadedFiles.map((file) => (
//           <div key={file.name} className="fileItem">
//             <a
//               href="#"
//               onClick={(e) => {
//                 // e.preventDefault();
//                 handleFileClick(file);
//               }}
//             >
//               {file.name}
//             </a>
//           </div>
//         ))}
//       </div>

//       {selectedFileUrl && (
//         <div className="pdf-viewer">
//           <iframe
//             src={selectedFileUrl}
//             width="600"
//             height="800"
//             title="PDF Viewer"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PdfViewer;

import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import "../App.css";
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
function PdfViewer() {
  const [pdfFile, setPDFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [image, setImage] = useState();

  const handleImage = async (e) => {
    console.log(e.target.files[0]);
    // setImage(e.target.files[0]);
    setImage(await convertToBase64(e.target.files[0]));
  };
  console.log(image);
  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(image);
    try {
      const data = await axios.post("http://localhost:3000/api/upload", {
        image,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    files.forEach((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };
  const handleFileInputChange = (e) => {
    handleFileEvent(e);
    handleImage(e);
    handleChange(e);
    // handleDownload(e.target.files[0]);
  };

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && selectedFile.type === "application/pdf") {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFile(e.target.result);
        };
      } else {
        setPDFile(null);
      }
    } else {
      console.log("Please select");
    }
  };
  const handlePdfLinkClick = (file) => {
    setViewPdf(URL.createObjectURL(file));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  async function onLoadSuccess(pdf) {
    setMetadata(await pdf.getMetadata());
  }
  const newplugin = defaultLayoutPlugin();
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 className="titlePdf">View PDF</h2>
        <div className="formRow">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileInputChange}
            className="form-control"
          />
          <button
            type="submit"
            // className="btn btn-success"
            className="btnView"
            // onClick={handleUpload}
          >
            View PDF
          </button>
        </div>
        <div className="uploaded-files-list">
          {uploadedFiles.map((file) => (
            <div key={file.name} className="fileItem">
              <button
                type="submit"
                className="fileNameBtn"
                // href="#"
                // onClick={(e) => {
                //   // e.preventDefault();
                // }}
                onClick={() => handlePdfLinkClick(file)}
              >
                {file.name}
              </button>
            </div>
          ))}
        </div>
      </form>
      <div className="pdf-container">
        {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js"> */}
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
            </>
          )}
          {/* {!viewPdf && <>No PDF</>} */}
        </Worker>
      </div>
    </div>
  );
}
export default PdfViewer;
