import {BsTruck, BsChevronRight} from "react-icons/bs";
import TablaFamilia from './TablaFamilia';
import { Link } from 'react-router-dom';
import { useTablaPedidosContext } from '../../Context/TablaPedidosContext';
const PedidosFamilia = () => {
   const {limpiarTablaFamiliaModuloCortes, cargaDataFamilia, numArticulo} = useTablaPedidosContext(); 

    return (
        <>
        
             <main className='main_pedidos__container'>
         <p style={{marginLeft: '1%', marginTop:'1%', color: 'gray', marginBottom:'2%'}}>Seleccionar tipo familia stock<i>{<BsChevronRight />} Selección de familias</i>{<BsChevronRight />}</p>
          <h4 style={{marginLeft: '2.5%'}}>Familia: <span style={{fontWeight: 'bold'}}>{numArticulo}</span></h4> 
          <br />
            {cargaDataFamilia ?
            (
                <section className="section_cargarOrdenes">
                 <p className="slideInRight">Cargando...</p>
                <BsTruck className='slideInLeft' />
            </section>
            )
            :    (<TablaFamilia />)
            
            }
            <nav className='nav_link__pedidos'>
                    <Link className='btn_volver_form_conf' to={'/seleccionar-familia-stock'} onClick={limpiarTablaFamiliaModuloCortes}>Volver</Link>
                    <Link className='btn_verde' to={'/generacion-corte-familia'} >Siguiente</Link>
                   
                </nav>
             
         </main>
        </>

    );
};

export default PedidosFamilia;