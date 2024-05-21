import './Card.css';

const Card = ({titulo, icono}) => {
    return (
        <>
            
                <article className="card_section__art">
                    <h2 className='section_art__h2'>{titulo}</h2>
                    <i className="section_art__icono">{icono}</i>
                </article>
            
        </>
    );

}

export default Card;