
const Icono = ({icon, modalActive = () => {}}) => {
    return (
        <>
            <button onClick={() => modalActive()} className="header_button">
                <i className="button_icon">{icon}</i>
            </button>
        </>
    );

}

export default Icono;