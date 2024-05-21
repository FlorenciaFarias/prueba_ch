import { useEffect, useState } from "react";
import { useTablaPedidosContext } from "../../Context/TablaPedidosContext";
import {CustomModal, FiltroArt, SpinnerIcono} from "../Common/Index";
import {BsArrowRepeat, BsTruck, BsFillExclamationTriangleFill, BsExclamationCircle, BsCheckCircle} from 'react-icons/bs';
import {TablaPedidosPendientes, TablaChapasACortar, TablaChapasPendientes} from "./Index";
import axios from "axios";
import { Link } from "react-router-dom";
import './Cumplimiento.css';
import { pedidosTabla1, pedidosTabla2 } from "../../Data/Pedidos";

const CumplimientoOrdenCorte = ()=> {
    const [isLoading, setIsLoading] = useState(true);


    const {URL_INPUT, setearSelectedRowsCumplimiento} = useTablaPedidosContext();

    const [cargarDataOrdenesCumplimiento, setearCargarDataOrdenesCumplimiento] = useState(false);
    //TABLA PEDIDOS PENDIENTES
    const [pedidosPendientesAPI, setearPedidosPendientesAPI] = useState([]);
    const [filaSeleccionada, setearFilaSeleccionada] = useState(null);
    const [checkedResetTabla1, setearCheckedResetTabla1] = useState(false);

    const [mostrarTablaChapasPendientes, setearMostrarTablaChapasPendientes] = useState(false);
    
    //TABLA 2 CHAPAS PENDIENTES
    const [chapasPendientesAPI, setearChapasPendientesAPI] = useState([]);
    const [numintPedidosPendientes, setearNumintPedidosPendientes] = useState([]);
    const [filaSeleccionadaCortar, setearFilaSeleccionadaCortar] = useState(null);
    const [mostrarTablaChapasObtener, setearMostrarTablaChapasObtener] = useState(false);
    const [numintChapasPendientes, setearNumintChapasPendientes] = useState([]);
    const [idChapaPendiente, setearIdChapaPendiente] = useState('');
    const [opcionElegida, setearOpcionElegida] = useState([]);
    
    
    
    //TABLA 3 CHAPAS A CORTAR
    const [filaSeleccionadaPendientes, setearFilaSeleccionadaPendientes] = useState([]);
    const [msgAPIPost, setearMsgAPIPost] = useState('');
    const [isCheckedTabla3, setearIsCheckedTabla3] = useState(false);

     //FiltroArt
     const [filtrar, setearFiltro] = useState('');
    


    //MODAL
    const [confirmarCorteModal, setearConfirmarCorteModal] = useState(false);
    const [modalMsgResponse, setearModalMsgResponse] = useState(false);
    const [errorResponse, setearErrorResponse] = useState(false);
    const [errorMensajeApi, setearErrorApi] = useState('');
    //const [refrescarVista, setearConfirmacionFinal] = useState(false);

    const toggleConfirmarCorte = () => setearConfirmarCorteModal(!confirmarCorteModal);
    const toggleMsgModal = () => setearModalMsgResponse(!modalMsgResponse);

console.log(filaSeleccionadaPendientes);
//RESET TABLAS
const resetEstados = () =>{
    setearPedidosPendientesAPI([]);
    setearMostrarTablaChapasPendientes(false);          //T.1 => T.2
    setearSelectedRowsCumplimiento([]);                 //T.2
    setearFilaSeleccionada(null);
    setearCheckedResetTabla1(false);                       
    setearNumintPedidosPendientes([]);                  
    setearChapasPendientesAPI([]);                          
    setearMostrarTablaChapasObtener(false);             //T.2 => T.3
    setearNumintChapasPendientes([]);                   
    setearIdChapaPendiente('');
    setearFilaSeleccionadaPendientes([]);             //T.3
    setearFilaSeleccionadaCortar(null);
    setearIsCheckedTabla3(false);
    getApiPedidosPendientesTabla1();

    
}
const resetearTabla1Y2 = () =>{
    setearMostrarTablaChapasObtener(false);  
    setearFilaSeleccionadaCortar(null);
    setearMostrarTablaChapasObtener(false);
    setearFilaSeleccionadaPendientes([]);  
};
const cortesRealizados = filaSeleccionadaPendientes?.map((cortes) =>{
    const {numintOF,renglonOfap, articulo, medida, cantidadPedida, cantidadAProducir, pedido, cliente} = cortes;
    
    return {numintOF,renglonOfap, articulo, medida, cantidadPedida, cantidadAProducir, pedido, cliente};
});
console.log(cortesRealizados);

    const getApiPedidosPendientesTabla1 = async () => {

        try {
            setearCargarDataOrdenesCumplimiento(true);
          
                setearPedidosPendientesAPI(pedidosTabla1);
                console.log(dataApi);
                console.log(msgResponse);
            
        } catch (error) {
            console.log({error});
        }finally{
            setearCargarDataOrdenesCumplimiento(false);
        }
    }
    const getApiChapasPendientesTabla2 = () => {
       
                setearChapasPendientesAPI(pedidosTabla2);
               
    }
    const postApiCumplimientoOrdenCorte =  () => {
        setIsLoading(true);
        let responseDataOC = {
                cortesRealizados: cortesRealizados,
                corteSeleccionado: opcionElegida
        };

        console.log(responseDataOC);
        setIsLoading(false);         
      
    };
    console.log(msgAPIPost);
    useEffect(() => {
        getApiPedidosPendientesTabla1();
        if (numintPedidosPendientes) {
            getApiChapasPendientesTabla2();
        }
    },[numintPedidosPendientes]);

    const handleChangeSearch = (event) => {
        setearFiltro(event.target.value);
        console.log(event.target.value);
    };
    let resultadosFiltrados = [];
    if(filtrar){
       const palabrasFiltradas = filtrar.toLowerCase().split(' ');
       resultadosFiltrados = pedidosPendientesAPI.filter((dato) => {
           return palabrasFiltradas.every((palabra) =>
               dato.pedido.toLowerCase().includes(palabra) ||
               dato.cliente.toLowerCase().includes(palabra) ||
               dato.modalidadEntrega.toLowerCase().includes(palabra) 
               
       )});

    }else{
       resultadosFiltrados = pedidosPendientesAPI;
    }
    

   console.log(opcionElegida);
    // console.log(filaSeleccionadaCortar);
    // console.log(idChapaPendiente);
    let colorVerde = 'green';
    let colorGris = 'greey';
    return(
        <>
            <p style={{marginLeft: '1.5%', marginTop:'1%',color: 'gray'}}>Cumplimiento de ordenes de fabricación</p>
        <br />
       
        <nav className='nav_filtro_cumplimiento'>
            <section className="filtro_section">
            <FiltroArt titulo={'Filtrar pedido:'} placeholder={'Buscar por: Pedido / Cliente / Modalidad de entrega'} value={filtrar} disabled={!pedidosPendientesAPI} onChange={handleChangeSearch}/>

            </section>
            <section className='section_refresh_container'>
                <button className='btn_refresh' onClick={resetEstados}><BsArrowRepeat className="icono_refresh" /></button>
            </section>

        </nav>
        <br />
        {cargarDataOrdenesCumplimiento ? (
             <section className="section_cargarOrdenes">
             <p className="slideInRight">Cargando...</p>
             <BsTruck className='slideInLeft' />
         </section>
        ): (
            <> 
                <TablaPedidosPendientes 
            dataApi={resultadosFiltrados} 
            filaSeleccionada={filaSeleccionada} 
            checkedReset={checkedResetTabla1}
            setearCheckedReset={setearCheckedResetTabla1}
            setearFilaSeleccionada={setearFilaSeleccionada} 
            mostrarTablaChapasPendientes={mostrarTablaChapasPendientes} 
            setearMostrarTablaChapasPendientes={setearMostrarTablaChapasPendientes} 
            setearNumintPedidosPendientes={setearNumintPedidosPendientes}  
            resetEstados={resetEstados}
        />
             <br />
        {mostrarTablaChapasPendientes &&
        
            <TablaChapasACortar 
                resetearTabla1Y2={resetearTabla1Y2}
                numintTabla1={numintPedidosPendientes} 
                dataApi={chapasPendientesAPI} 
                setearOpcionElegida={setearOpcionElegida}
                filaSeleccionadaCortar={filaSeleccionadaCortar} 
                setearFilaSeleccionadaCortar={setearFilaSeleccionadaCortar} 
                setearNumintTabla3={setearNumintChapasPendientes} 
                setearIdTabla3={setearIdChapaPendiente}
                mostrarTablaChapasObtener={mostrarTablaChapasObtener} 
                setearMostrarTablaChapasObtener={setearMostrarTablaChapasObtener} 

            />
           
        }

        {mostrarTablaChapasObtener &&
        
            <TablaChapasPendientes 
                numint={numintPedidosPendientes}
                filaSeleccionadaPendientes={filaSeleccionadaPendientes}
                isChecked={isCheckedTabla3}
                setearIsChecked={setearIsCheckedTabla3}
                setearFilaSeleccionadaPendientes={setearFilaSeleccionadaPendientes} 
                numintTabla2={numintChapasPendientes}
                idTabla2={idChapaPendiente}
            />
        }
            <br />
            <br />
            <br />
            
            </>
        )
    }
       
       
            <nav className='nav_link__pedidos'>

                <Link className='btn_volver_form_conf' to={'/'}>Volver</Link>
                {isCheckedTabla3  
                ?(<Link  className='btn_verde' onClick={toggleConfirmarCorte}>Cumplir</Link>)
                :(<Link  className='btn_disabled' >Cumplir</Link>)
            }
                
              
                <CustomModal 
                    openModal={confirmarCorteModal} toggleModal={toggleConfirmarCorte}
                    toggleHeader={toggleConfirmarCorte} 
                    titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>}
                    textBody={<p style={{textAlign: "center", fontSize: '1.6rem' }}>¿Desea confirmar el cumplimiento del corte?</p>}
                    onClickCancel={toggleConfirmarCorte} textBtnCancel='CANCELAR'
                    onClickConfirm={() => {
                        setearConfirmarCorteModal(false)
                        postApiCumplimientoOrdenCorte();
                        toggleMsgModal();
                    }}
                        textBtnConfirm={'CONFIRMAR'}
                />
                {isLoading  
                    ?  <CustomModal   openModal={modalMsgResponse} 
                        toggleModal={toggleMsgModal}
                        textBody={<SpinnerIcono color={colorVerde} size={'3.2rem'}/>}
                        textBtnConfirm={<SpinnerIcono color={colorGris} size={'1.2rem'}/>}
                        />
                    :   <CustomModal 
                         openModal={modalMsgResponse} 
                         toggleModal={toggleMsgModal} 
                         titleHeader={errorResponse ? <BsExclamationCircle  className="icono-error-stock"/> : <BsCheckCircle  className="icono-confirmacion animated.flip"/>}
                         textBody={<p style={{textAlign: "center", fontSize: '1.6rem' }}>{errorResponse ? errorMensajeApi : msgAPIPost}</p>} 
                         onClickConfirm={() =>{
                         setearModalMsgResponse(false);
                } } toLink={'/cumplimiento-orden-corte'} textBtnConfirm={'CERRAR'}
                
                />
                }
               
            </nav>
        </>
    );


};

export default CumplimientoOrdenCorte;