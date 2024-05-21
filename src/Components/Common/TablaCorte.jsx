import { Table } from "reactstrap";
import "./TablaCorte.css"
import { useEffect, useState } from "react";
import TablaMedidasChapas from "./TablaMedidasChapas";
const TablaCorte = ({
    dataCorteApi,
    asignarCortesChapasAPedidos,    
    medidasDeCortes,
    setearMedidasDeCortes,
    renglonesMedidas, 
    filaSeleccionada, 
    setearFilaSeleccionada,
    prevMedidaDeCorte,
    setearPrevMedidaDeCorte,
    setearBtnDisabled
    
    }) => {
    const corteActual = dataCorteApi !== null || dataCorteApi !== undefined? dataCorteApi : ''; 
    const [mostrarTablaMedidasChapas, setearMostrarTablaMedidasChapas] = useState(false);
    const [sumatoriaDeMedidas, setearSumatoriaDeMedidas] = useState([]);
    const [idFilas, setearIdFilas] = useState(0);
    const [checkedReset, setearCheckedReset] = useState(false);
    const [filas, setearFilas] = useState([
        { 
          Id : idFilas,
          CantidadChapas: 0,
          SumaCortes: 0, 
          MedidaCorte: Array(15).fill(0), 
        }
    ]);
    console.log(dataCorteApi);
    const [chapasUsadas, setearChapasUsadas] = useState([]);
    const medidaMenor = renglonesMedidas.reduce((min, numero) => Math.min(min, numero), Infinity);
    const [stockChapaSeleccionada, setearStockChapaSeleccionada] = useState([]);
//console.log(medidaMenor);


const handleFilaSeleccionada = (corte)=> {
        if (filaSeleccionada === corte) {
            setearFilaSeleccionada(null);
            setearMostrarTablaMedidasChapas(false);
            setearMedidasDeCortes([]);
          //setearSumatoriaDeMedidas([0]);

            setearFilas([
                { 
                  Id: idFilas,
                  CantidadChapas: 0,
                  SumaCortes: 0, 
                  MedidaCorte: Array(15).fill(0), 
                }
              ]);
        
            // //console.log(filaSeleccionada );
            // //console.log(corte);
        } else {
            setearFilaSeleccionada(corte);
            setearStockChapaSeleccionada(corte.stockDisponible);

            // //console.log(corte);
            if (!mostrarTablaMedidasChapas) {
                setearMostrarTablaMedidasChapas(true);
                
                // //console.log(filaSeleccionada);
            }
            
        }
       
    };
   // //console.log(stockChapaSeleccionada);
    const filaFiltradas = filaSeleccionada  ? [filaSeleccionada] : corteActual;
    const codFamiliaArticulo = filaFiltradas && filaFiltradas[0] ? filaFiltradas[0].codigoArticulo : '';
   
    const largoDeChapa = filaFiltradas && filaFiltradas[0] ? filaFiltradas[0].medidaArticulo : '';
   

    
  
    const reiniciarEstados = () => {
        setearChapasUsadas([...chapasUsadas, filaSeleccionada]);
        setearFilaSeleccionada(null);
        setearSumatoriaDeMedidas([]);
        setearMostrarTablaMedidasChapas(false);
        setearCheckedReset(false);
        setearMedidasDeCortes([]);
        setearFilas([
            { 
              Id: 0,
              CantidadChapas: 0,
              SumaCortes: 0, 
              MedidaCorte: Array(15).fill(0), 
            }
          ]);
       // setearIdFilas(0);
      };
    useEffect(()=>{
        if(filas.length === 0 ){
            setearFilaSeleccionada(null);
            setearMostrarTablaMedidasChapas(false);
            setearCheckedReset(false);
            setearSumatoriaDeMedidas([]);
            setearFilas([
                { 
                  Id: 0,
                  CantidadChapas: 0,
                  SumaCortes: 0, 
                  MedidaCorte: Array(15).fill(0), 
                }
              ]);   
        };
    },[filas]);
    return(
        <>
                <Table  bordered hover responsive size="sm" striped className='tabla_corte'>
                <thead>
                    <tr>
                    <th className="th_colum__tablaCorte"></th>
                    <th className="th_colum__tablaCorte">Artículo código</th>
                    <th className="th_colum__tablaCorte">Medida</th>
                    <th className="th_colum__tablaCorte">Cantidad a consumir</th>
                    <th className="th_colum__tablaCorte">Stock disponible</th>
                    <th className="th_colum__tablaCorte">Stock máximo</th>
                    <th className="th_colum__tablaCorte">Stock a generar</th>
                    </tr>
                </thead>
                <tbody>
                {filaFiltradas.filter((corte) => !chapasUsadas.includes(corte)).map((corte, i) => (
                    <tr key={i} >
                        <td scope='row' className={corte.stockDisponible <= 0 ? 'td_row_stock' :''}>
                            <input type="checkbox" 
                            checked={checkedReset}
                            onChange={(e) =>{
                                handleFilaSeleccionada(corte);
                                setearCheckedReset(e.target.checked);
                            }} 
                            disabled={corte.stockDisponible <= 0} /></td>
                        <td className={corte.stockDisponible <= 0 ? 'td_row_stock' :'td_row__tablaCorte'}>{corte.codigoArticulo}</td>
                        <td className={corte.stockDisponible <= 0 ? 'td_row_stock' :'td_row__tablaCorte'}>{corte.medidaArticulo}</td>
                        <td className={corte.stockDisponible <= 0 ? 'td_row_stock' :'td_row__tablaCorte'}>{corte.cantidadAConsumir}</td>
                        <td className={corte.stockDisponible <= 0 ? 'td_row_stock' :'td_row__tablaCorte'}>{corte.stockDisponible}</td>
                        <td className={corte.stockDisponible <= 0 ? 'td_row_stock' :'td_row__tablaCorte'}>{corte.stockMaximo}</td>
                        <td className={corte.stockDisponible <= 0 ? 'td_row_stock' :'td_row__tablaCorte'}>{corte.stockAGenerarSinPedido}</td>


                    </tr>
                ))}
                </tbody>
            </Table>
            <br />
                {mostrarTablaMedidasChapas ? (
                     filaSeleccionada && filaSeleccionada?.medidaArticulo >= medidaMenor   
                     ? (
                        <TablaMedidasChapas 
                            reiniciarEstados={reiniciarEstados}
                            medidasDeCortes={medidasDeCortes}
                            asignarCortesChapasAPedidos={asignarCortesChapasAPedidos}
                            codFamiliaArticulo={codFamiliaArticulo}
                            largoDeChapa={largoDeChapa}
                            setearMedidasDeCortes={setearMedidasDeCortes}
                            setearPrevMedidaDeCorte={setearPrevMedidaDeCorte}
                            prevMedidaDeCorte={prevMedidaDeCorte}
                            filas={filas}
                            setearFilas={setearFilas}
                           idFilas={idFilas}
                            setearIdFilas={setearIdFilas}
                            sumatoriaDeMedidas={sumatoriaDeMedidas}
                            setearSumatoriaDeMedidas={setearSumatoriaDeMedidas}
                            setearBtnDisabled={setearBtnDisabled}
                            stockChapaSeleccionada={stockChapaSeleccionada}
                        />
                   ) : (
                        <h5 className='h5_medidas__element'>La medida seleccionada es inferior a la medida esperada</h5>
                        )
                ) : null
            }
        </>
    
    );
}
export default TablaCorte;
