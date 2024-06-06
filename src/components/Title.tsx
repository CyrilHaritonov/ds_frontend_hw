import React from "react";

function Title() {
    return (
        <div className="landingInfo">
            <h1 id="title">Distributed classification of the document paragrpahs</h1>
            <div id="description">This app classifies tonality of document by each paragraph.<br/>
            It uses S3 as a file storage and RabbitMQ as a task queue.</div>
            <div className="bottom">
                <svg className="background-svg" id="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                <div id="bottom-text">
                    Scroll down to continue
                </div>
            </div>

        </div>
    );
}

export default Title;