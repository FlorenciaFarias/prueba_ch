import { Table } from "reactstrap";
import { useState } from "react";

const TablaChapasACortar = ({dataApi, setearNumintTabla3, setearIdTabla3, filaSeleccionadaCortar, setearFilaSeleccionadaCortar,setearOpcionElegida, mostrarTablaChapasObtener, setearMostrarTablaChapasObtener, resetearTabla1Y2}) => {
    const [checkedReset, setearCheckedReset] = useState(false);


    const chapasPendientesApi = dataApi;
    const handleFilaSeleccionada = (chapa)=> {
        setearOpcionElegida(chapa);
        if (filaSeleccionadaCortar === chapa) {
         resetearTabla1Y2();
         setearFilaSeleccionadaCortar(null);
         
         //console.log(chapa);
          } else {
            setearFilaSeleccionadaCortar(chapa);
            setearNumintTabla3(chapa.numintOF);
            setearIdTabla3(chapa.id);
            if (!mostrarTablaChapasObtener) {
                setearMostrarTablaChapasObtener(true);
            }
            
        }
       
    };

    const filaFiltradas = filaSeleccionadaCortar  ? [filaSeleccionadaCortar] : chapasPendientesApi;
    //console.log(filaFiltradas);
    // const filaElegida = filaFiltradas.length === 1 && setearOpcionElegida(filaFiltradas) ;
    return (
        <>
        <article className="tabla2">

            <h4 className="h4_tabla1">Seleccionar chapas pendientes a cortar:</h4>
            <Table hover size="lg" striped bordered responsive className="tabla_ChapasPendientes">
                <thead>
                <tr>
                    <th className="th_tabla2"></th>
                    <th className="th_tabla2">Artículo</th>
                    <th className="th_tabla2">Cantidad a consumir</th>
                </tr>


                </thead>
                <tbody>

                    
                {filaFiltradas.map((chapa) => (
                    <tr key={chapa.id}>
                    <td>
                        <input type="checkbox" 
                        checked={checkedReset} onChange={(e) => { 
                        handleFilaSeleccionada(chapa);
                        setearCheckedReset(e.target.checked); }}/>  
                    </td>
                    <td >{chapa.articulo} </td>
                    <td >{chapa.cantidadAConsumir} </td>
                </tr>
                ))} 
                </tbody>
            </Table>

        </article>
        </>
    );
};

export default TablaChapasACortar;