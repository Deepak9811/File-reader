import React, { useEffect } from "react";
import "./styles.css";

const PDFJS = window.pdfjsLib;

export default function App() {
  const [pdf, setPdf] = React.useState([]);
  const [width, setWidth] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pdfRendering, setPdfRendering] = React.useState("");
  const [pageRendering, setPageRendering] = React.useState("");
  

  async function showPdf(event) {
    try {
      setPdfRendering(true);

      for (let i = 1; i < 5; i++) {
        setTimeout(function timer() {
          console.log("hello world");
        }, i * 3000);
      }
      
      const data = [];
      for (let i = 0; i < event.target.files.length; i++) {
        // console.log("i :- ", i);
        const file = event.target.files[i];
        const uri = URL.createObjectURL(file);
        // console.log("uri :- ",uri)
        // var _PDF_DOC = await PDFJS.getDocument({ url: uri }).promise
        // console.log("_PDF_DOC :- ", _PDF_DOC);
        data.push({
          file: uri,
          name:event.target.files[i].name
          // placeValue: _PDF_DOC.numPages,
        });
      }

      console.log("Data  :- ", data);

      const newData = [];
      for (let i = 0; i < data.length; i++) {
        setTimeout(async function timer() {
          var _PDF_DOC = await PDFJS.getDocument({ url: data[i].file }).promise
          console.log("i :- ", i);
          console.log("_PDF_DOC :- ", _PDF_DOC.numPages);

          console.log("hello world");

          newData.push({
            numOfPage: _PDF_DOC.numPages,
            name:data[i].name
            // placeValue: _PDF_DOC.numPages,
          });
        }, i * 3000);
      }

      console.log("new Data :- ", newData);
      // var _PDF_DOC = await PDFJS.getDocument({ url: data[0].file }).promise
      //   console.log("_PDF_DOC :- ", _PDF_DOC.numPages);
      setPdf(newData);
      setPdfRendering(false);
      return;
      // const file = event.target.files[0];
      // const uri = URL.createObjectURL(file);

      // console.log("page uri", uri);

      // console.log("page lenght", _PDF_DOC.numPages); // start here

      // setPdf(_PDF_DOC);
      // setPdfRendering(false);
      // document.getElementById("file-to-upload").value = "";
    } catch (error) {
      alert(error.message);
    }
  }

  // function changePage() {
  //   setCurrentPage();
  // }

  // async function renderPage() {
  //   setPageRendering(true);
  //   const imagesList = [];
  //   const canvas = document.createElement("canvas");
  //   canvas.setAttribute("className", "canv");
  //   let canv = document.querySelector(".canv");

  //   for (let i = 1; i <= pdf.numPages; i++) {
  //     var page = await pdf.getPage(i);
  //     var viewport = page.getViewport({ scale: 1 });
  //     canvas.height = viewport.height;
  //     canvas.width = viewport.width;
  //     var render_context = {
  //       canvasContext: canvas.getContext("2d"),
  //       viewport: viewport,
  //     };
  //     console.log("page lenght", pdf.numPages);
  //     setWidth(viewport.width);
  //     setHeight(viewport.height);
  //     await page.render(render_context).promise;
  //     let img = canvas.toDataURL("image/png");
  //     imagesList.push(img);
  //   }
  //   setImages(imagesList);
  //   setPageRendering(false);
  // }

  // useEffect(() => {
  //   pdf && renderPage();
  //   // eslint-disable-next-line
  // }, [pdf, currentPage]);

  // const styles = {
  //   wrapper: {
  //     display: "flex",
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     gap: "5px",
  //   },
  //   imageWrapper: {
  //     // width: "300px",
  //     // height: "350px",
  //     border: "1px solid rgba(0,0,0,0.15)",
  //     borderRadius: "3px",
  //     boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
  //     padding: "0",
  //   },
  // };

  return (
    <div className="App">
      {/* <div className="input-group" style={{ width: "50%", marginBottom: "5%" }}>
         <input
           type="file"
           onClick={() => document.getElementById("file-to-upload").click()}
           multiple
           className="form-control"
           id="inputGroupFile04"
           aria-describedby="inputGroupFileAddon04"
           aria-label="Upload"
         />
       </div> */}

      <button
        className="btn btn-primary"
        id="upload-button"
        onClick={() => document.getElementById("file-to-upload").click()}
      >
        Select PDF
      </button>

      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        multiple
        hidden
        onChange={showPdf}
      />
      <div id="pdf-main-container">
        <div id="pdf-loader" hidden={!pdfRendering}>
          Loading document ...
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">File name</th>
              <th scope="col">Number of pages</th>
            </tr>
          </thead>
          {pdf.map((item, i) => {
            console.log("item :- ", item);
            return (
              <React.Fragment key={i}>
                <tbody>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.numOfPage}</td>
                  </tr>
                </tbody>
              </React.Fragment>
            );
          })}
        </table>
      </div>
    </div>
  );
}



//------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// // import pdf from '../../assets/10155.pdf'
// // import DataList from "./DataList";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // const resumeLink = pdf;

// export default function App() {
//   const [fileName, setFileName] = useState([]);
//   const [fileUrl, setFileUrl] = useState([]);
//   const [numPages, setNumPages] = useState(null);
//   const [width, setWidth] = useState(1200);
//   const [showDoc, setShowDoc] = useState(false);
//   const [newData, setNewData] = useState([])

//   const handle = (event) => {
//     const data = [];
//     for (let i = 0; i < event.target.files.length; i++) {
//       data.push({file:event.target.files[i],placeValue:i});
//     }
//     console.log("data :- ", data);
//     setFileName(data);
//     setShowDoc(true);

//     var id = data.map((t) => t.name);

//     // let newArr=  <DataList data={data} />
//     // console.log("new Array :- ",newArr)
//     // setNewData(newArr)

//     // let newArr = [];

//     // for (let i = 0; i < id.length; i++) {
//     //   newArr.push({ name: id[i] });
//     // }

//     // console.log("fileURL  :- ", newArr);
//     // setFileUrl(newMap);

//     // create url
//     // const test = new Blob([data], { type: "application/pdf" });

//     // const blob = new Blob([new Uint8Array(data)], { type: "application/pdf" });
//     // const fileURL = URL.createObjectURL(blob);
//     // console.log("fileURL  :- ", fileURL);
//     // window.open(fileURL);
//   };

//   // console.log("DataList :- ",DataList);
//   useEffect(() => {
//     setWidth(window.innerWidth);
//   }, []);

//   function onDocumentLoadSuccess({ numPages},i ) {
//     // console.log("first :- ", numPages,i);
//     // return
//     let addNumPage = [...fileName]
//     // console.log("check pages :- ",addNumPage[i].placeValue,numPages)
//     addNumPage[i].placeValue=numPages
//     // console.log("check pages 2:- ",addNumPage,numPages)
//     setNumPages(numPages);
//   }

//   // const sendData = (pageNumber) => console.log(pageNumber)

//   // const getUrl = () => {
//   //   let newArr=  <DataList data={fileName} sendData={sendData}/>;
//   //   console.log("get array :- ",newArr.props.data)
//   //   return  newArr
//   // };

//   // const getData = ()=>{
//   //   let get = document.getElementById('getDataArr')
//   //   console.log("get :- ",get)
//   // }

//   console.log("fileUrl :- ", fileUrl);

//   return (
//     <div className="App" style={{ padding: "5%", marginBottom: "5%" }}>
//       <h1>Select file...</h1>
//       {/*  */}

//       <div className="input-group" style={{ width: "50%", marginBottom: "5%" }}>
//         <input
//           type="file"
//           onChange={handle}
//           multiple
//           className="form-control"
//           id="inputGroupFile04"
//           aria-describedby="inputGroupFileAddon04"
//           aria-label="Upload"
//         />
//       </div>

//       {/* <img src={'/assets/logo192.png'} alt="" /> */}

//       {showDoc && (
//         <>
//           {/* url:- <div id="getDataArr">{getUrl()}</div>
//           url 1:- <div>{getData()}</div> */}
//           <></>
//           {/* <div style={{height:"5px", width:"1px",display:"none"}}>
//         {Array.apply(null, Array(numPages))
//           .map((x, i) => i + 1)
//           .map((page) => (
//             <Document
//               file={require(`${'./assets/'+fileName[0].name}`)}
//               className="d-flex justify-content-center"
//               onLoadSuccess={onDocumentLoadSuccess}
//             >
//               <Page pageNumber={page} scale={width > 786 ? 1.7 : 0.6} />
//             </Document>
//           ))}
//         </div> */}
//         </>
//       )}

//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">File name</th>
//             <th scope="col">Number of pages</th>
//           </tr>
//         </thead>
//         {fileName.map((item, i) => {
//           console.log("item :- ",item)
//           return (
//             <React.Fragment key={i}>
//               <tbody>
//                 <tr>
//                   <th scope="row">{i + 1}</th>
//                   <td>{item.file.name}</td>
//                   <td>{item.placeValue}</td>
//                   <td>
//                     <div
//                       style={{ display:"none" }}
//                     >
//                       {Array.apply(null, Array(numPages))
//                         .map((x, i) => i + 1)
//                         .map((page) => (
//                           <Document
//                             file={require('./assets/'+item.file.name)}
//                             className="d-flex justify-content-center"
//                             onLoadSuccess={(num)=>onDocumentLoadSuccess(num,i)}
//                             options={{
//                               cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
//                               cMapPacked: true,
//                             }}
//                           >
//                             {/* <Page
//                               pageNumber={page}
//                               scale={width > 786 ? 1.7 : 0.6}
//                             /> */}
//                           </Document>
//                         ))}
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </React.Fragment>
//           );
//         })}
//       </table>
//     </div>
//   );
// }
