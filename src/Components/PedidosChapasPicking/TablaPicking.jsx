import { useState, useEffect } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {BsFillSkipStartFill, BsCaretLeftFill, BsFillSkipEndFill, BsCaretRightFill} from 'react-icons/bs';
import PusheoFilasTablaDropDown from '../Common/FiltroFilasTabla';
import '../Common/Tabla.css'

const TablaPicking = ({data, filasSeleccionadas, setearFilasSeleccionadas, pagina, setearPagina}) => {


   
   const [cliente, setearCliente] = useState(null);
   const [itemsPorPagina, setearItemsPorPagina] = useState(10);
   const [totalPaginas, setearTotalPaginas] = useState(Math.ceil(data.length / itemsPorPagina));
   const [primerCheck, setearPrimerCheck] = useState(false);
   const [itemsFiltrados, setearItemsFiltrados] = useState([]);

   //console.log(totalPaginas);
   const indexUltimoItem = pagina * itemsPorPagina;
   const indexPrimerItem = indexUltimoItem - itemsPorPagina;
   
   let cantidadDeFilas = [10, 20, 30, 40, 50, 75, 100];
   //console.log(data);
  
   useEffect(() => {
   
    const filasPorClienteFiltrados = cliente ? data.filter((orden) => orden.cliente === cliente) : data;

  //   const familiaOrdenada = cliente.concat(filasPorClienteFiltrados.filter((fila) => !filasSeleccionadas.includes(fila)));
  
  // const itemsActuales = familiaOrdenada.slice(indexPrimerItem, indexUltimoItem);
  
  // setearItemsFiltrados(itemsActuales);
  // setearTotalPaginas(Math.ceil(familiaOrdenada.length / itemsPorPagina));
    const itemsActuales = filasPorClienteFiltrados.slice(indexPrimerItem, indexUltimoItem);
    setearItemsFiltrados( (prev) => itemsActuales);
    setearTotalPaginas(Math.ceil(filasPorClienteFiltrados.length / itemsPorPagina));

},[cliente, data, indexPrimerItem, indexUltimoItem, filasSeleccionadas]);

  const handlecantidadSeleccionada = (cantidad) =>{
    setearItemsPorPagina(cantidad)
    setearTotalPaginas(Math.ceil(data.length / cantidad))
    setearPagina(1);
  };

  const handleRowDeleted = (orden) => {
   const updateData = filasSeleccionadas.filter((item) => item !== orden);
   setearFilasSeleccionadas(updateData);
   if (updateData.length === 0) {
    setearCliente(null);
    setearItemsFiltrados(data);
    setearPagina(1);

    if (primerCheck) {
      setearPrimerCheck(false);
    }
  }
  };

  const handleRowCheckbox = (orden) => {
    if (!filasSeleccionadas.includes(orden)) {
      if (!primerCheck) {
        setearPagina(1);
        setearPrimerCheck(true);
      }

      const ordenSeleccionada = [...filasSeleccionadas, orden];
      setearFilasSeleccionadas((prevSelected) => ordenSeleccionada);
      const clienteSeleccionado = orden.cliente;
      setearCliente(orden.cliente);
      clienteSeleccionado ? cliente : null;
    } else {
      handleRowDeleted(orden);
    }
  };

  const resetFiltrosFilasCliente = () => {
     if(!filasSeleccionadas){
    //   //console.log(familiaSeleccionada);
      setearCliente(null);
      setearItemsFiltrados(data);
     // //console.log(familiaSeleccionada)
      //console.log(itemsFiltrados);
     }
    
  };

    return (
        <>
          <div className='tabla_container'>
          <div className='tabla_titulo_container'>
            <h6 className='h6_tabla'>Seleccionar artículo/s <span>({data.length})</span></h6>
          </div>
          <Table  bordered hover responsive size="sm" striped className='tabla_art__componente' >
              <thead>
                  <tr>
                  <th className="th_colum__tabla"></th>
                  <th className="th_colum__tabla">Cliente </th>
                  <th className="th_colum__tabla">Nota de pedido</th>
                  <th className="th_colum__tabla">O. Picking</th>
                  <th className="th_colum__tabla">Cod. Art.</th>
                  <th className="th_colum__tabla">Artículo nombre</th>
                  <th className="th_colum__tabla">Medida</th>
                  <th className="th_colum__tabla">Cant. Ped.</th>
                  <th className="th_colum__tabla">Cant. O.C.</th>
                  <th className="th_colum__tabla">Pend. Prep.</th>
                  <th className="th_colum__tabla">Corte especial</th>
                  <th className="th_colum__tabla">Cod. Familia</th>
                  <th className="th_colum__tabla">Misma familia</th>
                  <th className="th_colum__tabla">Vendedor</th>
                  <th className="th_colum__tabla">Fecha de salida </th>
                  <th className="th_colum__tabla">Vehículo</th>
                  <th className="th_colum__tabla">Vuelta</th>
                  <th className="th_colum__tabla">Zona</th>
                  <th className="th_colum__tabla">Depósito</th>
                  <th className="th_colum__tabla">O.P</th>
                  <th className="th_colum__tabla">Fecha NP</th>
                  <th className="th_colum__tabla">Fecha Entr.</th>
                  </tr>
              </thead>
              <tbody>
                  {itemsFiltrados.map((orden) => (
                      <tr key={orden.id}>
                          <td scope='row' className='td_row__tabla'>
                            <input type="checkbox" 
                              name='id'
                              checked={filasSeleccionadas.includes(orden)}
                              onChange={() => {
                              handleRowCheckbox(orden);
                              resetFiltrosFilasCliente();
                            
                              }}
                            />
                          </td>
                          <td className='td_row__tabla_c'>{orden.cliente}</td>
                          <td className='td_row__tabla'>{orden.notaDePedido}</td>
                          <td className='td_row__tabla'>{orden.ordenPicking} </td>
                          <td className='td_row__tabla_n'>{orden.articuloCodigo}</td>
                          <td className='td_row__tabla'>{orden.articuloNombre} </td>
                          <td className='td_row__tabla_n'>{orden.medida}</td>
                          <td className='td_row__tabla_n'>{orden.cantidadPedida}</td>
                          <td className='td_row__tabla_n'>{orden.cantidadEnOrdenDeCorte}</td>
                          <td className='td_row__tabla_n'>{orden.cantidadAPreparar} </td>
                          <td className={orden.conCorteEspecial == 'Si' ? 'td_row__tabla_c' : 'td_row__tabla_sin'}>{orden.conCorteEspecial} </td>
                          <td className='td_row__tabla'>{orden.articuloFamilia} </td>
                          <td className='td_row__tabla'>{orden.mismaFamilia}</td>
                          <td className='td_row__tabla'>{orden.vendedorNombre}</td>
                          <td className='td_row__tabla'>{orden.fechaSalida} </td>
                          <td className='td_row__tabla'>{orden.vehiculo}</td>
                          <td className='td_row__tabla'>{orden.vuelta}</td>
                          <td className='td_row__tabla'>{orden.zona}</td>
                          <td className='td_row__tabla'>{orden.deposito} </td>
                          <td className='td_row__tabla'>{orden.ordenPreparacion} </td>
                          <td className='td_row__tabla'>{orden.fechaNotaDePedido} </td>
                          <td className='td_row__tabla'>{orden.fechaEntrega} </td>
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
export default TablaPicking; 