import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {BsArrowRepeat, BsTruck, BsFillExclamationTriangleFill, BsCheckCircle, BsExclamationCircle} from "react-icons/bs";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../PedidosChapas/Pedidos.css'
import {CustomModal, FiltroArt, SpinnerIcono} from '../Common/Index';
import {useTablaPedidosContext} from '../../Context/TablaPedidosContext'
import TablaPicking from './TablaPicking';


const PedidosPicking = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cargaDataPicking, setearCargaDataPicking] = useState(false);
    let nombreYCodigoModalidadOP = ['Retira cliente (00)','Entrega programada local (03)', 'Entrega programada larga distancia (04)'];
    const [ordenesOP, setearOrdenesOP] = useState([]);
    const {URL_INPUT} = useTablaPedidosContext();
    const [ordenesFiltradasModalidadOP, setearordenesFiltradasModalidadOP] = useState([]);
    const [resultadosFiltradosOP, setearResultadosFiltradosOP] = useState([]);
    const [desplegarDropModalidadPicking, setearDropPicking] = useState(false);
    const [modalidadSeleccionadaOP, setearModalidadSeleccionadaOP] = useState('');
    const [filtrarOP, setearFiltroOP] = useState('');
    const [filasSeleccionadas, setearFilasSeleccionadas] = useState([]);
    const [pagina, setearPagina] = useState(1);
    const [modalCumplirOP, setearModalCumplirOP] = useState(false);
    const [modalMsgResponse, setearModalMsgResponse] = useState(false);
    const [msgApi, setearMsgApi] = useState('');
    const [errorResponse, setearErrorResponse] = useState(false);
    const [errorMensajeApi, setearErrorApi] = useState('');

    const toggleDropOP = () => setearDropPicking(!desplegarDropModalidadPicking);
    const toggleModalOP = () => setearModalCumplirOP(!modalCumplirOP);
    const toggleMsgModalOPK = () => setearModalMsgResponse(!modalMsgResponse);
    const handleItemClickDropOP = (modalidad) => {
         if (ordenesOP) {
            setearModalidadSeleccionadaOP(modalidad);
            let valorSeleccionado;

            if(nombreYCodigoModalidadOP[0] === modalidad){
                valorSeleccionado = ordenesOP.filter((dato) => dato.modalidadEntrega === '00')
             }
             else if(nombreYCodigoModalidadOP[1] === modalidad){
                valorSeleccionado = ordenesOP.filter((dato) => dato.modalidadEntrega === '03')
            }else if(nombreYCodigoModalidadOP[2] === modalidad){
                valorSeleccionado = ordenesOP.filter((dato) => dato.modalidadEntrega === '04' )
             }
             setearordenesFiltradasModalidadOP(valorSeleccionado);
            
         }
    }
    const handleChangeSearchOP = (event) => {
        setearFiltroOP(event.target.value);
        //console.log(event.target.value);
        setearPagina(1);
    }

   

useEffect(() => {
    if(ordenesFiltradasModalidadOP == null) return;
    if(filtrarOP == '') return setearResultadosFiltradosOP(ordenesFiltradasModalidadOP); 

    const palabrasFiltradas = filtrarOP.toLowerCase().split(' ');
    setearResultadosFiltradosOP(ordenesFiltradasModalidadOP.filter((dato) => {
        return palabrasFiltradas.every((palabra) => 
            dato.cliente.toLowerCase().includes(palabra) ||
            dato.articuloCodigo.toLowerCase().includes(palabra) ||
            dato.articuloNombre.toLowerCase().includes(palabra) ||
            dato.notaDePedido.toLowerCase().includes(palabra) ||
            dato.fechaSalida.toLowerCase().includes(palabra)
    )})); 
}, [filtrarOP, ordenesFiltradasModalidadOP]);


    const mapearNumint = filasSeleccionadas.map(orden =>{ 
       const {numintReserva, numintOrdenPreparacion, renglonOrdenPreparacion } = orden
       return {numintReserva, numintOrdenPreparacion, renglonOrdenPreparacion } 
    });
        
        
    //console.log(mapearNumint);
    const getApiTablaOP = async () => {
         let URL_GET_API_TABLA_OPK = `${URL_INPUT}/api/v1/GestionDePedidosPickingQuery/Pedidos/Pendientes/Picking`;
         try {
            setearCargaDataPicking(true);
             const response = await axios.get(URL_GET_API_TABLA_OPK);
             let dataTablaOP = response.data;
             setearOrdenesOP(dataTablaOP);
             
         }catch(error) {
             console.error(error + 'TABLa')
             
         }finally{
            setearCargaDataPicking(false);
         };
     }; 
//console.log({
//     pedidosACumplir:mapearNumint
// });
    const  postApiCumplirOPK = async() => {
        setIsLoading(true);

        let URL_POST_API_TABLA_OPK = `${URL_INPUT}/api/v1/CumplimientoApi/Cumplimiento/Picking`;
        try {
            let responseOPK = await axios.post(URL_POST_API_TABLA_OPK, {
                pedidosACumplir:mapearNumint
            });
            if (responseOPK.status === 200) {
                let msg = responseOPK.data.mensaje;
                setIsLoading(false);
                if (!msg?.includes('Error')) {
                    setearMsgApi(msg);
                    errorResponse(false);
                }else{
                    setearErrorApi(msg);
                    setearErrorResponse(true);
                }
            }
        } catch (error) {
            setearErrorApi(msg);
            setearErrorResponse(true);
        }finally{
            setIsLoading(false);

        }
    };

    let colorVerde = 'green';
    let colorGris = 'greey';

     useEffect(() =>{
         getApiTablaOP();
     }, []);
     //console.log(msgApi);
     const refrescarVista= () =>{
        setearOrdenesOP([]);
        setearFiltroOP('');
        setearModalidadSeleccionadaOP('');
        setearCargaDataPicking(false);
        setearordenesFiltradasModalidadOP(null);
        setearFilasSeleccionadas([]);
        getApiTablaOP();
     };
    
    return (
        <>
            <main className='main_pedidos__container'>   
            
            <p style={{marginLeft: '1%', marginBottom:'1%', marginTop:'1%',color: 'gray'}}>Cumplimiento de chapas con picking</p>
            <nav className='nav_drop_filtro__gChapas'> 
                    <section className='drop_filtro__section'>
                    <h3 className='h3_drop_menu'>Seleccionar modalidad de entrega:</h3>
                        <Dropdown isOpen={desplegarDropModalidadPicking} toggle={toggleDropOP} className='drop_modalidad__pedidos' disabled={cargaDataPicking ? true : false} >
                        <DropdownToggle caret className='btn_modalidad__menu'> {!modalidadSeleccionadaOP ? 'Modalidad de entrega' : modalidadSeleccionadaOP} </DropdownToggle>
                        <DropdownMenu className='menu_item__modalidad'>
                            <DropdownItem  onClick={() => handleItemClickDropOP(nombreYCodigoModalidadOP[0])}>Retira cliente (00)</DropdownItem>
                            <DropdownItem  onClick={() => handleItemClickDropOP(nombreYCodigoModalidadOP[1])}>Entrega programada local (03)</DropdownItem>
                            <DropdownItem  onClick={() => handleItemClickDropOP(nombreYCodigoModalidadOP[2])}>Entrega programada larga distancia (04)</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </section>

                    <section className='btn_refres_container'>
                        <button className='btn_refresh_btn' onClick={refrescarVista}><i>{<BsArrowRepeat className="icono"/>} </i></button>

                    </section>
                    <section className="search_filtro__section">
                    <FiltroArt disabled={!modalidadSeleccionadaOP} value={filtrarOP} onChange={handleChangeSearchOP} titulo={'Filtrar por:'} placeholder={"Buscar artículos por artículo / cliente / nota pedido / fecha de salida"} setearPagina={setearPagina}/>
                    </section>
                </nav>

                {cargaDataPicking ? 
                    (
                        <section className="section_cargarOrdenes">
                        <p className="slideInRight">Cargando...</p>
                        <BsTruck className='slideInLeft' />
                        </section>
                    ) : modalidadSeleccionadaOP ?
                        (
                            <TablaPicking data={resultadosFiltradosOP} filasSeleccionadas={filasSeleccionadas} setearFilasSeleccionadas={setearFilasSeleccionadas} pagina={pagina} setearPagina={setearPagina}/> 
                        ) : (
                            <section className='section_container__tabla'><h4 className='h4_sin_modalidad__tabla'>¡Seleccione una "Modalidad de Entrega" del menú! </h4>{<BsTruck className='i_tabla' />}</section>
                        )
                }
               
                <nav className='nav_link__pedidos'>
                    <Link className='btn_volver_form_conf' to={'/'}>Volver</Link>

                    {filasSeleccionadas.length > 0?
                    
                    <Link className='btn_verde'onClick={toggleModalOP} >Cumplir</Link>
                    : <Link className='btn_disabled' >Cumplir</Link>
                    }
                    {filasSeleccionadas 
                    &&
                    <CustomModal  
                        openModal={modalCumplirOP} 
                        toggleModal={toggleModalOP}
                        toggleHeader={toggleModalOP} 
                        titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>}
                        textBody={
                            <p style={{textAlign: "center", fontSize: '1.6rem' }}>¿Desea cumplir la orden de picking?</p>
                            }
                        onClickCancel={toggleModalOP} 
                        textBtnCancel='Cancelar' 
                        onClickConfirm={()=> {
                            
                            setearModalCumplirOP(false);
                            postApiCumplirOPK();
                            toggleMsgModalOPK();
                            }
                        }
                        textBtnConfirm={'CUMPLIR'}
                    />
                  
                }
                { isLoading  
                         ?  <CustomModal   
                                openModal={modalMsgResponse} 
                                toggleModal={toggleMsgModalOPK}
                                textBody={<SpinnerIcono color={colorVerde} size={'3rem'}/>}
                                textBtnConfirm={<SpinnerIcono color={colorGris} size={'1rem'}/>}
                             />
                         :  <CustomModal  
                                openModal={modalMsgResponse} 
                                toggleModal={toggleMsgModalOPK} 
                                titleHeader={errorResponse ? <BsExclamationCircle  className="icono-error-stock"/> : <BsCheckCircle  className="icono-confirmacion animated.flip"/>}
                                textBody={
                                    <p style={{textAlign: "center", fontSize: '1.6rem' }}>{errorResponse ? errorMensajeApi: msgApi}</p>
                                    } 
                                onClickConfirm={() =>{
                                setearModalMsgResponse(false);
                                refrescarVista();

                                }} 
                            toLink={'/pedidos-chapas-picking'} 
                            textBtnConfirm={'CERRAR'}/>
                }
                
             </nav>
            </main>
        </>

    );

}

export default PedidosPicking;