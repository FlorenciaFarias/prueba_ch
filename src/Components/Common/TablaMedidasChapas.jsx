import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import {BsExclamationCircle, BsFillTrashFill, BsFillExclamationTriangleFill, BsPlus} from 'react-icons/bs';
import "./TablaMedidasChapas.css"
import CustomModal from "./CustomModal";

const TablaMedidasChapas = ({
        reiniciarEstados,
        medidasDeCortes,
        setearMedidasDeCortes,
        codFamiliaArticulo,
        largoDeChapa,
        asignarCortesChapasAPedidos,
        filas,
        setearFilas,
        idFilas,
        setearIdFilas,
        setearBtnDisabled,
        stockChapaSeleccionada,
    }) => {
      const [medidaAEliminar, setearMedidaAEliminar] = useState([]);
      const [consumioTodaLaChapa, setearConsumioTodaLaChapa] = useState(true);
      const [medidaInferiorModal, setearMedidaInferiorModal] = useState(false);
      const [stockSuperadoModal, setearStockSuperadoModal] = useState(false);
      const [valorCorteIncorrectoModal, setearvalorCorteIncorrectoModal] = useState(false);
      const [stockDisponible, setearStockDisponible] = useState(stockChapaSeleccionada);
      const [sumatoriaDeMedidas, setearSumatoriaDeMedidas] = useState([]);
      const [blurCantidadChapas, setearBlurCantidadChapas] = useState(Array(filas?.length).fill(false));
      const [errorFila, setearErrorFila] = useState(false);
      const [errorStockDeMas, setearErrorStockDeMas] = useState(false);
      const [largoExcedidaModal, setearLargoExcedidoModal] = useState(false);
      const copiaFilas = [...filas];
      const copiaMedidas = [...medidasDeCortes];
      
      const stockTablaCorte = stockChapaSeleccionada;
      
      const toggleLargoExcedido = () => setearLargoExcedidoModal(!largoExcedidaModal);
      const toggleMedidaInferior = () => setearMedidaInferiorModal(!medidaInferiorModal);
      const toggleStockSuperado = () => setearStockSuperadoModal(!stockSuperadoModal);
      console.log(filas);
     
      const togglevalorCorteIncorrecto = () => setearvalorCorteIncorrectoModal(!valorCorteIncorrectoModal);
    
      useEffect(() => {
        if (sumatoriaDeMedidas && (sumatoriaDeMedidas > largoDeChapa)) {
          toggleLargoExcedido();
          setearErrorFila(true);
          }else{
          setearErrorFila(false);
          };
        }, [ sumatoriaDeMedidas ]);

      const eliminarFila = (posicionAEliminar) => {
        // console.log(posicionAEliminar);
        // console.log(medidaAEliminar);
         const nuevasFilas = filas?.filter((fila) => fila.Id !== posicionAEliminar);
         const nuevasMedidas = medidaAEliminar?.filter((fila) => fila.fila !== posicionAEliminar);
        //  console.log(medidaAEliminar);
        //  console.log(nuevasFilas);
        //  console.log(nuevasMedidas);
         setearFilas(nuevasFilas);
         setearMedidasDeCortes(nuevasMedidas);
         setearMedidaAEliminar(nuevasMedidas);
         setearBlurCantidadChapas(false);
        //  console.log(nuevasMedidas);
        //  console.log(filas);
        //  console.log(medidasDeCortes);
         let restanteStock = nuevasFilas.reduce((dec, cantidadChapas) => dec + cantidadChapas.CantidadChapas,0);
         console.log(restanteStock);
        // let resultado = stockTablaCorte - restanteStock;  
         setearStockDisponible(stockTablaCorte - restanteStock);
         console.log(errorFila);
         if (errorFila) {
         console.log(errorFila);
           setearErrorFila(false);
          };
      };
  


    
    const agregarFila = () => {
      const nuevaFila = {
          Id : idFilas + 1,
          CantidadChapas: filas.CantidadChapas,
          SumaCortes: 0,
          MedidaCorte: Array(15).fill(0),
      };
      setearFilas([...filas, nuevaFila]);
      setearIdFilas(nuevaFila.Id);
      setearConsumioTodaLaChapa(true);

    };

    const handleCantidad = (e, index) => {
      const value = e.target.value;
      // let parseValor = parseFloat(value);
      // let valor = isNaN(parseValor) ? 0 : parseValor;  
      let nuevaCantidadDeChapas = 0;
      nuevaCantidadDeChapas = isNaN(parseInt(value)) ? 0 : parseInt(value) ;
    //IDENTIFICA Y ACTUALIZA LOS VALORES Y CAMBIOS DE CANTIDAD CHAPAS POR INDICE DE FILA
      console.log(copiaMedidas);
        if (copiaMedidas[index] != undefined) {
          setearErrorStockDeMas(false);
          console.log(errorStockDeMas);
          console.log(copiaMedidas[index].Cortes);
          copiaMedidas[index].Cortes = copiaMedidas[index].Cortes.map(corte => {
            return {...corte, CantidadChapas: nuevaCantidadDeChapas ? nuevaCantidadDeChapas : 0}
          });
        };
      console.log(copiaMedidas);
      console.log(copiaFilas[index]);
          copiaFilas[index].CantidadChapas = nuevaCantidadDeChapas;
          // const restanteStock = copiaFilas.reduce((dec, fila) => dec + fila.CantidadChapas, 0);
          const restanteStock = copiaFilas.reduce((dec, fila) => {
            if (typeof fila.CantidadChapas === 'number') {
              return dec + fila.CantidadChapas;
            } else {
              return dec;
            }
          }, 0);
          if (stockTablaCorte >= restanteStock) { 
            let resultado = stockTablaCorte - restanteStock; 
            setearErrorStockDeMas(false); 
            setearStockDisponible(resultado); 
           console.log(errorStockDeMas);
  
          }else{
          
          console.log(errorStockDeMas);
          setearErrorStockDeMas(true); 
  
          toggleStockSuperado(); 
          console.log(errorStockDeMas);
            
          };
          console.log(copiaFilas);
          console.log(filas);
         setearFilas(copiaFilas);
         setearMedidasDeCortes(copiaMedidas);
         console.log(medidasDeCortes);
    };
    // const validarStock = () => {
    //   console.log(stockDisponible);
    //   if (stockDisponible <= 0) { 
    //     console.log(stockDisponible <= 0);
    //     //  let resultado = stockTablaCorte - restanteStock; 
    //     setearErrorStockDeMas(true); 
    //     console.log(errorStockDeMas);
    //     toggleStockSuperado(); 
        
    //   }
    //   else{
    //     console.log(errorStockDeMas);
    //     setearErrorStockDeMas(false); 

    //     console.log(errorStockDeMas);
          
    //     };
    // };
    const handleInputChange = (e, numero, index) => {
      const { name, value } = e.target;
    //  const copiaMedidas = [...medidasDeCortes];
      let parseValor = parseFloat(value);
      let valor = isNaN(parseValor) ? 0 : parseValor;  
    
      
      const existingItem = copiaMedidas.find((item) => item.ArticuloCodigo === codFamiliaArticulo && item.fila === index);
    
      //Caso Fila 1  
     
       //SINO EXISTE NINGUNA FILA SOLO ENTRA A  ESTE IF
        if(!existingItem){
          // console.log(idFilas);
          // console.log(index);
          //SI ES MEDIDA DE CORTE SOLO CREA HASTA EL CORTE 1 (EN EL ELSE CREA A PARTIR DEL CORTE 2)
          if(name == 'medidaCorte'){
            console.log(filas);
            const nuevoItem = {
              fila: index,
              ArticuloCodigo: codFamiliaArticulo,
              Cortes: [
                {
                  ArticuloACortar: codFamiliaArticulo,
                  LargoChapa: parseFloat(largoDeChapa),
                  CantidadChapas: filas[index].CantidadChapas,
                  MedidaCorte: parseFloat(valor),
                  AltasChapas: 0
                },
              ], 
            };
            copiaFilas[index].SumaCortes = parseFloat(valor);
            console.log(copiaFilas[index].SumaCortes);

            copiaFilas[index].MedidaCorte[numero] = parseFloat(valor);
            console.log(copiaFilas[index].MedidaCorte[numero]);
            copiaMedidas.push(nuevoItem);
          };
        }else{
          //CASO COLUMNA CORTE EXISTENTE -- actualizacion
          console.log(medidasDeCortes);
         
          let defaultSuma = 0.0;
          if(name == 'medidaCorte'){

            if (existingItem && existingItem.Cortes.length >= numero +1) {
              existingItem.Cortes[numero].MedidaCorte = valor;  
              copiaFilas[index].MedidaCorte[numero] = parseFloat(valor);  
                                        
              let editExistingSuma = copiaFilas[index].MedidaCorte.reduce((acc, corte) => acc + parseFloat(corte), 0);
              console.log(copiaFilas[index].SumaCortes);
                                                            
             copiaFilas[index].SumaCortes = parseFloat(editExistingSuma);
              console.log(copiaFilas[index].SumaCortes);
              setearSumatoriaDeMedidas(editExistingSuma);  
              
              setearFilas(copiaFilas);
            } else {
              //CORTE NUEVO
              const corteNuevo = {
                ArticuloACortar: codFamiliaArticulo,
                LargoChapa: parseFloat(largoDeChapa),
                CantidadChapas: filas[index].CantidadChapas,
                MedidaCorte: parseFloat(valor),
                AltasChapas: 0
              };
              // //console.log(valor);
              let nuevaSuma = copiaFilas[index].MedidaCorte.reduce((acc, corte) => acc + parseFloat(corte), defaultSuma);
              let sumaMasMedida = nuevaSuma + valor
              copiaFilas[index].SumaCortes = sumaMasMedida;
            console.log(copiaFilas[index].MedidaCorte[numero]);

              copiaFilas[index].MedidaCorte[numero] = parseFloat(valor);   
            console.log(copiaFilas[index].MedidaCorte[numero]);
              console.log(sumatoriaDeMedidas);
              console.log(nuevaSuma);
              existingItem.Cortes.push(corteNuevo);
              // //console.log(valor);
              setearFilas(copiaFilas);
               console.log(filas);
            };
          }
        };
        console.log(sumatoriaDeMedidas);
        console.log(filas);
        setearSumatoriaDeMedidas(copiaFilas[index].SumaCortes);  
        setearMedidasDeCortes(copiaMedidas);
        setearMedidaAEliminar(copiaMedidas);
        console.log(medidasDeCortes);
        if (copiaFilas[index].SumaCortes < largoDeChapa) {
         
          setearConsumioTodaLaChapa(true);
        }else{
          console.log(consumioTodaLaChapa);
          console.log(copiaFilas[index].SumaCortes);

          setearConsumioTodaLaChapa(false);
        }
    };
    const handleOnBlur = (e) =>{
      const { name, value } = e.target;
      let parseValor = parseFloat(value);
      let valor = isNaN(parseValor) ? 0 : parseValor;  
 
      if (name == 'medidaCorte' && valor > 0 && valor < 3){
        toggleMedidaInferior();
       
      };
      if (name == 'medidaCorte' && valor % 0.5 > 0){
        togglevalorCorteIncorrecto();
       
      };
 
};

    let rowClassName = errorFila ?  'invalid' : 'td_row__tablaMedidasChapas';
    return(
        <>
          <section className="encabezado_tabla">

            <h5 className="h5_titulo__tabla h5_tablaMedida"> Indicar medidas de cortes:</h5>
            <p className="p_stock">Stock disponible: <span className="span_stock">{stockDisponible}</span></p>
          </section>
            <section className="section_tablaMedidasChapas__container">
              <div className="medidas_chapas_container">
                <Table  bordered hover responsive size="sm" striped className='tabla_medidasChapas'>
                <thead>
                    <tr>
                        <th className="th_colum__tablaMedidasChapas">Cantidad chapas</th>
                        <th className="th_colum__tablaMedidasChapas">Suma de cortes</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 1</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 2</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 3</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 4</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 5</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 6</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 7</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 8</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 9</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 10</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 11</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 12</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 13</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 14</th>
                        <th className="th_colum__tablaMedidasChapas">Corte 15</th>
                        <th className="th_colum__tablaMedidasChapas"></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    filas.map((fila, index) =>((
                      <tr key={fila.Id}>
                        
                        <td className='td_row__tablaMedidasChapas'><input autoFocus name="cantidadChapas" onChange={ (e) => handleCantidad(e, index)
                         
                        } type="number"  className="input_tablaMedidasChapas__td"/></td>
                        <td className={rowClassName}><input name="suma" value={fila.SumaCortes ? fila.SumaCortes : 0} onChange={(e) => handleInputChange(e,index)} type="number" className="input_tablaMedidasChapas__td" readOnly={true} /></td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,0, index)}  onChange={(e) => handleInputChange(e,0, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,1, index)}  onChange={(e) => handleInputChange(e,1, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,2, index)}  onChange={(e) => handleInputChange(e,2, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,3, index)}  onChange={(e) => handleInputChange(e,3, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,4, index)}  onChange={(e) => handleInputChange(e,4, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,5, index)}  onChange={(e) => handleInputChange(e,5, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,6, index)}  onChange={(e) => handleInputChange(e,6, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,7, index)}  onChange={(e) => handleInputChange(e,7, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,8, index)}  onChange={(e) => handleInputChange(e,8, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,9, index)}  onChange={(e) => handleInputChange(e,9, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,10, index)}   onChange={(e) => handleInputChange(e,10, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,11, index)}   onChange={(e) => handleInputChange(e,11, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,12, index)}   onChange={(e) => handleInputChange(e,12, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,13, index)}   onChange={(e) => handleInputChange(e,13, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,14, index)}   onChange={(e) => handleInputChange(e,14, index)} className="input_tablaMedidasChapas__td"/> </td>
                        <td><button className="btn_eliminarFila" onClick={() => eliminarFila(fila.Id)}>  <BsFillTrashFill /></button></td></tr>
                      )
                    ))
                  }
                </tbody>
                  <CustomModal 
                    openModal={medidaInferiorModal} 
                    toggleModal={toggleMedidaInferior}
                    toggleHeader={toggleMedidaInferior} 
                    titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia"/>} 
                    textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>La medida ingresada es menor a 3 mts.</p>}
                    textBtnConfirm={'CONTINUAR'}
                    onClickConfirm={ toggleMedidaInferior}
                  />
                
                  <CustomModal 
                    openModal={stockSuperadoModal} 
                    toggleModal={toggleStockSuperado}
                    toggleHeader={toggleStockSuperado} 
                    titleHeader={<BsFillExclamationTriangleFill className="icono-error-stock"/>} 
                    textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>Verifique su stock disponible y vuelva a intentarlo.</p>}
                    textBtnConfirm={'ACEPTAR'}
                    onClickConfirm={(e) => {
                      toggleStockSuperado();
                    }}
                  /> 

                  <CustomModal 
                    openModal={largoExcedidaModal} 
                    toggleModal={toggleLargoExcedido}
                    toggleHeader={toggleLargoExcedido} 
                    titleHeader={<BsExclamationCircle  className="icono-error-stock"/>} 
                    textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>¡La sumatoria de cortes es mayor al largo de la chapa seleccionada!</p>}
                    textBtnConfirm={'ACEPTAR'}
                    onClickConfirm={ toggleLargoExcedido}
                  />
                  <CustomModal
                    openModal={valorCorteIncorrectoModal}
                    toggleModal={togglevalorCorteIncorrecto}
                    toggleHeader={togglevalorCorteIncorrecto}
                    titleHeader={<BsExclamationCircle  className="icono-adverentencia"/>}
                    textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>La medida ingresada no corresponde a un corte de chapa valido.</p>}
                    textBtnConfirm={'ACEPTAR'}
                    onClickConfirm={ togglevalorCorteIncorrecto}
                  />
                </Table>
                {
                  (errorFila == false) 
                  && (consumioTodaLaChapa == false)
                  && (errorStockDeMas === false)
                  && (stockDisponible)
                  && (copiaFilas.filter(e=> e.cantidadChapas === 0) == 0)
                  &&  
                    <section className="btns_operaciones_container">
                      
                      <button className="btn_agregarFila" onClick={agregarFila}>
                        <BsPlus />
                      </button>
                      <button className="btn_tablaMedidasChapas" onClick={() => {
                        reiniciarEstados();
                        asignarCortesChapasAPedidos();
                        setearBtnDisabled(true);
                      }}>Confirmar</button>
                    </section>
                }
              </div>
            </section>
        </>
    );
}
export default TablaMedidasChapas;

// import { useEffect, useState } from "react";
// import { Table } from "reactstrap";
// import {BsExclamationCircle, BsFillTrashFill, BsFillExclamationTriangleFill, BsPlus} from 'react-icons/bs';
// import "./TablaMedidasChapas.css"
// import CustomModal from "./CustomModal";

// const TablaMedidasChapas = ({
//         reiniciarEstados,
//         medidasDeCortes,
//         setearMedidasDeCortes,
//         codFamiliaArticulo,
//         largoDeChapa,
//         asignarCortesChapasAPedidos,
//         filas,
//         setearFilas,
//         idFilas,
//         setearIdFilas,
//         setearBtnDisabled,
//         stockChapaSeleccionada,
//     }) => {
//       const [medidaAEliminar, setearMedidaAEliminar] = useState([]);
//       const [consumioTodaLaChapa, setearConsumioTodaLaChapa] = useState(true);
//       const [medidaInferiorModal, setearMedidaInferiorModal] = useState(false);
//       const [stockSuperadoModal, setearStockSuperadoModal] = useState(false);
//       const [valorCorteIncorrectoModal, setearvalorCorteIncorrectoModal] = useState(false);
//       const [stockDisponible, setearStockDisponible] = useState(stockChapaSeleccionada);
//       const [sumatoriaDeMedidas, setearSumatoriaDeMedidas] = useState([]);
//       const [blurCantidadChapas, setearBlurCantidadChapas] = useState(Array(filas?.length).fill(false));
//       const [errorFila, setearErrorFila] = useState(false);
//       const [errorStockDeMas, setearErrorStockDeMas] = useState(false);
//       const [largoExcedidaModal, setearLargoExcedidoModal] = useState(false);
//       const copiaFilas = [...filas];
//       const copiaMedidas = [...medidasDeCortes];
      
//       const stockTablaCorte = stockChapaSeleccionada;
      
//       const toggleLargoExcedido = () => setearLargoExcedidoModal(!largoExcedidaModal);
//       const toggleMedidaInferior = () => setearMedidaInferiorModal(!medidaInferiorModal);
//       const toggleStockSuperado = () => setearStockSuperadoModal(!stockSuperadoModal);
//       console.log(filas);
     
//       const togglevalorCorteIncorrecto = () => setearvalorCorteIncorrectoModal(!valorCorteIncorrectoModal);
    
//       const eliminarFila = (posicionAEliminar) => {
//         console.log(posicionAEliminar);
//         console.log(medidaAEliminar);
//          const nuevasFilas = filas?.filter((fila) => fila.Id !== posicionAEliminar);
//          const nuevasMedidas = medidaAEliminar?.filter((fila) => fila.fila !== posicionAEliminar);
        
//          console.log(medidaAEliminar);

//          console.log(nuevasFilas);

//          console.log(nuevasMedidas);

//          setearFilas(nuevasFilas);
//          setearMedidasDeCortes(nuevasMedidas);
//          setearMedidaAEliminar(nuevasMedidas);
//          setearBlurCantidadChapas(false);
         
//          console.log(nuevasMedidas);
         
//          console.log(filas);
         
//          console.log(medidasDeCortes);
//          let restanteStock = nuevasFilas.reduce((dec, cantidadChapas) => dec + cantidadChapas.CantidadChapas,0);
//          let resultado = stockTablaCorte - restanteStock;  
//          setearStockDisponible(resultado);
//          console.log(errorFila);
//          if (errorFila) {
//          console.log(errorFila);

//            setearErrorFila(false);
//           };
          
        
//       };
  
// useEffect(() => {
// if (sumatoriaDeMedidas && (sumatoriaDeMedidas > largoDeChapa)) {
//   toggleLargoExcedido();
//   setearErrorFila(true);
//   }else{
//   setearErrorFila(false);
//   };
// }, [ sumatoriaDeMedidas ]);

    
//       const agregarFila = () => {
//         const nuevaFila = {
//             Id : idFilas + 1,
//             CantidadChapas: filas.CantidadChapas,
//             SumaCortes: 0,
//             MedidaCorte: Array(15).fill(0),
//         };
//         setearFilas([...filas, nuevaFila]);
//         setearIdFilas(nuevaFila.Id);
//         setearConsumioTodaLaChapa(true);

//       };

//     const handleCantidad = (e, index) => {
//       const value = e.target.value;
//       let parseValor = parseFloat(value);
//       let valor = isNaN(parseValor) ? 0 : parseValor;  
//       let nuevaCantidadDeChapas = 0;
//       nuevaCantidadDeChapas = parseInt(valor);
//     //IDENTIFICA Y ACTUALIZA LOS VALORES Y CAMBIOS DE CANTIDAD CHAPAS POR INDICE DE FILA
//       console.log(copiaMedidas);
//       if (copiaMedidas[index] != undefined) {
//         setearErrorStockDeMas(false);
//         console.log(errorStockDeMas);
//         console.log(copiaMedidas[index].Cortes);
//         copiaMedidas[index].Cortes = copiaMedidas[index].Cortes.map(corte => {
//           return {...corte, CantidadChapas: nuevaCantidadDeChapas ? nuevaCantidadDeChapas : 0}
//         });
//       };
//       console.log(copiaMedidas);
//       console.log(copiaFilas[index]);
//           copiaFilas[index].CantidadChapas = nuevaCantidadDeChapas;
//           let restanteStock = copiaFilas.reduce((dec, cantidadChapas) => dec + cantidadChapas.CantidadChapas, 0);
// console.log(restanteStock);
//           if (stockTablaCorte >= restanteStock) { 
//           let resultado = stockTablaCorte - restanteStock; 
//           setearErrorStockDeMas(false); 
//           setearStockDisponible(resultado); 
//         console.log(errorStockDeMas);

//         }
//         else{
//         console.log(errorStockDeMas);
//         setearErrorStockDeMas(true); 

//         toggleStockSuperado(); 
//         console.log(errorStockDeMas);
          
//         };
        
//       console.log(copiaFilas);
//         console.log(filas);
//          setearFilas(copiaFilas);
//          setearMedidasDeCortes(copiaMedidas);
//          console.log(medidasDeCortes);
//     };

//     const handleInputChange = (e, numero, index) => {
//       const { name, value } = e.target;
//     //  const copiaMedidas = [...medidasDeCortes];
//       let parseValor = parseFloat(value);
//       let valor = isNaN(parseValor) ? 0 : parseValor;  
    
      
//       const existingItem = copiaMedidas.find((item) => item.ArticuloCodigo === codFamiliaArticulo && item.fila === index);
    
//       //Caso Fila 1  
     
//        //SINO EXISTE NINGUNA FILA SOLO ENTRA A  ESTE IF
//         if(!existingItem){
//           // console.log(idFilas);
//           // console.log(index);
//           //SI ES MEDIDA DE CORTE SOLO CREA HASTA EL CORTE 1 (EN EL ELSE CREA A PARTIR DEL CORTE 2)
//           if(name == 'medidaCorte'){
//             console.log(filas);
//             const nuevoItem = {
//               fila: index,
//               ArticuloCodigo: codFamiliaArticulo,
//               Cortes: [
//                 {
//                   ArticuloACortar: codFamiliaArticulo,
//                   LargoChapa: parseFloat(largoDeChapa),
//                   CantidadChapas: filas[index].CantidadChapas,
//                   MedidaCorte: parseFloat(valor),
//                   AltasChapas: 0
//                 },
//               ], 
//             };
//             copiaFilas[index].SumaCortes = parseFloat(valor);
//             console.log(copiaFilas[index].SumaCortes);

//             copiaFilas[index].MedidaCorte[numero] = parseFloat(valor);
//             console.log(copiaFilas[index].MedidaCorte[numero]);
//             copiaMedidas.push(nuevoItem);
//           };
//         }else{
//           //CASO COLUMNA CORTE EXISTENTE -- actualizacion
//           console.log(medidasDeCortes);
         
//           let defaultSuma = 0.0;
//           if(name == 'medidaCorte'){

//             if (existingItem && existingItem.Cortes.length >= numero +1) {
//               existingItem.Cortes[numero].MedidaCorte = valor;  
//               copiaFilas[index].MedidaCorte[numero] = parseFloat(valor);  
                                        
//               let editExistingSuma = copiaFilas[index].MedidaCorte.reduce((acc, corte) => acc + parseFloat(corte), 0);
//               console.log(copiaFilas[index].SumaCortes);
                                                            
//              copiaFilas[index].SumaCortes = parseFloat(editExistingSuma);
//               console.log(copiaFilas[index].SumaCortes);
//               setearSumatoriaDeMedidas(editExistingSuma);  
              
//               setearFilas(copiaFilas);
//             } else {
//               //CORTE NUEVO
//               const corteNuevo = {
//                 ArticuloACortar: codFamiliaArticulo,
//                 LargoChapa: parseFloat(largoDeChapa),
//                 CantidadChapas: filas[index].CantidadChapas,
//                 MedidaCorte: parseFloat(valor),
//                 AltasChapas: 0
//               };
//               // //console.log(valor);
//               let nuevaSuma = copiaFilas[index].MedidaCorte.reduce((acc, corte) => acc + parseFloat(corte), defaultSuma);
//               let sumaMasMedida = nuevaSuma + valor
//               copiaFilas[index].SumaCortes = sumaMasMedida;
//             console.log(copiaFilas[index].MedidaCorte[numero]);

//               copiaFilas[index].MedidaCorte[numero] = parseFloat(valor);   
//             console.log(copiaFilas[index].MedidaCorte[numero]);
//               console.log(sumatoriaDeMedidas);
//               console.log(nuevaSuma);
//               existingItem.Cortes.push(corteNuevo);
//               // //console.log(valor);
//               setearFilas(copiaFilas);
//                console.log(filas);
//             };
//           }
//         };
//         console.log(sumatoriaDeMedidas);
//         console.log(filas);
//         setearSumatoriaDeMedidas(copiaFilas[index].SumaCortes);  
//         setearMedidasDeCortes(copiaMedidas);
//         setearMedidaAEliminar(copiaMedidas);
//         console.log(medidasDeCortes);
//         if (copiaFilas[index].SumaCortes < largoDeChapa) {
         
//           setearConsumioTodaLaChapa(true);
//         }else{
//           console.log(consumioTodaLaChapa);
//           console.log(copiaFilas[index].SumaCortes);

//           setearConsumioTodaLaChapa(false);
//         }
//     };
//     const handleOnBlur = (e) =>{
//       const { name, value } = e.target;
//       let parseValor = parseFloat(value);
//       let valor = isNaN(parseValor) ? 0 : parseValor;  
 
//       if (name == 'medidaCorte' && valor > 0 && valor < 3){
//         toggleMedidaInferior();
       
//       };
//       if (name == 'medidaCorte' && valor % 0.5 > 0){
//         togglevalorCorteIncorrecto();
       
//       };
 
// };

//     let rowClassName = errorFila ?  'invalid' : 'td_row__tablaMedidasChapas';
//     return(
//         <>
//           <section className="encabezado_tabla">

//             <h5 className="h5_titulo__tabla h5_tablaMedida"> Indicar medidas de cortes:</h5>
//             <p className="p_stock">Stock disponible: <span className="span_stock">{stockDisponible}</span></p>
//           </section>
//             <section className="section_tablaMedidasChapas__container">
//               <div className="medidas_chapas_container">
//                 <Table  bordered hover responsive size="sm" striped className='tabla_medidasChapas'>
//                 <thead>
//                     <tr>
//                         <th className="th_colum__tablaMedidasChapas">Cantidad chapas</th>
//                         <th className="th_colum__tablaMedidasChapas">Suma de cortes</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 1</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 2</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 3</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 4</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 5</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 6</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 7</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 8</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 9</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 10</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 11</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 12</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 13</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 14</th>
//                         <th className="th_colum__tablaMedidasChapas">Corte 15</th>
//                         <th className="th_colum__tablaMedidasChapas"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     filas.map((fila, index) =>((
//                       <tr key={fila.Id}>
                        
//                         <td className='td_row__tablaMedidasChapas'><input autoFocus name="cantidadChapas" onChange={ (e) => handleCantidad(e, index)} type="number"  className="input_tablaMedidasChapas__td"/></td>
//                         <td className={rowClassName}><input name="suma" value={fila.SumaCortes ? fila.SumaCortes : 0} onChange={(e) => handleInputChange(e,index)} type="number" className="input_tablaMedidasChapas__td" readOnly={true} /></td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,0, index)}  onChange={(e) => handleInputChange(e,0, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,1, index)}  onChange={(e) => handleInputChange(e,1, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,2, index)}  onChange={(e) => handleInputChange(e,2, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,3, index)}  onChange={(e) => handleInputChange(e,3, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,4, index)}  onChange={(e) => handleInputChange(e,4, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,5, index)}  onChange={(e) => handleInputChange(e,5, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,6, index)}  onChange={(e) => handleInputChange(e,6, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,7, index)}  onChange={(e) => handleInputChange(e,7, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,8, index)}  onChange={(e) => handleInputChange(e,8, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,9, index)}  onChange={(e) => handleInputChange(e,9, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,10, index)}   onChange={(e) => handleInputChange(e,10, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,11, index)}   onChange={(e) => handleInputChange(e,11, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,12, index)}   onChange={(e) => handleInputChange(e,12, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,13, index)}   onChange={(e) => handleInputChange(e,13, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td className={rowClassName}><input name="medidaCorte" type="number" onBlur={(e) => handleOnBlur(e,14, index)}   onChange={(e) => handleInputChange(e,14, index)} className="input_tablaMedidasChapas__td"/> </td>
//                         <td><button className="btn_eliminarFila" onClick={() => eliminarFila(fila.Id)}>  <BsFillTrashFill /></button></td></tr>
//                       )
//                     ))
//                   }
//                 </tbody>
//                   <CustomModal 
//                     openModal={medidaInferiorModal} 
//                     toggleModal={toggleMedidaInferior}
//                     toggleHeader={toggleMedidaInferior} 
//                     titleHeader={<BsFillExclamationTriangleFill className="icono-adverentencia"/>} 
//                     textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>La medida ingresada es menor a 3 mts.</p>}
//                     textBtnConfirm={'CONTINUAR'}
//                     onClickConfirm={ toggleMedidaInferior}
//                   />
                
//                   {/* <CustomModal 
//                     openModal={stockSuperadoModal} 
//                     toggleModal={toggleStockSuperado}
//                     toggleHeader={toggleStockSuperado} 
//                     titleHeader={<BsFillExclamationTriangleFill className="icono-error-stock"/>} 
//                     textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>Verifique su stock disponible y vuelva a intentarlo.</p>}
//                     textBtnConfirm={'ACEPTAR'}
//                     onClickConfirm={(e) => {
//                       toggleStockSuperado();
//                     } }
//                   /> */}

//                   <CustomModal 
//                     openModal={largoExcedidaModal} 
//                     toggleModal={toggleLargoExcedido}
//                     toggleHeader={toggleLargoExcedido} 
//                     titleHeader={<BsExclamationCircle  className="icono-error-stock"/>} 
//                     textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>¡La sumatoria de cortes es mayor al largo de la chapa seleccionada!</p>}
//                     textBtnConfirm={'ACEPTAR'}
//                     onClickConfirm={ toggleLargoExcedido}
//                   />
//                   <CustomModal
//                     openModal={valorCorteIncorrectoModal}
//                     toggleModal={togglevalorCorteIncorrecto}
//                     toggleHeader={togglevalorCorteIncorrecto}
//                     titleHeader={<BsExclamationCircle  className="icono-adverentencia"/>}
//                     textBody={<p style={{textAlign: 'center', fontSize: '1.5rem'}}>La medida ingresada no corresponde a un corte de chapa valido.</p>}
//                     textBtnConfirm={'ACEPTAR'}
//                     onClickConfirm={ togglevalorCorteIncorrecto}
//                   />
//                 </Table>
//                 {
//                   (errorFila == false) 
//                   && (consumioTodaLaChapa == false)
//                   && (errorStockDeMas === false)
//                   && (stockDisponible > 0)
//                   && (copiaFilas.filter(e=> e.cantidadChapas === 0) == 0)
//                   &&  
//                     <section className="btns_operaciones_container">
                      
//                       <button className="btn_agregarFila" onClick={agregarFila}>
//                         <BsPlus />
//                       </button>
//                       <button className="btn_tablaMedidasChapas" onClick={() => {
//                         reiniciarEstados();
//                         asignarCortesChapasAPedidos();
//                         setearBtnDisabled(true);
//                       }}>Confirmar</button>
//                     </section>
//                 }
//               </div>
//             </section>
//         </>
//     );
// }
// export default TablaMedidasChapas;

