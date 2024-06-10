// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import PdfViewer from "./PdfViewer";

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };
  return (
    <div className="background">
      <h1 className="title">PDF Viewer</h1>
      <PdfViewer />
    </div>
  );
};
export default App;
