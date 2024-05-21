import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/all.css';
import SpinnerIcono from '../components/Common/SpinnerIcono';
import { pedidosModulo1 } from '../Data/Pedidos';

export const TablaPedidosContext = createContext();

export const TablaPedidosProvider = ({ children }) => {
    
    
    const [tokenPlataforma, setearTokenPlataforma] = useState('');
    const [ordenesContext, setearOrdenesContext] = useState(...pedidosModulo1);
    //Para control de errores Modulo 1
    const [cargarDataOrdenes, setearCargarDataOrdenes] = useState(false);
    console.log(tokenPlataforma);
    const [ordenesFiltradasModalidad, setearOrdenesFiltradasModalidad] = useState(null);
    const [modalidadSeleccionada, setearModalidadSeleccionada] = useState('');
    const [selectedRows, setearSelectedRows] = useState([]);
    const [itemsFiltrados, setearItemsFiltrados] = useState([]);
    const [familiaSeleccionada, setearFamiliaSeleccionada] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  const [URL_INPUT, setearURLInput] = useState(''); 

    //MODULO 2
    const [selectedRowsCumplimiento, setearSelectedRowsCumplimiento] = useState([]);



  //MODULO 4

   const [codArticuloFamilia, setearCodArticuloFamilia] = useState([]);
   const [selectedRowsFamilia, setearSelectedRowsFamilia] = useState([]);
   const [cargaDataFamilia, setearCargaDataFamilia] = useState(false);
   const limpiarTablaFamiliaModuloCortes = () => {
        setearCodArticuloFamilia([]);
        setearSelectedRowsFamilia([]);
        setearCargaDataFamilia(false);
};




    const limpiarRows = () => {
        setearOrdenesContext([]);
        setearOrdenesFiltradasModalidad([]);
        setearCargarDataOrdenes(false);
        setearSelectedRows([]);
        setearModalidadSeleccionada('');
        setearItemsFiltrados([]);
        setearFamiliaSeleccionada(null);
        //getApiTablaModulo1();
     };
    const getTablaModulo1 = async () => {
       try {
            setearCargarDataOrdenes(true);
            setearOrdenesContext(pedidosModulo1);
            setIsLoading(false);
             } catch (error) {
   
                 console.log(error);
             } finally {
                setearCargarDataOrdenes(false);
           }
        };
    useEffect(() => {
        getTablaModulo1();
    }, []);
    let color = 'orangered';
    return (
        <TablaPedidosContext.Provider value={{

            //TOKEN PF
            tokenPlataforma, setearTokenPlataforma,
            //FORM CONFIGURACION PARAMS
            URL_INPUT, setearURLInput,
            
            //MODULO 1
            ordenesContext, setearOrdenesContext, 
            cargarDataOrdenes, 
            ordenesFiltradasModalidad, setearOrdenesFiltradasModalidad, 
            modalidadSeleccionada, setearModalidadSeleccionada,
            selectedRows, setearSelectedRows,
            itemsFiltrados, setearItemsFiltrados,
            familiaSeleccionada, setearFamiliaSeleccionada,
            limpiarRows,
            //MODULO 2
            selectedRowsCumplimiento, setearSelectedRowsCumplimiento,
            //MODULO 4
            codArticuloFamilia, setearCodArticuloFamilia,
            cargaDataFamilia, setearCargaDataFamilia,
            selectedRowsFamilia, setearSelectedRowsFamilia, 
            limpiarTablaFamiliaModuloCortes,
            }}>
            {isLoading ? (
               <>
               <section className='loading_app'>
                <h1 className='h1_titulo'>Estamos configurando tu entorno de trabajo</h1> 
                <SpinnerIcono color={color} size={'4rem'}/>

               </section>
               
               </>
                
                
            ) : error ? (
                <p>{error}</p>
            ) : (
                children
            )}
           
        </TablaPedidosContext.Provider>
    );
};

export const useTablaPedidosContext = () => useContext(TablaPedidosContext);



