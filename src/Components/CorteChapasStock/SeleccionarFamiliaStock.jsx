import axios from 'axios';
import { Link } from 'react-router-dom';
import FiltroArt from "../Common/FiltroArt";
import { useEffect, useState } from 'react';
import './SeleccionarFamiliaStock.css'
import CardCorte from './CardCorte';
import {BsChevronRight} from 'react-icons/bs'
import {useTablaPedidosContext} from '../../Context/Index'
import { cardsFamilia, pedidosFamilia } from '../../Data/Pedidos';

const SeleccionarFamiliaStock = () => {

    const [ordenesCard, setearOrdenesCard] = useState(cardsFamilia);
    const {codArticuloFamilia, setearCodArticuloFamilia,} = useTablaPedidosContext();
    const [filtrarCard, setearFiltroCard] = useState('');
    const [cardSeleccionada, setearCardSeleccionada] = useState(false);

    const getApiCard =  () => {
        setearOrdenesCard(cardsFamilia);
    
    };

   
const onClickCard = (artFamiliaParam, artNombre) => {
        //console.log(artFamiliaParam);
        // //console.log(codArticuloFamilia);
    if (artFamiliaParam) {
        setearCardSeleccionada(true);
        console.log(artFamiliaParam);
        getApiArticuloFamilia(artFamiliaParam);
    }

};

 const getApiArticuloFamilia =  (artFamiliaParam) => {
    setearCodArticuloFamilia(pedidosFamilia);
 
   
};
    const handleChangeSearchCard = (event) => {
        setearFiltroCard(event.target.value.toLowerCase());
    }
  
    let resultadosCard = []; 
    
    if(filtrarCard){
        resultadosCard = ordenesCard.filter((dato) => {
        return filtrarCard.split(' ').every(palabra =>
            dato.articuloCodigoFamilia.toString().toLowerCase().includes(palabra) ||
            dato.articuloNombre.toLowerCase().includes(palabra)
            );
         }
        );
    } else {
        resultadosCard = ordenesCard;
    };
    useEffect(() =>{ 
     getApiCard();
    }, []);
    return (
        <>
         <main className='main_pedidos__container'>
         <p style={{marginLeft: '1%', marginTop:'1%',color: 'gray'}}>Seleccionar tipo familia stock<i>{<BsChevronRight />} </i></p>

            <section className="search_corte__section" style={{marginLeft:'2%'}}>
                    <FiltroArt value={filtrarCard} onChange={handleChangeSearchCard} titulo={'Filtrar por familia:'} placeholder={'Buscar familia'}/>
            </section>
            <section className='card_section__container'>
                <h3 className='h3_card__section'>Seleccionar familia:</h3>
                {resultadosCard.map((card, i) => (
                    <Link key={i} to={'/pedidos-familia'}>
                    <CardCorte  titulo={card.articuloNombre} onClickCard={ ()=>{ onClickCard(card.articuloCodigoFamilia, card.articuloNombre)
                     }} 
                  
                    />
                    </Link>
                ))}
            </section>
            <nav className='nav_link__pedidos'>
                    <Link className='btn_volver_form_conf' to={'/'}>Volver</Link>
                    <Link className={cardSeleccionada ? 'btn_verde' : 'btn_disabled'} to={'/pedidos-familia'} >Siguiente</Link>
                </nav>

         </main>    
        </>
    );
}
export default SeleccionarFamiliaStock;