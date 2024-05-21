import { Link } from 'react-router-dom';
import './CardCorte.css';
const CardCorte = ({ titulo, onClickCard}) => {
 
  return (
    <>
    <article className="card_corte__contianer"onClick={onClickCard}>
      <p className='p_card_titulo'>{titulo}</p>
    </article>
    
    </>
  );
};

export default CardCorte;
