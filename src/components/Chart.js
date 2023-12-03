import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
   
  // If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
  // import dynamic from "next/dynamic";
  // const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
   
  const chartConfig = {
    type: "pie",
    width: 480,
    height: 380,
    series: [44, 55, 13, 43, 22,34],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      
      title: {
        show: "",
      },
      labels: ['Water', 'Electricity', 'Health', 'Education', 'Transport','Land Conflicts'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            ,
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60", "#363062"],
    },
  };
   
  export default function ChartContainer() {
    return (
      <Card>
        {/* <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Pie Chart
            </Typography>
            
          </div>
        </CardHeader> */}
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    );
  }