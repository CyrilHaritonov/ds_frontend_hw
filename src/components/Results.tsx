import React, { useEffect, useState } from "react";
import ParagraphChart from "./ParagraphChart";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

type ResultsProps = {
    taskId: string;
}

export type TonalityData = {
    num: number,
    score: number
}

type ResponseData = {
    id: string,
    stats: TonalityData[]
}

Chart.register(...registerables, zoomPlugin);

function Results(props: ResultsProps) {
    const [data, setData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(true);

    const getResultsLink = process.env.REACT_APP_GET_RESULTS_LINK;
    useEffect(() => {
        if (!getResultsLink) {
            return;
        }
        const checkStatus = async () => {
            try {
              const response = await fetch(getResultsLink + props.taskId);
              const data = await response.json();
              
              if (data.status === 'completed') {
                data.stats.unshift({num: 0, score: 0});
                setData(data);
                setLoading(false);
                clearInterval(intervalId); // Stop polling when status is 'done'
              } else {
                setLoading(true);
              }
            } catch (error) {
              console.error('Error fetching status:', error);
              clearInterval(intervalId); // Optionally stop the interval on error
            }
          };
      
          const intervalId = setInterval(checkStatus, 3000);
      
          // Clean up the interval on component unmount
          return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (<>
            <h1 id="load-file-instruction">Results</h1>
            <div className="upload-file-field">
                <div className="upload-file-text">
                    <div className="loader-container">
                        <svg className="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
                    </div>
                </div>
            </div>
        </>);
    }

    return (
        <>
            <h1 id="load-file-instruction">Results</h1>
            <div className="upload-file-field">
                <br />
                <h1 id="description">Request id: {data?.id}</h1>
                <div className="chart-container">
                    <ParagraphChart data={data?.stats ? data.stats : []} />
                </div>
                <h1 id="tip">Pan horizontally to move through chart</h1>
            </div>
        </>
    );
}

export default Results;