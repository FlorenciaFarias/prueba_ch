import { Link, Outlet } from 'react-router-dom';
import { BsFillHouseFill, BsQuestionCircleFill, BsFillGearFill, BsArrowRightSquare, BsPersonCircle  } from "react-icons/bs";
import {  Modal, ModalBody,  } from 'reactstrap';
import './Header.css';
import logo from '../../assets/Logo_NIMAT.png'
import Icono from './Icons';
import { useTablaPedidosContext } from '../../Context/TablaPedidosContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {decodeToken, isExpired} from "react-jwt";


const Header = () => {
    const urlParams = new URL(window.location.href);
    console.log(urlParams);
    //const cookieToken = urlParams.searchParams.get("CookieToken");
    const cookieToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJTlRFQyIsIlRpcG9EZVN1amV0byI6IjEiLCJOb21icmVEZUNvbmV4aW9uIjoiQ2hhcGFzIiwiTm9tYnJlU3VqZXRvIjoiSW50ZWMiLCJleHAiOjE3MDU3MDYxNjMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDEvIn0.r-BNG5Qg-3GFTRWvdHjKTuIN-1HEi-BBj6CZipxee9E';
    const [modalActive, setearModalActive] = useState(false);
    const [datosConexion, setearDatosConexion] = useState([]);
    const {limpiarTablaFamiliaModuloCortes, limpiarRows, tokenPlataforma,URL_INPUT,setearTokenPlataforma } = useTablaPedidosContext();
console.log(cookieToken);
    const limpiarApp = () => {
        limpiarTablaFamiliaModuloCortes();
        limpiarRows();
    };

    const toggleModal = () => setearModalActive(!modalActive);
    const getDatosConexion = async () =>{
        let GET_URL_DATOS_CONEXION = `${URL_INPUT}/api/v1/ConexionApi/Conexion/DatosConexion`;
        try {
            const response = await axios.get(GET_URL_DATOS_CONEXION);
            let data = response.data;
            setearDatosConexion(data);
            console.log(response);
        } catch (error) {
            console.log({error});
        }
    };

    const modal= ()=>{
       toggleModal();
    };
    useEffect(()=>{
        if (cookieToken !== '') {
            try {
              const decoded =  decodeToken(cookieToken);
              console.log(decoded);
              setearTokenPlataforma(decoded);
              console.log(tokenPlataforma);
             // const decodedToken = jwt.decodeToken(cookieToken);
              console.log('Información del token decodificado:', decoded);
        
              // if (decoded && decoded.NombreSujeto) {
              //   console.log('NombreSujeto: ' ,decoded.NombreSujeto);
              // }
             
            } catch (error) {
              console.error('Error al decodificar el token:', error.message);
            }
        };
        getDatosConexion();
    },[]);
    return (
        <>
            <header className="header-container">
                <section className="header_section">
                  <Link to={"/"} onClick={limpiarApp}>
                  </Link>  
                </section>
                <nav className='header_nav'>
                     <h4 className='nav_h4'>{<BsPersonCircle className='button_icon' style={{cursor: 'default', marginRight:'2px'}}/>}Bombieri</h4>
                    <Link to="/" onClick={limpiarApp}><Icono icon={<BsFillHouseFill />} /> </Link>
                    <Icono icon={<BsQuestionCircleFill />} modalActive={() =>modal() }/>
                  
                    <Link to="/configuraciones"><Icono icon={<BsFillGearFill />} /></Link>
                    
                </nav>
                <Modal style={{padding:'5px', marginTop:'3.5%',  borderRadius:'9px'}} isOpen={modalActive}  toggle={toggleModal} size='md' fullscreen='sm'>
                <ModalBody>
                    
                    <section className='modal_datosConexion'>
                        <h4 className='h4_modal'>Versión: 1.0.0</h4>
                        <h4 className='h4_modal'>Sujeto: Bombieri</h4>
                        <h4 className='h4_modal'>Conexión: chapas</h4>
                        <h4 className='h4_modal'>Servidor: R1</h4>
                        <h4 className='h4_modal'>Base: db_bombieri</h4>

                    </section>
                </ModalBody>
                </Modal>
            </header>
        </>
    );
}
export default Header;

