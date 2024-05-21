import { Table } from "reactstrap";
import { useTablaPedidosContext } from "../../Context/TablaPedidosContext";

const TablaPedidosPendientes = ({
    dataApi, 
    resetEstados,
    checkedReset, 
    setearCheckedReset,
    filaSeleccionada, 
    setearFilaSeleccionada,
    mostrarTablaChapasPendientes, 
    setearMostrarTablaChapasPendientes, 
    setearNumintPedidosPendientes
}) => {

    const {setearSelectedRowsCumplimiento} = useTablaPedidosContext();
    let pedidosPendientesApi = dataApi;
    
    const handleFilaSeleccionada = (pedido)=> {
        if (filaSeleccionada === pedido) {
           resetEstados();
          } else {
            setearFilaSeleccionada(pedido);
            setearSelectedRowsCumplimiento(pedido);
            setearNumintPedidosPendientes(pedido.numintOF);
            if (!mostrarTablaChapasPendientes) {
                setearMostrarTablaChapasPendientes(true);
            }
            
        }
       
    };

    const filaFiltradas = filaSeleccionada  ? [filaSeleccionada] : pedidosPendientesApi;

    return (
        <>
        <article className="tabla1">
            <h4 className="h4_tabla1">Seleccionar pedidos pendientes de corte:</h4>
            <Table hover size="lg" striped bordered responsive className="tabla_ChapasPendientes">
                <thead>
                <tr>
                    <th className="th_tabla1"></th>
                    <th className="th_tabla1">Cliente</th>
                    <th className="th_tabla1">Pedido</th>
                    <th className="th_tabla1">Modalidad de entrega</th>
                    <th className="th_tabla1">Fecha de entrega</th>
                    <th className="th_tabla1">Fecha de salida</th>
                    <th className="th_tabla1">Orden de corte</th>

                </tr>


                </thead>
                <tbody>

                    
                {filaFiltradas.map((pedido) => (
                    <tr key={pedido.id}>
                    <td><input type="checkbox" checked={checkedReset} onChange={(e) => { 
                        handleFilaSeleccionada(pedido);
                        setearCheckedReset(e.target.checked);

                    }} /></td>
                    <td >{pedido.cliente} </td>
                    <td >{pedido.pedido} </td>
                    <td >{pedido.modalidadEntrega} </td>
                    <td >{pedido.fechaEntrega} </td>
                    <td >{pedido.fechaSalida} </td>
                    <td >{pedido.orden} </td>

                    
                </tr>
                ))} 
                </tbody>
            </Table>

        </article>

        </>
    );
};

export default TablaPedidosPendientes;