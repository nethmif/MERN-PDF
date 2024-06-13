import React from "react";
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
          <button type="submit" className="btnView">
            View PDF
          </button>
        </div>
        <div className="uploaded-files-list">
          {uploadedFiles.map((file) => (
            <div key={file.name} className="fileItem">
              <button
                type="submit"
                className="fileNameBtn"
                onClick={() => handlePdfLinkClick(file)}
              >
                {file.name}
              </button>
            </div>
          ))}
        </div>
      </form>
      <div className="pdf-container">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
            </>
          )}
        </Worker>
      </div>
    </div>
  );
}
export default PdfViewer;
