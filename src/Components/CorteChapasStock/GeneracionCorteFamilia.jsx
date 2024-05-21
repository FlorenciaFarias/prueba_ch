import { Link } from 'react-router-dom';
import {BsChevronRight, BsFillExclamationTriangleFill, BsCheckCircle , BsExclamationCircle} from "react-icons/bs";
import { CustomModal, SpinnerIcono, TablaCorte} from '../Common/Index';
import { useTablaPedidosContext } from '../../Context/TablaPedidosContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {TablaCabecera} from './Index';
import './GeneracionCorteFamilia.css';
import { opcionesDeCorteTabla } from '../../Data/Pedidos';

const GeneracionCorteFamilia = () => {
    const [isLoading, setIsLoading] = useState(true);


    const {selectedRowsFamilia, limpiarTablaFamiliaModuloCortes, numArticulo} = useTablaPedidosContext();
    const [opcionesDeCorte, setearOpcionesDeCorte] = useState(...opcionesDeCorteTabla);

     //MODALES
     const [modalVolverInicio, setearModalVolverInicio] = useState(false);
     const [modalVolverConfirmar, setearModalVolverConfirmar] = useState(false);
     const [errorResponse, setearErrorResponse] = useState(false);
     const [errorMensajeApi, setearErrorApi] = useState('');
     const toggleModalVolverInicio = () => setearModalVolverInicio(!modalVolverInicio);
     const toggleModalVolverConfirmar = () => setearModalVolverConfirmar(!modalVolverConfirmar);
     const [confirmarCorteModal, setearConfirmarCorteModal] = useState(false);
    const [modalMsgResponse, setearModalMsgResponse] = useState(false);
     //GESTION DE ASIGNACIÓN:
 
     const chapasContext = [...selectedRowsFamilia];
     const [chapasAsignadas, setearChapasAsignadas] = useState([...chapasContext]);
     //copia actualizada
     const copiaChapasAsignadas =  chapasAsignadas;


    //Tabla OPCIÓN DE CORTES
    const [filaSeleccionada, setearFilaSeleccionada] = useState(null);
    const [articuloCod, setearArtCod] = useState('');

    const renglonesMedidas = selectedRowsFamilia?.map((value) => {
     return value.medida;
});

    //Tabla MEDIDAS CHAPAS
    const [medidasDeCortesFamilia, setearMedidasDeCortesFamilia] = useState([]);
    const [prevMedidaDeCorte, setearPrevMedidaDeCorte] = useState([]);
    const [btnDisabled, setearBtnDisabled] = useState(false);
    const articuloContext = selectedRowsFamilia[0].articuloCodigo;
    //console.log(selectedRowsFamilia[0].articuloCodigo);
    const toggleConfirmarCorte = () => setearConfirmarCorteModal(!confirmarCorteModal);
    const toggleMsgModal = () => setearModalMsgResponse(!modalMsgResponse);
     
     const asignarCortesChapasModuloStock = () =>{
          //console.log(medidasDeCortesFamilia);
         
        
          let ultimoCorte = medidasDeCortesFamilia.length - 1;
 
          //console.log(ultimoCorte);
          let filtrarUltimoCorte = medidasDeCortesFamilia.filter((medidas, index) => medidas.ArticuloCodigo == medidasDeCortesFamilia[ultimoCorte].ArticuloCodigo);
          //console.log(filtrarUltimoCorte);
          filtrarUltimoCorte.forEach((corteActual) =>{

               let corteTabla = corteActual;     
              //console.log(corteTabla);
               corteTabla.Cortes.forEach((corte) => {
                    //console.log(chapasAsignadas);

                    if (!isNaN(corte.MedidaCorte)) {
                         
                         chapasContext.forEach((chapa, index) =>{
                              //console.log(chapasAsignadas);
                                   if (chapa.medida == corte.MedidaCorte) {
                                      //console.log(copiaChapasAsignadas[index].cantidadEnOrdenDeCorte);

                                   copiaChapasAsignadas[index].cantidadEnOrdenDeCorte += corte.CantidadChapas;

                                   //console.log(copiaChapasAsignadas[index].cantidadEnOrdenDeCorte);
                                   setearChapasAsignadas([...copiaChapasAsignadas]);
                                   //console.log(chapasAsignadas);
                              }
                         })
                    }
               })

               let concatenarCorte = prevMedidaDeCorte.concat(medidasDeCortesFamilia);
               setearPrevMedidaDeCorte(concatenarCorte);
          })
     };
//GET TABLA OPCION DE CORTES
console.log(medidasDeCortesFamilia);
const cortesChapas = prevMedidaDeCorte.map((corte) =>{
     const {ArticuloCodigo, Cortes} = corte;
     return {ArticuloCodigo, Cortes};
});
//console.log(cortesChapas);



const columnasTablaCabecera = [
     { id: 'articuloCodigo', label: 'Artículo código' },
     { id: 'medida', label: 'Medida de corte' },
     { id: 'cantidadEnOrdenDeCorte', label: 'Cortes planificados' },
     { id: 'stockActual', label: 'Stock actual' },
     { id: 'stockMaximo', label: 'Stock máximo' },
     { id: 'stockReservado', label: 'Stock reservado' },
     { id: 'ventas', label: 'VPM' },
 ];
 let colorVerde = 'green';
let colorGris = 'greey';
    return(
        <>  
               <p style={{marginLeft: '1%', marginTop:'1%', marginBottom:'2%', color: 'gray'}}>Seleccionar tipo familia stock<i>{<BsChevronRight />}</i> Selección de familias <i> {<BsChevronRight />}Generación de órdenes de corte</i></p>

             <section className='section_componenteGC'>
               <section className='titulo_familia-articulos__section'>
               <p className='titulo_familia' style={{marginLeft: '2.5%'}}>Familia: <span style={{fontWeight: 'bold'}}>{numArticulo}</span></p>

               <p className='titulo_articulos'>Artículos seleccionados: {selectedRowsFamilia.length} </p>

               </section>
               <TablaCabecera data={chapasContext} th={columnasTablaCabecera}/>
               <section className="section_opcionCorte__container">
               <h5 className="h5_titulo__tabla">
                    Seleccionar una opción de corte:
               </h5>
               <TablaCorte 
                    dataCorteApi={opcionesDeCorte}
                    medidasDeCortes={medidasDeCortesFamilia}
                    asignarCortesChapasAPedidos={asignarCortesChapasModuloStock}
                    filaSeleccionada={filaSeleccionada}
                    setearFilaSeleccionada={setearFilaSeleccionada}
                    setearMedidasDeCortes={setearMedidasDeCortesFamilia}
                    prevMedidaDeCorte={prevMedidaDeCorte}
                    renglonesMedidas={renglonesMedidas}
                    setearBtnDisabled={setearBtnDisabled}
               />
                 
               </section>
          <nav className='nav_link__pedidos'>
                    <Link className='btn_volver_form_conf'  onClick={toggleModalVolverInicio}>Volver</Link>
                    
                    <CustomModal openModal={modalVolverInicio} toggleModal={toggleModalVolverInicio}
                         toggleHeader={toggleModalVolverInicio} 
                         titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>} 
                         textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>Perderá las ordenes seleccionadas <br /> y cualquier operación generada. <br /> ¿Desea regresar de todas maneras?</p>}
                         onClickCancel={() => setearModalVolverInicio(false)}
                         textBtnCancel='Cancelar' toLink={'/seleccionar-familia-stock'}
                         onClickConfirm={() => {
                              setearModalVolverConfirmar(false);
                              setearOpcionesDeCorte([]);
                              limpiarTablaFamiliaModuloCortes();
                         }}
                         textBtnConfirm={'REGRESAR'}
                    />

                    {btnDisabled 
                     ?(<Link className='btn_verde' onClick={toggleConfirmarCorte}>Guardar</Link>)
                     :(<Link className='btn_disabled'>Guardar</Link>)
                    }
                    


                    <CustomModal 
                    openModal={confirmarCorteModal} toggleModal={toggleConfirmarCorte}
                    toggleHeader={toggleConfirmarCorte} 
                    titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>}
                         textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>¿Desea confirmar el cumplimiento del corte?</p>}  
                    onClickCancel={toggleConfirmarCorte} textBtnCancel='CANCELAR'
                    onClickConfirm={() => {
                        setearConfirmarCorteModal(false);
                        postApiOrdenFabricacion();

                        toggleMsgModal();
                    }}
                        textBtnConfirm={'CONFIRMAR'}
                />
                {isLoading  
                              ?
                              <CustomModal   openModal={modalMsgResponse} 
                              toggleModal={toggleMsgModal}
                              textBody={<SpinnerIcono color={colorVerde} size={'3.2rem'}/>}
                              textBtnConfirm={<SpinnerIcono color={colorGris} size={'1.2rem'}/>}      />
                              : 
                              <CustomModal openModal={modalMsgResponse} 
                                   toggleModal={toggleMsgModal} 
                                   titleHeader={errorResponse ? <BsExclamationCircle  className="icono-error-stock"/> : <BsCheckCircle  className="icono-confirmacion animated.flip"/>}
                                   textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>{errorResponse ? errorMensajeApi : modalMsgResponse}</p>} 
                                   onClickConfirm={() =>{
                                   setearModalMsgResponse(false);
                                   setearOpcionesDeCorte([]);
                                   limpiarTablaFamiliaModuloCortes();
                                   
                              }} textBtnConfirm={'CERRAR'} toLink={'/seleccionar-familia-stock'}
                    
                    />
}
                   
                </nav>
             </section>
        </>
    );
};
export default GeneracionCorteFamilia;