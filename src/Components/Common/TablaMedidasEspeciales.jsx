import { Table } from "reactstrap";
import "./TablaMedidasEspeciales.css";
const TablaMedidasEspeciales = ({notasDePedido}) => {
    console.log(notasDePedido);
    return(
        <>
        <h5 className="titulo_primario">¡Seleccionó pedidos con medidas especiales!</h5>
        <section className="container_tabla">
        
            <Table borderless responsive size="sm" dark className="tabla_medidasEspeciales">
                <thead>
                
                    <th>Nota/s de pedido/s</th>
                </thead>
                <tbody>
                    {notasDePedido.map((nota, key)=> (
                        <tr key={nota.numintReserva}>
                            
                            <td className="td_medidasEspeciales">{nota.notaDePedido}</td>
                        </tr>
                    ))}
                </tbody>

            </Table>

      
         </section>
         <h5 className="titulo_final">¿Desea continuar?</h5>
        </>
    );
};

export default TablaMedidasEspeciales;