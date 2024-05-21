import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {BsChevronRight, BsArrowRepeat, BsTruck, BsFillExclamationTriangleFill, BsCheckCircle , BsExclamationCircle} from "react-icons/bs";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { useTablaPedidosContext } from '../../Context/TablaPedidosContext';
import { FiltroArt, Tabla, CustomModal, TablaMedidasEspeciales} from '../Common/Index';
import '../Common/Navbar.css'
import './Pedidos.css'
import './LoadAnimacion.css';
import axios from "axios";


const PedidosChapa = () => {
    
    //Consumo contexto
    const { 
        ordenesContext, 
        cargarDataOrdenes, 
        selectedRows, 
        ordenesFiltradasModalidad, 
        setearOrdenesFiltradasModalidad, 
        modalidadSeleccionada, 
        setearModalidadSeleccionada,
        limpiarRows,
        URL_INPUT
    } = useTablaPedidosContext();
    const [modalStock, setearModalStock] = useState(false);
    //Notificación de confirmación de cumplimiento
    const [messageStock, setearMessageStock] = useState('');
    const [messagePedidos, setearMessagePedido] = useState('')
    const [errorResponse, setearErrorResponse] = useState(false);
    const [errorMensajeApi, setearErrorApi] = useState('');
    const [errorPedidosApi, setearErrorPedidosApi] = useState('');

    const [modalUpdateStock, setearModalUpdateStock] = useState(false);
    const [modalMedidasEspeciales, setearModalMedidasEspeciales] = useState(false);
    //FiltroArt
    const [pagina, setearPagina] = useState(1);
    const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
    const [filtrar, setearFiltro] = useState('');
    let nombreYCodigoModalidad = ['Retira cliente (00)','Entrega programada local (03)', 'Entrega programada larga distancia (04)'];

    const [desplegarDrop, setearDrop] = useState(false);
    //const [isLoading, setIsLoading] = useState(false);
    
    const toggleDrop = () => setearDrop(!desplegarDrop);
    const toggleUpdateConfirmacion = () => setearModalUpdateStock(!modalUpdateStock);
    const toggleMedidasEspeciales = () => setearModalMedidasEspeciales(!modalMedidasEspeciales);
   // const resetAnimacion = () => setIsLoading(!isLoading);
    const refrescarVista = () => {
        limpiarRows();
        setearFiltro('');
       
        
    };
    const handleItemModalidadSeleccionada = (modalidad) => {
        if (ordenesContext) { 
            setearModalidadSeleccionada(modalidad);
            let valorSeleccionado;
    
            if (nombreYCodigoModalidad[0] === modalidad) {
                valorSeleccionado = ordenesContext.filter((dato) => dato.modalidadEntrega === '00');
            }else if (nombreYCodigoModalidad[1] === modalidad) {
                valorSeleccionado = ordenesContext.filter((dato) => dato.modalidadEntrega === '03');
            }else if (nombreYCodigoModalidad[2] === modalidad) {
                valorSeleccionado = ordenesContext.filter((dato) => dato.modalidadEntrega === '04');
            }
            setearOrdenesFiltradasModalidad((prevFiltradas) => valorSeleccionado);
            setearPagina(1);
        }
    };
   
    const toggleModalStock = () => setearModalStock(!modalStock);
    const mapearNumint = selectedRows.map(pedido =>{
        const {numintReserva, numintOrdenPreparacion, renglonOrdenPreparacion} = pedido 
        
        return {numintReserva, numintOrdenPreparacion, renglonOrdenPreparacion}
        
    });
    const mapearMedidasEspeciales = selectedRows?.filter(pedido => 
        pedido.medidaEspecial1 !== '' || 
        pedido.medidaEspecial2 !== '' || 
        pedido.medidaEspecial3 !== '' || 
        pedido.medidaEspecial4 !== '' ).map(pedido => {  
            const {notaDePedido, numintReserva} = pedido;
            return {notaDePedido, numintReserva};
    });
    console.log(mapearMedidasEspeciales);

    //console.log(mapearNumint);

    const updateApiCumplientoStock = async() =>{
        try {
            const responseStock = {pedidosACumplir: mapearNumint};
                //console.log(responseStock);
           
        } catch (error) {
            //console.log(`${error}`);
            setearErrorApi(msg);
            setearErrorPedidosApi(msgPedido);
            setearErrorResponse(true);
        }
    }
    const handleChangeSearch = (event) => {
        setearFiltro(event.target.value);
        setearPagina(1);
        //console.log(event.target.value);
    };

    useEffect(() => {
        if(ordenesFiltradasModalidad == null) return;
        if(filtrar == '') return setResultadosFiltrados(ordenesFiltradasModalidad); 

        const palabrasFiltradas = filtrar.toLowerCase().split(' ');
        setResultadosFiltrados(ordenesFiltradasModalidad.filter((dato) => {
            return palabrasFiltradas.every((palabra) => 
                dato.cliente.toLowerCase().includes(palabra) ||
                dato.articuloCodigo.toLowerCase().includes(palabra) ||
                dato.articuloNombre.toLowerCase().includes(palabra) ||
                dato.notaDePedido.toLowerCase().includes(palabra) ||
                dato.fechaEntrega.toLowerCase().includes(palabra) ||
                dato.fechaSalida.toLowerCase().includes(palabra)
        )})); 
    }, [filtrar, ordenesFiltradasModalidad]);

    return (
        <>
        <main className='main_pedidos__container'>    
        <p style={{marginLeft: '1%', marginTop:'1%', color: 'gray'}}>Selección de pedidos <i>{<BsChevronRight />}</i></p>
           
            <nav className='nav_drop_filtro__gChapas'> 
            <section className='drop_filtro__section'>
                         <h3 className='h3_drop_menu'>Seleccionar modalidad de entrega:</h3>
                         <Dropdown isOpen={desplegarDrop} toggle={toggleDrop} className='drop_modalidad__pedidos'  disabled={cargarDataOrdenes ? true : false}>
                         <DropdownToggle caret className='btn_modalidad__menu'> {!modalidadSeleccionada ? 'Modalidad de entrega' : modalidadSeleccionada} </DropdownToggle>
                         <DropdownMenu className='menu_item__modalidad'>
                             <DropdownItem  onClick={() => handleItemModalidadSeleccionada(nombreYCodigoModalidad[0])}>Retira cliente (00)</DropdownItem>
                             <DropdownItem  onClick={() => handleItemModalidadSeleccionada(nombreYCodigoModalidad[1])}>Entrega programada local (03)</DropdownItem>
                             <DropdownItem  onClick={() => handleItemModalidadSeleccionada(nombreYCodigoModalidad[2])}>Entrega programada larga distancia (04)</DropdownItem>
                         </DropdownMenu>
                         </Dropdown>
                     </section>
                     <section className='btn_refres_container'>
                        <button className='btn_refresh_btn' onClick={refrescarVista}><BsArrowRepeat className="icono" />
                            {/* {isLoading ? 
                                <BsHourglassSplit  /> :(<i>{<BsArrowRepeat />} </i>)} */}
                            </button>
                    </section>
                <section className="search_filtro__section">
                <FiltroArt disabled={!modalidadSeleccionada} value={filtrar} onChange={handleChangeSearch} titulo={'Filtrar por:'} placeholder={"Buscar por Artículo / Cliente / Nota pedido / Fecha salida"} />
                </section>
            </nav>
            {cargarDataOrdenes ?
                (
                    <section className="section_cargarOrdenes">
                        <p className="slideInRight">Cargando...</p>
                        <BsTruck className='slideInLeft' />
                    </section>
                ) : (modalidadSeleccionada) || (selectedRows.length > 0) 
                    ? (
                    <Tabla data={resultadosFiltrados} pagina={pagina} setearPagina={setearPagina}/> 
                )   : (
                    <section className='section_container__tabla'>
                        <h4 className='h4_sin_modalidad__tabla'>¡Seleccione una "Modalidad de Entrega" del menú! </h4>
                        {<BsTruck className='i_tabla' />}
                    </section> 
                )
           
            }
               
            <nav className='nav_link__pedidos'>
                <Link className='btn_volver_form_conf' to={'/'} onClick={limpiarRows}>Volver</Link>
                {selectedRows.length > 0
                    ? <Link className='btn_verde' to={'/generacion-corte'} >Siguiente</Link>
                    : <Link className='btn_disabled'>Siguiente</Link>
                }
            
                <CustomModal 
                    openModal={modalMedidasEspeciales}
                    titleHeader= {<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>}
                    textBody={<TablaMedidasEspeciales notasDePedido={mapearMedidasEspeciales}/>}
                    onClickCancel={toggleMedidasEspeciales}
                    textBtnCancel="CANCELAR"
                    onClickConfirm={toggleModalStock}
                    textBtnConfirm="CONTINUAR"
                />

                <CustomModal 
                    openModal={modalStock}
                    toggleModal={toggleModalStock}
                    toggleHeader={toggleModalStock}
                    titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia zoomInDown"/>}
                    textBody={<p style={{textAlign: "center", fontSize: '1.6rem' }}>¿Desea cumplir los items seleccionados sin generar la orden de corte?</p>}
                    onClickCancel={toggleModalStock} 
                    textBtnCancel="CANCELAR"
                    onClickConfirm={() => {
                        updateApiCumplientoStock();
                      //  setearAlertModalSotck('success');
                        setearModalStock(false);
                        toggleUpdateConfirmacion();
                       
                    }}
                    textBtnConfirm="CUMPLIR"

                    
                />
                <CustomModal 
                    openModal={modalUpdateStock}
                    toggleModal={toggleUpdateConfirmacion}
                    toggleHeader={toggleUpdateConfirmacion}
                    titleHeader={errorResponse ? <BsExclamationCircle  className="icono-error-stock"/> : <BsCheckCircle  className="icono-confirmacion animated.flip"/>}
                    textBody={
                    <>
                        <h4 style={{textAlign: "center", color:'#000'}}>{errorResponse ?errorMensajeApi : messageStock}</h4>
                        {errorResponse  &&
                            <p style={{textAlign: "center", fontWeight: 'bold', color:'red' }}>{errorResponse ? errorPedidosApi : messagePedidos}</p>
                        }
                    </>
                    }
            
                    onClickConfirm={() => {
                        setearModalUpdateStock(false);
                        setTimeout(() => 1000);
                        limpiarRows();
                       
                    }}
                    textBtnConfirm="CERRAR"
                    toLink={'/pedidos-chapas'}
                    
                />
            </nav>
            <br />
        </main>
        </>
    );
}
export default PedidosChapa;

