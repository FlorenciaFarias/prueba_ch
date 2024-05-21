export function RowsTablaCabecera() {
    return(
        <>
        <tr key={orden.numintReserva} className="tr_cabecera">
            <td className='td_row__cabecera'>{orden.notaDePedido}</td>
            <td className='td_row__cabecera'>{orden.fechaEntrega} </td>
            <td className='td_row__cabecera_n'>{orden.articuloCodigo}</td>
            <td className='td_row__cabecera'>{orden.articuloNombre} </td>
            <td className='td_row__cabecera_n'>{orden.medida}</td>
            <td className='td_row__cabecera_n'>{orden.cantidadPedida}</td>
            <td className='td_row__cabecera_n'>{orden.cantidadEnOrdenDeCorte}</td>
            <td className='td_row__cabecera_n'>{orden.cantidadAPreparar} </td>
            <td className='td_row__cabecera_c'>{[
             orden.medidaEspecial1,
             orden.medidaEspecial2,
             orden.medidaEspecial3,
             orden.medidaEspecial4
                ].filter(medida => medida !='').join(', ')} </td> 
        </tr>
        </>
    );
}