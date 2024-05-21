
import { useState, useEffect } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useTablaPedidosContext } from '../../Context/TablaPedidosContext';
import { BsFillSkipStartFill, BsCaretLeftFill, BsFillSkipEndFill, BsCaretRightFill } from 'react-icons/bs';
import PusheoFilasTablaDropDown from './FiltroFilasTabla';
import './Tabla.css'

const Tabla = ({ data, pagina, setearPagina }) => {

  const { selectedRows, setearSelectedRows, itemsFiltrados, setearItemsFiltrados, familiaSeleccionada, setearFamiliaSeleccionada } = useTablaPedidosContext();

  const [itemsPorPagina, setearItemsPorPagina] = useState(10);
  const [totalPaginas, setearTotalPaginas] = useState(Math.ceil(data.length / itemsPorPagina));
  const [primerCheck, setearPrimerCheck] = useState(false);
  
  //Estado para ordenamiento (sort)
  const [grupoFamiliaFiltrada, setearGrupoFamiliaFiltrada] = useState(null);
  //const [idFilaSeleccionada, setearIdFilaSeleccionada] = useState(null);
  const indexUltimoItem = pagina * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  let cantidadDeFilas = [10, 20, 30, 40, 50, 75, 100];
 
  useEffect(() => {
    const filasPorFamiliasFiltradas = familiaSeleccionada ? data.filter((orden) => orden.articuloFamilia === familiaSeleccionada) : data;
    setearGrupoFamiliaFiltrada(filasPorFamiliasFiltradas);
    const familiaOrdenada = selectedRows.concat(filasPorFamiliasFiltradas.filter((fila) => !selectedRows.includes(fila)));
  
  const itemsActuales = familiaOrdenada.slice(indexPrimerItem, indexUltimoItem);
  
  setearItemsFiltrados(itemsActuales);
  setearTotalPaginas(Math.ceil(familiaOrdenada.length / itemsPorPagina));
  
    

    //console.log("Página actual:", pagina);
  }, [familiaSeleccionada, data, indexPrimerItem, indexUltimoItem, pagina, selectedRows]);
  //console.log(grupoFamiliaFiltrada);

  const handlecantidadSeleccionada = (cantidad) => {
    setearItemsPorPagina(cantidad);
    setearTotalPaginas(Math.ceil(data.length / cantidad));
    setearPagina(1);
  };

  const handleRowDeleted = (orden) => {
    const updateSelectedRows = selectedRows.filter((item) => item !== orden);
    setearSelectedRows(updateSelectedRows);
    if (updateSelectedRows.length === 0) {
      setearFamiliaSeleccionada(null);  
      setearItemsFiltrados(data);
      setearPagina(1);

      if (primerCheck) {
        setearPrimerCheck(false);
      }
    }
  };

  const handleRowCheckbox = (orden) => {
    if (!selectedRows.includes(orden)) {
      if (!primerCheck) {
        setearPagina(1);
        setearPrimerCheck(true);
      }
    
      const ordenSeleccionada = [...selectedRows, orden];
      setearSelectedRows((prevSelected) => ordenSeleccionada);
    

      const articuloFamilia = orden.articuloFamilia;
      setearFamiliaSeleccionada(orden.articuloFamilia);
      articuloFamilia ? familiaSeleccionada : null;
    
    } else {
      handleRowDeleted(orden);
    }
  };

  const resetFiltrosFilasFamilia = () => {
    if (!selectedRows) {
      //   //console.log(familiaSeleccionada);
      setearFamiliaSeleccionada(null);
      setearItemsFiltrados(data);
      //console.log(familiaSeleccionada)
      //console.log(itemsFiltrados);
    }

  };

  return (
    <>
      <div className='tabla_container'>
        <div className='tabla_titulo_container'>
          <h6 className='h6_tabla'>Seleccionar artículo/s <span>({data.length})</span></h6>
        </div>
        <Table bordered responsive size="sm" className='tabla_art__componente' >
          <thead>
            <tr>
              <th className="th_colum__tabla_s"></th>
              <th className="th_colum__tabla">Cliente </th>
              <th className="th_colum__tabla">Nota de pedido</th>
              <th className="th_colum__tabla">Cod. Art.</th>
              <th className="th_colum__tabla">Artículo nombre</th>
              <th className="th_colum__tabla">Medida</th>
              <th className="th_colum__tabla">Cant. Ped.</th>
              <th className="th_colum__tabla">Cant. O.C.</th>
              <th className="th_colum__tabla">Pend. Prep.</th>
              <th className="th_colum__tabla">Stock actual</th>
              <th className="th_colum__tabla">OPK</th>
              <th className="th_colum__tabla">Orden Prep.</th>
              <th className="th_colum__tabla">Medidas especiales</th>
              <th className="th_colum__tabla">Cod. Familia</th>
              <th className="th_colum__tabla">Misma familia</th>
              <th className="th_colum__tabla">Vendedor</th>
              <th className="th_colum__tabla">Fecha de salida </th>
              <th className="th_colum__tabla">Vehículo</th>
              <th className="th_colum__tabla">Vuelta</th>
              <th className="th_colum__tabla">Zona</th>
              <th className="th_colum__tabla">Depósito</th>
              <th className="th_colum__tabla">Corte especial</th>
              <th className="th_colum__tabla">Fecha NP</th>
              <th className="th_colum__tabla">Fecha Entr.</th>
            </tr>
          </thead>
          <tbody>
            {itemsFiltrados.map((orden) => 
            (
              
              <tr key={orden.id}>
                <td scope='row'
                className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row__error_c' :'td_row__tabla_c'}>
                  <input type="checkbox"
                  
                    name='numintReserva'
                    disabled={orden.cumpleMedida === "No"}
                    checked={selectedRows.includes(orden)}
                    onChange={() => {
                      handleRowCheckbox(orden);
                      resetFiltrosFilasFamilia();

                    }}
                  />
                </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row__error_c' :'td_row__tabla_c'}>{orden.cliente}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla' && orden.esDesglose === "Si" ? 'td_npDesglosadas selected_row': 'td_row__tabla'}>{orden.notaDePedido}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.articuloCodigo}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.articuloNombre} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.medida}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.cantidadPedida}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.cantidadEnOrdenDeCorte}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.cantidadAPreparar} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.stockActual}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla' && orden.ordenPicking ? 'td_picking ' : 'td_row__tabla' }>{orden.ordenPicking} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.ordenPreparacion} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla_c'}>{[
                  orden.medidaEspecial1,
                  orden.medidaEspecial2,
                  orden.medidaEspecial3,
                  orden.medidaEspecial4
                ].filter(medida => medida !='').join(' - ')} </td>
                
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.articuloFamilia} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.mismaFamilia}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.vendedorNombre}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.fechaSalida} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.vehiculo}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.vuelta}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.zona}</td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.deposito} </td>
                <td className= {orden.cumpleMedida === "No" && orden.conCorteEspecial == 'Si' ? 'td_tablaPedidos selected_row td_row__tabla_c' : 'td_row__tabla_sin'}>{orden.conCorteEspecial} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.fechaNotaDePedido} </td>
                <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.fechaEntrega} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
    </>
  );
}
export default Tabla;  
//{itemsFiltrados.map((orden) => (
//   <tr key={orden.id} 
//   className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' : 'selected_row'}>
  
  
        
//     <td scope='row' className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :''} >
//       <input type="checkbox"
//         name='numintReserva'
//         disabled={orden.cumpleMedida === "No"}
//         checked={selectedRows.includes(orden)}
//         onChange={() => {
//           handleRowCheckbox(orden);
//           resetFiltrosFilasFamilia();

//         }}
//       />
//     </td>
//     <td className={(orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row__error_c' :'td_row__tabla_c') || (orden.esDesglose === "Si" ? '.td_npDesglosadas selected_row': 'td_row__tabla_c')}>{orden.cliente}</td>
//     <td className={(orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla') || (orden.esDesglose === "Si" ? '.td_npDesglosadas selected_row': 'td_row__tabla')}>{orden.notaDePedido}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.articuloCodigo}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.articuloNombre} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.medida}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.cantidadPedida}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.cantidadEnOrdenDeCorte}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.cantidadAPreparar} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row td_row_error_n' :'td_row__tabla_n'}>{orden.stockActual}</td>
//     <td className= {orden.cumpleMedida === "No" && orden.conCorteEspecial == 'Si' ? 'td_tablaPedidos selected_row td_row__tabla_c' : 'td_row__tabla_sin'}>{orden.conCorteEspecial} </td>
//     {/*  */}
   
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.ordenPreparacion} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla_c'}>{[
//         orden.medidaEspecial1,
//         orden.medidaEspecial2,
//         orden.medidaEspecial3,
//         orden.medidaEspecial4
//         ].filter(medida => medida !='').join(' - ')} </td>
    
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.articuloFamilia} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.mismaFamilia}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.vendedorNombre}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.fechaSalida} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.vehiculo}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.vuelta}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.zona}</td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.deposito} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.ordenPicking} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.fechaNotaDePedido} </td>
//     <td className={orden.cumpleMedida === "No" ? 'td_tablaPedidos selected_row' :'td_row__tabla'}>{orden.fechaEntrega} </td>
//   </tr>
// ))}