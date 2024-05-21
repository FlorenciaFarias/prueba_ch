import { Table } from "reactstrap";
import '../Common/TablaCabeceraGeneracion.css';
const TablaCabecera = ({data, th}) => {
   
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
                        <tr key={orden.articuloCodigo} className="tr_cabecera">
                        <td className='td_row__cabecera'>{orden.articuloCodigo}</td>
                        <td className='td_row__cabecera'>{orden.medida} </td>
                        <td className='td_row__cabecera_n'>{orden.cantidadEnOrdenDeCorte}</td>
                        <td className='td_row__cabecera'>{orden.stockActual} </td>
                        <td className='td_row__cabecera'>{orden.stockMaximo} </td>
                        <td className='td_row__cabecera'>{orden.stockReservado} </td>
                        <td className='td_row__cabecera'>{orden.ventas} </td>

                        
                        </tr>
                    ))}
                </tbody>
                </Table>
        </>
    );
};
export default TablaCabecera;



