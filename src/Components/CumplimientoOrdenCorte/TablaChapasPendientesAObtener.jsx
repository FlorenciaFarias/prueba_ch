import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import './chapas.css'
import { pedidosTabla3 } from "../../Data/Pedidos";
const TablaChapasPendientes = ({numintTabla2, idTabla2, filaSeleccionadaPendientes, setearFilaSeleccionadaPendientes, isChecked, setearIsChecked}) => {
   const [chapasObtenerAPI, setearChapasObtenerPI] = useState([]);
  
    const [mismosPedidos, setMismosPedidos] = useState([]);

    const getApiChapasObtenersTabla3 =  () => {
            setearChapasObtenerPI(pedidosTabla3);
            setearFilaSeleccionadaPendientes(pedidosTabla3);
            setMismosPedidos(pedidosTabla3);
     
    };
    let cantidades = [];
    if (Array.isArray(chapasObtenerAPI)) {
        cantidades = chapasObtenerAPI.map(cantidad => {
        const {cantidadPedida} = cantidad
        return {cantidadPedida}
    });
};



//console.log(cantidades);
    const handleChangeInput = (e, index) => {
        const { value } = e.target;
        let parseValor = parseInt(value)
        const valor =  isNaN(parseValor) ? null :parseValor;  
        // //console.log(valor);
        //  //console.log(cantidades[index]);
        //  //console.log(cantidades[index].cantidadPedida);
        if (cantidades[index].cantidadPedida > 0) {
            setearIsChecked(true);
        }else{
            setearIsChecked(false);
        }
        if (valor <= cantidades[index].cantidadPedida) {
        //console.log(cantidades[index]);
        //console.log(cantidades[index].cantidadPedida);

        const updateData = filaSeleccionadaPendientes?.map((fila, i) => {
            if (i === index) {
                return {
                    ...fila,
                    cantidadAProducir: valor
                };
            }
            return fila;
    });
    
    setearFilaSeleccionadaPendientes(updateData);
        

    }else{
        const updateData = filaSeleccionadaPendientes?.map((fila, i) => {
            if (i === index) {
                return {
                    ...fila,
                    cantidadAProducir: cantidades[index].cantidadPedida
                };
            };
            return fila;
        });
        
        setearFilaSeleccionadaPendientes(updateData);
    
    };

};

    useEffect(() => {
       
            getApiChapasObtenersTabla3();
        
       
    },[numintTabla2, idTabla2]);

   
    return (
        <>
        <article className="tabla3">
        <h4 className="h4_tabla1">Seleccionar chapas pendientes a obtener:</h4>
        <Table  hover size="lg" striped bordered responsive className="tabla_ChapasPendientes">
            <thead>
            <tr>
                <th className="th_tabla3">Artículo</th>
                <th className="th_tabla3">Medida</th>
                <th className="th_tabla3">Cantidad a producir</th>
                <th className="th_tabla3">Cantidad producida</th>
                <th className="th_tabla3">Corte especial</th>
                <th className="th_tabla3">Nota de pedido</th>
                <th className="th_tabla3">Cliente</th>

            </tr>


            </thead>
            <tbody>

                
               {mismosPedidos.map((chapa, index) => (
                <tr className="tr_tabla3" key={chapa.id}> 
                <td id='articulo' className='td_tabla3'>{chapa.articulo} </td>
                <td id='medida' className='td_tabla3'>{chapa.medida} </td>
                <td id='cantidadPedida' className='td_tabla3'>{chapa.cantidadPedida} </td>
                <td id='cantidadAProducir' 
                 className={filaSeleccionadaPendientes[index]?.cantidadAProducir == 0 || isNaN(filaSeleccionadaPendientes[index]?.cantidadAProducir) ? 'td_tabla3_input0' : 'td_tabla3_input1'}>
                    <input type="number" 
                    name="cantidadAProducir" 
                    value={filaSeleccionadaPendientes[index]?.cantidadAProducir} 
                    onChange={e => handleChangeInput(e, index)} min={0} /> </td>
                    <td className='td_tabla3'>
                        {chapa.conCorteEspecial === 'Si'&&
                            <td className='td_tabla3' >{[
                                chapa.medidaEspecial1,
                                chapa.medidaEspecial2,
                                chapa.medidaEspecial3,
                                chapa.medidaEspecial4
                                ].filter(medida => medida !='').join(', ')} 
                            </td> } 
                    </td>
                
                <td id='pedido'  className='td_tabla3'>{chapa.pedido ? chapa.pedido : ''} </td>
                <td id='cliente' className='td_tabla3'>{chapa.cliente} </td>
                
            </tr>
               ))} 
            </tbody>
        </Table>
        
        </article>
        </>
    );
};

export default TablaChapasPendientes;
