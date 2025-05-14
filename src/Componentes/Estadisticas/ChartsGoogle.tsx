import { useEffect, useState } from "react";
import { NavBar } from "../Commons/NavBar";
import { getDatosBar, getDatosPie } from "../../Servicios/FuncionesApi";
import Chart from "react-google-charts";


export const optionsBar = {
  title: "Cantidad de Pedidos por Mes y Año",
  legend: { position: "bottom" },
  hAxis: { title: "Mes y Año" },
  vAxis: { title: "Cantidad de Pedidos" },
};

export const optionsPie = {
  title: "Cantidad de Pedidos por Instrumento",
  legend: { position: "bottom" },
};


export const ChartsGoogle = () => {

  const [datosChartBar, setDatosChartBar] = useState<any>();
  const [datosChartPie, setDatosChartPie] = useState<any>();

  const getBarChart = async () => {
    const datosBackend = await getDatosBar();
    console.log(datosBackend);
    setDatosChartBar(datosBackend); 
  };

  const getPieChart = async () => {
    const datosBackend = await getDatosPie();
    console.log(datosBackend);
    setDatosChartPie(datosBackend);
};

  useEffect(() => {
    getPieChart();
    getBarChart();
  }, []);

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
  
        <Chart
          chartType="BarChart"
          data={datosChartBar}
          options={optionsBar}
          width="500px"
          height="400px"
        />
           <Chart
                    chartType="PieChart"
                    data={datosChartPie}
                    options={optionsPie}
                    width="500px"
                    height="400px"
                />
      </div>
    </>
  );
};

