import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import '../Common/Tabla.css';
//import './TablaFamilia.css'
import { useState, useEffect } from "react";
import { useTablaPedidosContext } from "../../Context/TablaPedidosContext";
import {BsFillSkipStartFill, BsCaretLeftFill, BsFillSkipEndFill, BsCaretRightFill, BsArrowRepeat} from 'react-icons/bs';

import PusheoFilasTablaDropDown from "../Common/FiltroFilasTabla";


const TablaFamilia = () => {
   const {codArticuloFamilia, selectedRowsFamilia, setearSelectedRowsFamilia, limpiarTablaFamiliaModuloCortes} = useTablaPedidosContext(); 
    let filas = selectedRowsFamilia;
    let dataArticuloFamilia = codArticuloFamilia;
    //Paginador
   const [pagina, setearPagina] = useState(1);
   const [itemsPorPagina, setearItemsPorPagina] = useState(10);
   const [totalPaginas, setearTotalPaginas] = useState(Math.ceil(dataArticuloFamilia?.length / itemsPorPagina));
   const [primerCheck, setearPrimerCheck] = useState(false);
   const indexUltimoItem = pagina * itemsPorPagina;
   const indexPrimerItem = indexUltimoItem - itemsPorPagina;
   const [itemsFiltrados, setearItemsFiltrados] = useState([]);
   let cantidadDeFilas = [10, 20, 30, 40, 50, 75, 100];
   console.log(totalPaginas);

console.log(selectedRowsFamilia);


    useEffect(() => {
      const grupoFamilia = dataArticuloFamilia;
      const familiaOrdenada = selectedRowsFamilia.concat(grupoFamilia.filter((fila) => !selectedRowsFamilia.includes(fila)));
  
  const itemsActuales = familiaOrdenada.slice(indexPrimerItem, indexUltimoItem);
  
  setearItemsFiltrados(itemsActuales);
  setearTotalPaginas(Math.ceil(familiaOrdenada.length / itemsPorPagina));
      // setearItemsFiltrados(itemsActuales);
      // setearTotalPaginas(Math.ceil(dataArticuloFamilia?.length / itemsPorPagina));
    }, [dataArticuloFamilia, indexPrimerItem, indexUltimoItem, itemsPorPagina, selectedRowsFamilia]);
    console.log(filas);
    console.log(dataArticuloFamilia);
    
   const handlecantidadSeleccionada = (cantidad) => {
  setearItemsPorPagina(cantidad);
  setearTotalPaginas(Math.ceil(dataArticuloFamilia?.length / cantidad));
  setearPagina(1);
};
    const handleRowDeleted = (pedido) => {
        const updateData = filas.filter((fila) => fila !== pedido);
        setearSelectedRowsFamilia(updateData);
    }; 
    const handleRowCheckbox = (pedido) => {
        if (!filas.includes(pedido)) {
            if (!primerCheck) {
                setearPagina(1);
                setearPrimerCheck(true);
              }
        
            const pedidoSeleccionado = [...filas, pedido];
            setearSelectedRowsFamilia(pedidoSeleccionado);
            // const articuloFamilia = pedido.articuloFamilia;
            // setearFamilia(articuloFamilia);
            // articuloFamilia ? familia : null;

        }else{
            handleRowDeleted(pedido);
        }
    }

    return(
        <>  
        <section className="tabla_container">
          <div className='tabla_titulo_container'>
             <h5 className='h4_tabla' style={{fontWeight:'600'}}>Seleccionar familia/as <span style={{color:'green'}}>({dataArticuloFamilia.length})</span></h5>
                
          </div>
            <Table  bordered hover responsive size="lg" striped className='tabla_art__componente'>
              <thead>
                  <tr>
                    <th className='th_colum__tabla'></th>
                    <th className='th_colum__tabla'>Artículo código</th>
                    <th className='th_colum__tabla'>Medida</th>
                    <th className='th_colum__tabla'>Cantidad en orden de corte</th>
                    <th className='th_colum__tabla'>Stock actual</th>
                    <th className='th_colum__tabla'>Stock máximo</th>
                    <th className='th_colum__tabla'>Stock reservado</th>
                    <th className='th_colum__tabla'>VPM</th>
                  </tr>       
              </thead>
              <tbody>
                 {itemsFiltrados.map((pedido)=> (
                    <tr key={pedido.articuloCodigo}>
                        <td  className='td_row__tabla' scope='row'>
                            <input type="checkbox" 
                             
                              checked={filas.includes(pedido)}
                               onChange={() => {
                               handleRowCheckbox(pedido);
                            
                            
                               }}
                            />
                          </td>
                        <td className='td_row__tabla'>{pedido.articuloCodigo} </td>
                        <td className='td_row__tabla'>{pedido.medida} </td>
                        <td className='td_row__tabla'>{pedido.cantidadEnOrdenDeCorte} </td>
                        <td className='td_row__tabla'>{pedido.stockActual} </td>
                        <td className='td_row__tabla'>{pedido.stockMaximo} </td>
                        <td className='td_row__tabla'>{pedido.stockReservado} </td>
                        <td className='td_row__tabla'>{pedido.ventas} </td>
                    </tr>
)

                 )}
              </tbody>
            </Table>
            <div className="paginacion_control__container">

<nav className='nav_pagFiltroTtabla__container'>
<nav className="nav_dropCantidadFilas__conteiner">
      <PusheoFilasTablaDropDown filas={cantidadDeFilas} cantidadFilas={handlecantidadSeleccionada} filasActuales={itemsPorPagina} />
      <h6 className='h6_tabla filas'>FILAS</h6>
  </nav> 
  <section className="pagination_section__container">
  <Pagination size='sm'>
      <PaginationItem disabled={pagina === 1}>
        <PaginationLink first onClick={() => setearPagina(1)}>
          <BsFillSkipStartFill />
        </PaginationLink>
      </PaginationItem>

      <PaginationItem disabled={pagina === 1}>
        <PaginationLink previous onClick={() => setearPagina(pagina - 1)}>
          <BsCaretLeftFill />
        </PaginationLink>
        </PaginationItem>

        {Array.from({ length: totalPaginas > 5 ? 5 : totalPaginas }, (_, index) => (
          <PaginationItem key={index} active={index + 1 === pagina}>
            <PaginationLink className='paginacion_indiceActual' onClick={() => setearPagina(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPaginas > 5 && pagina > 5 && (
          <PaginationItem disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        )}

        {pagina > 5 && (
          <PaginationItem>
            <PaginationLink onClick={() => setearPagina(pagina)}>
              {pagina}
            </PaginationLink>
          </PaginationItem>
        )}
        
        <PaginationItem disabled={pagina === totalPaginas}>
          <PaginationLink next onClick={() => setearPagina(pagina + 1)}>
            <BsCaretRightFill />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={pagina === totalPaginas}>
          <PaginationLink last onClick={() => setearPagina(totalPaginas)}>
            <BsFillSkipEndFill />
          </PaginationLink>
        </PaginationItem>
    </Pagination> 
    <p className='p_paginador'>Página: {pagina} de {totalPaginas}</p>
  </section>
</nav>
</div>

        </section>
        </>

    );
};

export default TablaFamilia;