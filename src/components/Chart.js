import {
    Card,
    CardBody,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const chartConfig = {
    type: "pie",
    width: 440,
    height: 440,
    series: [],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            show: "",
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 240
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: [ "#ff8f00", "#00897b", "#1e88e5", "#d81b60", "#363062"],
    },
};

export default function ChartContainer() {
    const all_ministries = useSelector(state => state.ministries);
    const concernByStatus = all_ministries?.dashboard_data?.data?.concernByStatus || [];

    // Extracting data for series and labels
    const series = concernByStatus.map(item => item.concernCount);
    const labels = concernByStatus.map(item => item.status);


    chartConfig.series = series;
    chartConfig.options.labels = labels;

    return (
        <Card>
            <CardBody className="mt-4 grid place-items-center px-2">
                <Chart {...chartConfig} />
            </CardBody>
        </Card>
    );
}
