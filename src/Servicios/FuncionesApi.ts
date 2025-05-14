import Instrumento from "../Entidades/Instrumento";
import DetallePedido from "../Entidades/DetallePedido";
import Pedido from "../Entidades/Pedido";
import PreferenceMP from "../Entidades/PreferenceMp";

export function getAllInstrumentos(){
    return fetch(`http://localhost:8080/api/v1/Instrumentos`)
            .then(res=>res.json())
            .then(json=>json)
}

export function getOneInstrumento(id:number){
    return fetch(`http://localhost:8080/api/v1/Instrumentos/${id}`)
            .then(res=>res.json())
            .then(json=>json)
}

export function getAllCategorias(){
    return fetch(`http://localhost:8080/api/v1/Categorias`)
            .then(res=>res.json())
            .then(json=>json)
}

export function deleteInstrumento(id:number) {
    return fetch(`http://localhost:8080/api/v1/Instrumentos/${id}`, {
        method: 'DELETE'
    })
}

export function updateInstrumento(id: number, instrumento: any) {
    return fetch(`http://localhost:8080/api/v1/Instrumentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instrumento)
    })
}



export async function saveInstrumento(data: Instrumento): Promise<Instrumento> {
    const response = await fetch( "http://localhost:8080/api/v1/Instrumentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as Instrumento;
}

export async function saveDetallePedido(data: DetallePedido): Promise<DetallePedido> {
    const response = await fetch( "http://localhost:8080/api/v1/DetallePedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as DetallePedido;
}

export async function savePedido(data: Pedido): Promise<Pedido> {
    const response = await fetch( "http://localhost:8080/api/v1/Pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as Pedido;
}

export function getAllPedidos(){
    return fetch(`http://localhost:8080/api/v1/Pedido`)
            .then(res=>res.json())
            .then(json=>json)
}

export function getAllUsuarios(){
    return fetch(`http://localhost:8080/api/v1/Usuario`)
            .then(res=>res.json())
            .then(json=>json)
}

export async function createPreferenceMP(pedido?:Pedido){
    let urlServer = "http://localhost:8080/api/v1/Pedido/create_preference_mp";
	let method:string = "POST";
    const response = await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(pedido),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
    return await response.json() as PreferenceMP;   
}


export async function getDatosLinea(){
	const urlServer = 'http://localhost:8080/api/v1/Instrumentos/DataLine';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',

		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function getDatosBar(){
	const urlServer = 'http://localhost:8080/api/v1/Instrumentos/DataBar';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',

		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json();
}
export async function getDatosPie() {
    const urlServer = 'http://localhost:8080/api/v1/Instrumentos/DataPie';
    const response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json();
}



export const downloadExcel = async (fechaInicio: Date, fechaFin: Date) => {
    try {
        const response = await fetch(`http://localhost:8080/excel/export?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'pedidos.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading the Excel file:', error);
    }
};
