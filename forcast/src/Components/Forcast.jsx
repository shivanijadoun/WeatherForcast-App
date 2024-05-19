import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Forecast = ({ title, data = [] }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = data.map((d) => d.title);
    const temperatures = data.map((d) => d.temp);
  
    let myChart = null;
  
    if (chartRef.current !== null) {
      // Destroy existing chart if it exists
      if (myChart) {
        myChart.destroy();
      }
  
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature",
              data: temperatures,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false, // Hide y-axis grid lines
              },
              ticks: {
                color: 'white', // Change y-axis tick color to white
              },
            },
            x: {
              grid: {
                display: false, // Hide x-axis grid lines
              },
              ticks: {
                color: 'white', // Change x-axis tick color to white
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
          elements: {
            bar: {
              borderWidth: 0, // Remove bar border
            },
          },
        },
        
      });
    }
  
    // Return a cleanup function to destroy the chart when component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data]);
  
  

  return (
    <div>
      <div className="flex items-center justify-start mt-6 text-white">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            {/* <p className="font-medium">{d.title}</p> */}
            <img src={d.icon} alt="weather-icon" className="w-12 my-1" />
            <p className="font-medium">{`${d.temp}`}°</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-3">
        <div style={{ width: "600px", height: "400px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Forecast;