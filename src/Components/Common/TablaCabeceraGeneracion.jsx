import { Table } from "reactstrap";
import './TablaCabeceraGeneracion.css';
const TablaCabeceraGeneracion = ({data, th}) => {
   
    return(
        <>
              

<Table  bordered hover responsive size="sm" striped className='tabla_cabeceraChapas'>
                <thead>
                    <tr>
                   {th.map((columna) => (
                    <th key={columna.id} className="th_colum__tablaCabecera">{columna.label} </th>
                   ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((orden) => (
                        <tr key={orden.numintReserva} className="tr_cabecera">
                        <td className='td_row__cabecera'>{orden.notaDePedido}</td>
                        <td className='td_row__cabecera'>{orden.fechaEntrega} </td>
                        <td className='td_row__cabecera_n'>{orden.articuloCodigo}</td>
                        <td className='td_row__cabecera'>{orden.articuloNombre} </td>
                        <td className='td_row__cabecera_n'>{orden.medida}</td>
                        <td className='td_row__cabecera_n'>{orden.cantidadPedida}</td>
                        <td className='td_row__cabecera_n'>{orden.cantidadEnOrdenDeCorte}</td>
                        <td className='td_row__cabecera_n'>{orden.cantidadAPreparar} </td>
                        <td className='td_row__cabecera_c'>{[

                                    orden.medidaEspecial1,
                                    orden.medidaEspecial2,
                                    orden.medidaEspecial3,
                                    orden.medidaEspecial4
                                ].filter(medida => medida !='').join(', ')} </td> 

                        </tr>

                    ))}

                </tbody>
                </Table>
        </>

    );
};

export default TablaCabeceraGeneracion;



