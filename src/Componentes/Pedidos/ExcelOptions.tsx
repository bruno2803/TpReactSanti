
import { Field, Form, Formik } from 'formik';
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { downloadExcel } from "../../Servicios/FuncionesApi";


interface IExcelOptions {
    setExcel: Dispatch<SetStateAction<boolean>>
}

const ExcelOptions: FC<IExcelOptions> = ({ setExcel }) => {
    
    const [fechaInicio, setFechaInicio] = useState<string>('');

    const [fechaFin, setFechaFin] = useState<string>('');

    const handleSubmit = async (values: any) => {
        console.log(values)
        await downloadExcel(values.fechaInicio, values.fechaFin);
    }

    return (
        <div className='inset-0 bg-black w-full fixed flex  justify-center flex-col items-center z-50 bg-opacity-50'>
            <Formik className='bg-white flex flex-col justify-center items-center p-5 rounded-xl'
                initialValues={{ fechaInicio: '', fechaFin: '' }}
                onSubmit={handleSubmit}>
                <>
                    <Form className='flex flex-col bg-white p-5 space-y-5 rounded-xl '>
                    <button className=' self-end btn btn-error text-white' onClick={() => setExcel(false)}>X</button>
                        <label htmlFor="fechaInicio">Fecha de inicio</label>
                        <Field name="fechaInicio" id="fechaInicio" className="input input-bordered" type="date" />

                        <label htmlFor="fechaInicio">Fecha de fin</label>
                        <Field name="fechaFin" className="input input-bordered" type="date" />
                        <button type="submit" className='btn bg-green-700 border btn-wide text-white hover:bg-green-600' >Descargar Excel</button>
                    </Form>
                </>
            </Formik>
        </div>
    )
}
export default ExcelOptions
