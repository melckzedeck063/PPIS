import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

function BarChart(props) {
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: []
        }
    });

    const [series, setSeries] = useState([
        {
            name: "Total Items",
            data: []
        }
    ]);

    const all_ministries = useSelector(state => state.ministries);
    const concernByCategory = all_ministries?.dashboard_data?.data?.concernByCategory || [];
    // console.log("Concern By Category:", concernByCategory);

    // Format data for chart
    const categories = concernByCategory.map(item => item.category);
    const totalItems = concernByCategory.map(item => item.totalItems);

    // Update state with formatted data
    useState(() => {
        setSeries([{ name: "Total Items", data: totalItems }]);
        setOptions(prevOptions => ({ ...prevOptions, xaxis: { ...prevOptions.xaxis, categories } }));
    }, [concernByCategory]);

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={series}
                        type="area"
                        width="600"
                    />
                </div>
            </div>
        </div>
    );
};

export default BarChart;
