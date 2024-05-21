import { useState } from "react";

const FiltroArt = ({disabled, value, onChange, titulo, placeholder}) => {

    return (
        <>
            <label className="titulo_label_filtroArt" htmlFor="filter">{titulo}</label>
            <input className='search_input' type="text" disabled={disabled} value={value} onChange={onChange} name="filter" placeholder={placeholder}/>
        </>
    );
}

export default FiltroArt;