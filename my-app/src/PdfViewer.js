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

import { useState } from "react";
import "./App.css";

function PdfViewer() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

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

  const handleFileClick = (file) => {
    const fileUrl = URL.createObjectURL(file);
    // setSelectedFileUrl(fileUrl);
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="App">
      {/* <div className="upload-container"> */}
      <form className="formStyle">
        <input
          id="fileUpload"
          type="file"
          className="form-control"
          multiple
          accept="application/pdf"
          onChange={handleFileEvent}
        />

        {/* <label htmlFor="fileUpload">
          <a className="btn btn-primary">Upload Files</a>
        </label> */}
        <button className="btn btn-primary">Upload</button>
        {/* </div> */}
      </form>
      <div className="uploaded-files-list">
        {uploadedFiles.map((file) => (
          <div key={file.name} className="fileItem">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFileClick(file);
              }}
            >
              {file.name}
            </a>
          </div>
        ))}
      </div>

      {selectedFileUrl && (
        <div className="pdf-viewer">
          <iframe
            src={selectedFileUrl}
            width="600"
            height="800"
            title="PDF Viewer"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;
