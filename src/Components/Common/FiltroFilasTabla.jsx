import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import './FiltroFilasTabla.css';
const PusheoFilasTablaDropDown = ({filas, cantidadFilas, filasActuales}) => {

    const [menuPaginacion, setearMenuPaginacion] = useState(false);

    const toggleDrop = () => setearMenuPaginacion(!menuPaginacion);
    
    
    
    return (
        <>
                <Dropdown isOpen={menuPaginacion} toggle={toggleDrop} className="drop_filas__menu" direction="end">
                <DropdownToggle caret className="btn_drop__container"> 
                {filasActuales}
                </DropdownToggle>
                <DropdownMenu className="drop_menu">
                    {filas.map((cantidad, i) => ( 
                        <DropdownItem 
                            key={i} 
                            onClick={() => cantidadFilas(cantidad)}>
                                {cantidad}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

        </>
    );

};

export default PusheoFilasTablaDropDown;

