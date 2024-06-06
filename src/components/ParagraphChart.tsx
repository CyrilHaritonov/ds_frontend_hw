import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { TonalityData } from "./Results";

type ChartProps = {
    data: TonalityData[]
}

const ParagraphChart: React.FC<ChartProps> = (props: ChartProps) => {

    const [chartData, setChartData] = useState({
        labels: props.data.map(data => data.num),
        datasets: [{
            label: "Paragraph tonality",
            data: props.data.map(data => data.score),
            backgroundColor: props.data.map(data => data.score >= 0 ? "rgba(150, 210, 250, 0.5)" : "rgba(210, 150, 170, 0.3)"),
            borderColor: props.data.map(data => data.score >= 0 ? "rgba(150, 210, 250, 1)" : "rgba(210, 150, 170, 0.8)"),
            borderWidth: 2,
            yAxisID: "yAxis",
            xAxisID: "xAxis"
        }]
    })
    
    return (<>
        <Bar data={chartData} options={{
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: "x",
                        threshold: 5,   
                    }
                }
            },
            scales: {
                yAxis: {
                    min: -1,
                    max: 1,
                    title: {
                        display: true,
                        text: "Tonality"
                    },
                },
                xAxis: {
                    min: 1,
                    max: 15,
                    title: {
                        display: true,
                        text: "Paragraph number"
                    }
                }
            }
        }
        } />
    </>);
}

export default ParagraphChart;