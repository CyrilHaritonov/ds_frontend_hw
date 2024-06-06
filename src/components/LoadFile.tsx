import React, { MouseEventHandler, TouchEventHandler, useState } from "react";
import Results from "./Results";

function LoadFile() {
    const [loadingStage, setLoadingStage] = useState("load-file");
    const uploadLink = process.env.REACT_APP_UPLOAD_LINK;
    const [taskId, setTaskId] = useState<string>("");

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // Add styles to indicate the drop zone (optional)
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        // Handle dropped files

        
        if (!uploadLink) {
            return;
        }
        
        const formData = new FormData();
        formData.append('file', files[0]);
        
        console.log(files[0], formData.forEach(file => console.log("File:", file)));
        try {
            const response = await fetch(uploadLink, {
              method: 'POST',
              body: formData
            });
            const data = await response.json();
            setTaskId(data.id);
            console.log(data);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        setLoadingStage("display-chart");
    };

    const handleClickNewFile: MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setLoadingStage("load-file");
        setTaskId("");
    }

    if (loadingStage === "load-file") {
        return (
            <>
                <h1 id="load-file-instruction">Load file to analyze it</h1>
                <div className="upload-file-field" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <div className="upload-file-text">Drop file here</div>
                </div>
            </>
        );
    } else if (loadingStage === "display-chart") {
        return (
            <>
                <Results taskId={taskId}/>
                <div className="new-file-btn-container">
                    <button className="new-file-btn" onClick={handleClickNewFile}>New File</button>
                </div>
            </>
        );
    }
    
    return (<></>);
}

export default LoadFile;