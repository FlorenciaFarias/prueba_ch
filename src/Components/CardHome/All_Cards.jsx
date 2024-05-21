import { Link, Outlet} from 'react-router-dom';
import Card from "./Card";
import { BsRulers, BsCartFill, BsScissors, BsCardChecklist } from "react-icons/bs";

const AllCards = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <section className="card_section">
        <Link to="/pedidos-chapas" className='card_a'><Card titulo={"1) Gestión de pedidos de chapas"} icono={<BsRulers />} /> </Link>
        <Link to="cumplimiento-orden-corte"  className='card_a'><Card titulo={'2) Cumplimiento de órdenes de fabricación'} icono={<BsCardChecklist />} /></Link>
        <Link to="/pedidos-chapas-picking" className='card_a'><Card titulo={"3) Gestión de pedidos de chapas con picking"} icono={<BsCartFill />} /></Link>
        <Link to="/seleccionar-familia-stock" className='card_a'><Card titulo={"4) Cortes para stock"} icono={<BsScissors />} /></Link>

      </section>
    </>
  );
}

export default AllCards;
