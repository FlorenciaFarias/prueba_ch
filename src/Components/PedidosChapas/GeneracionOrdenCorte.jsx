import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {BsChevronRight, BsCheckCircle, BsFillExclamationTriangleFill, BsExclamationCircle} from "react-icons/bs";
import { useTablaPedidosContext} from '../../Context/TablaPedidosContext';
import { TablaCabeceraGeneracion, TablaCorte, CustomModal, SpinnerIcono} from "../Common/Index";
import './GeneracionOrden.css';
import { opcionesDeCorteTabla } from '../../Data/Pedidos';


const GeneracionOrdenCorte = () => {
    const [isLoading, setIsLoading] = useState(true);

     const {selectedRows, limpiarRows} = useTablaPedidosContext();
     const pedidosContext = [...selectedRows];
     const [cortesRestantes, setearCortesRestantes] = useState([]);
     const [pedidosActualizados, setearPedidosActualizados] = useState([...pedidosContext]);
     const articuloContext = selectedRows[0].articuloCodigo;
     const [ordenesCorteApi, setearOrdenesCorteApi] = useState(...opcionesDeCorteTabla);
     const [articuloCod, setearArtCod] = useState('');
     const [asignacionPedidoCorte, setearAsignacionPedidoCorte] = useState([]);
     const [modalPost, setearModalPost] = useState(false);
     const [modalVolver, setearModalVolver] = useState(false);
     const [modalConfirmacionLink, setearModalConfirmacionLink] = useState(false);
     const [mensajeApi, setearMensajeApi] = useState('');
     const [mensajeErrorApi, setearMensajeErrorApi] = useState('');
     const [errorEnResponse, setearErrorEnResponse] = useState(false);

     const [hayCortes, setearHayCortes] = useState(false);
     //
     const toggleModalLinkPost = () => setearModalPost(!modalPost);
     const toggleModalConfirmacionLink = () => setearModalConfirmacionLink(!modalConfirmacionLink);
     const toggleModalVolver = () => setearModalVolver(!modalVolver);
     //Tabla CABECERA
     const renglonesMedidas = selectedRows?.map((value) => {
          return value.medida;
     });
     console.log(articuloCod);
console.log(articuloContext);
     //Tabla OPCIÓN DE CORTES
     const [filaSeleccionadaPedidos, setearFilaSeleccionadaPedidos] = useState(null);
     //Tabla MEDIDAS CHAPAS
     const [medidasDeCortes, setearMedidasDeCortes] = useState([]);
     const [prevMedidaDeCorte, setearPrevMedidaDeCorte] = useState([]);
     const copiaCortes = [...cortesRestantes];
     const pedidosActualizadosCopia = pedidosActualizados;
     const asignaciones = [...asignacionPedidoCorte];
     const [btnDisabled, setearBtnDisabled] = useState(false);
    const pedidos = pedidosActualizadosCopia.map((pedido) =>{
         const {numintReserva, notaDePedido, articuloCodigo, cantidadPedida,cantidadEnOrdenDeCorte, cortesYaPlanificados, numintOrdenPreparacion, renglonOrdenPreparacion} = pedido;
         return {numintReserva, notaDePedido, articuloCodigo, cantidadPedida,cantidadEnOrdenDeCorte, cortesYaPlanificados, numintOrdenPreparacion, renglonOrdenPreparacion};
     });
     console.log(copiaCortes);
     console.log(medidasDeCortes);
     let nuevo = [];
     //Actualización de T. Cabecera mediante T. Medidas
     const asignarCortesChapasAPedidos  = () => {
         setearHayCortes(true);
          medidasDeCortes.forEach((corteActual) => {
               let cortesC = corteActual;
               console.log(cortesC);
               cortesC.Cortes.forEach(corte => {
                    if (!isNaN(corte.MedidaCorte)) {
                         let copiaPedido = ''
                         console.log(pedidosActualizados); 
                         console.log(corte);
                         pedidosContext.forEach((pedido, index) => {
                              if(corte.CantidadChapas > 0){
                                   copiaPedido = pedido.notaDePedido;
                                 console.log(copiaPedido);
     
                                   if(pedido.medida == corte.MedidaCorte && pedido.cantidadPedida > pedido.cantidadEnOrdenDeCorte){
                                        //Cuando se usa toda la chapa
                                        if((pedido.cantidadEnOrdenDeCorte + corte.CantidadChapas) <= pedido.cantidadPedida){
     
                                             let diferenciaCantidades = pedido.cantidadEnOrdenDeCorte += corte.CantidadChapas
                                             console.log(diferenciaCantidades);
                                             asignaciones.push({
                                                  notaDePedido: pedido.notaDePedido,
                                                  articuloCodigo: corte.ArticuloACortar,
                                                  medidaCorte: corte.MedidaCorte,
                                                  cantidadChapas: corte.CantidadChapas,
                                                  });
     
                                             setearAsignacionPedidoCorte(asignaciones);
                                             corte.AltasChapas += corte.CantidadChapas; 
                                             corte.CantidadChapas = 0;
                                   
                                             pedidosActualizadosCopia[index].cantidadEnOrdenDeCorte = diferenciaCantidades;
                                          
                                             setearPedidosActualizados([...pedidosActualizadosCopia]);
                                                  //console.log(corte);
                                             console.log(asignacionPedidoCorte);
                                        }else{  
                                             //Cuando cumplo 2 de 3 pedidos, por ej
                                             let cantidad = pedido.cantidadPedida - pedido.cantidadEnOrdenDeCorte;
                                             console.log(cantidad);
                                             // if( pedido.cantidadEnOrdenDeCorte <= pedido.cantidadPedida){
                                                  corte.CantidadChapas -= cantidad;
                                                  pedido.cantidadEnOrdenDeCorte = pedido.cantidadPedida;
                                                  corte.AltasChapas += cantidad;
                                                  asignaciones.push({
                                                       notaDePedido: pedido.notaDePedido,
                                                       articuloCodigo: corte.ArticuloACortar,
                                                       medidaCorte: corte.MedidaCorte,
                                                       cantidadChapas: cantidad,
                                                       
                                                   });
                                             setearAsignacionPedidoCorte(asignaciones);
                                          console.log(asignacionPedidoCorte);
                                            // }
                                        }
                                   }
                              }
                         });
                         if (corte.CantidadChapas > 0) {
                              //corte.AltasChapas = corte.CantidadChapas
                              const concatenacionRestante = [...copiaCortes, corte];
     
                              setearCortesRestantes(concatenacionRestante);
                         }
                    }
               });
               let concatNuevo = prevMedidaDeCorte.concat(medidasDeCortes);
               console.log(concatNuevo);
               setearPrevMedidaDeCorte(concatNuevo);
          
     });
     console.log(prevMedidaDeCorte);
          
     };
     const cortesChapas = prevMedidaDeCorte.map((corte) =>{
          const {ArticuloCodigo, Cortes} = corte;
          return {ArticuloCodigo, Cortes};
     });
    console.log(cortesChapas);

   
     console.log({ pedidos: pedidos,cortesRestantes: cortesRestantes, cortesChapas: cortesChapas, asignacionPedidos: asignacionPedidoCorte });
        
     const postPedidosARealizar = async () =>{
        setIsLoading(true);

          try {
               let responseOrdenFC = {
                    pedidos: pedidos,
                    cortesRestantes: cortesRestantes,
                    cortesChapas: cortesChapas,
                    asignacionPedidos: asignacionPedidoCorte
               };
                    console.log('CUMPLIDO',responseOrdenFC);
               
            
          } catch (error) {
               setearMensajeErrorApi(error);
               setearErrorEnResponse(true);
               
               console.log('NO GRABÓ',error);
          }finally{
        setIsLoading(false);

          }
     }
    
     const columnasTablaCabecera = [
          { id: 'pedido', label: 'Pedido' },
          { id: 'fechaEntrega', label: 'Fecha de entrega' },
          { id: 'articuloCodigo', label: 'Artículo código' },
          { id: 'articuloNombre', label: 'Artículo nombre' },
          { id: 'medida', label: 'Medida de corte' },
          { id: 'cantidadPedida', label: 'Cantidad pedida' },
          { id: 'cantidadEnOrdenDeCorte', label: 'Cortes planificados' },
          { id: 'cantidadAPreparar', label: 'Cantidad a preparar' },
          { id: 'corteEspecial', label: 'Corte especial' },
      ];

     let colorVerde = 'green';
     let colorGris = 'greey';
    return(
        <>  
            
         
             <section className='section_componenteGC'>
               <div>
               <p style={{marginLeft: '1%', marginTop:'1%', color: 'gray'}}>Selección de pedidos <i>{<BsChevronRight />} Generación de órdenes de corte</i> </p>
               
               <h5 className="h5_titulo__tabla">
                    Artículos seleccionados: {pedidosContext.length}
               </h5>
               <section className="section_tablas__container">
                    <TablaCabeceraGeneracion data={pedidosContext} th={columnasTablaCabecera} />
               </section>
               <h5 className="h5_titulo__tabla">
                    Seleccionar una opción de corte:
               </h5>
               <section className='section_tablas__container'>
                    <TablaCorte 
                         dataCorteApi={ordenesCorteApi}
                         filaSeleccionada={filaSeleccionadaPedidos} 
                         renglonesMedidas ={renglonesMedidas}
                         asignarCortesChapasAPedidos={asignarCortesChapasAPedidos}
                         setearFilaSeleccionada={setearFilaSeleccionadaPedidos} 
                         medidasDeCortes={medidasDeCortes}
                         setearMedidasDeCortes={setearMedidasDeCortes}
                         setearPrevMedidaDeCorte={setearPrevMedidaDeCorte}
                         prevMedidaDeCorte={prevMedidaDeCorte}
                         setearBtnDisabled={setearBtnDisabled}
                    />
               </section>
               </div>
          <nav className='nav_link__pedidos'>
                    <Link className='btn_volver_form_conf'  onClick={toggleModalVolver}>Volver</Link>
                    <CustomModal openModal={modalVolver} toggleModal={toggleModalVolver}
                         toggleHeader={toggleModalVolver} titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>}
                         textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>Perderá las ordenes seleccionadas <br /> y cualquier operación generada. <br /> ¿Desea regresar de todas maneras?</p>}
                         onClickCancel={() => setearModalVolver(false)} textBtnCancel='CANCELAR'
                         onClickConfirm={()=>{
                              setearModalConfirmacionLink(false);
                              limpiarRows();
                         }}  textBtnConfirm={'REGRESAR'} toLink={'/pedidos-chapas'}
                    />
                    
                    {btnDisabled ?
                         (
                              <Link className='btn_verde'
                                   onClick={() => {
                                   toggleModalLinkPost()
                              }}>Guardar</Link> )
                              : (
                              <Link className='btn_disabled'>Guardar</Link>
                         )}
               
                           
                  
                   
                    <CustomModal 
                         openModal={modalPost} 
                         toggleModal={toggleModalLinkPost} 
                         toggleHeader={toggleModalLinkPost} 
                         titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>}
                         textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>¿Desea confirmar la orden de corte?</p>}  
                         onClickCancel={toggleModalLinkPost} 
                         textBtnCancel={'CANCELAR'} 
                         onClickConfirm={() =>{
                         setearModalPost(false);
                         postPedidosARealizar();

                         toggleModalConfirmacionLink();
                    }} textBtnConfirm={'CONFIRMAR ORDEN'}/>
                    
                    {
                         isLoading  
                         ?  <CustomModal   
                              openModal={modalConfirmacionLink} 
                              toggleModal={toggleModalConfirmacionLink}
                              textBody={<SpinnerIcono color={colorVerde} size={'3.2rem'}/>}
                              textBtnConfirm={<SpinnerIcono color={colorGris} size={'1.2rem'}/>}
                             />
                         : <CustomModal 
                              openModal={modalConfirmacionLink} 
                              toggleModal={toggleModalConfirmacionLink} 
                              toggleHeader={toggleModalConfirmacionLink}  
                              titleHeader={errorEnResponse ? <BsExclamationCircle  className="icono-error-stock"/> : <BsCheckCircle className="icono-confirmacion animated.flip"/>}
                              textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>{errorEnResponse ? mensajeErrorApi : mensajeApi}</p>} 
                              onClickConfirm={()=>{
                              setearModalConfirmacionLink(false);
                              limpiarRows();
                         }}
                    toLink={'/pedidos-chapas'} textBtnConfirm={'CERRAR'}
                    />
                    }
                    
                  
                </nav>
             </section>
        </>
    );
};
export default GeneracionOrdenCorte;
