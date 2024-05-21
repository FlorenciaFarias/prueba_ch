import { Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import FormConfig from './components/Parametros/FormConfig';
import PedidosChapa from './components/PedidosChapas/Pedidos';
import GeneracionOrdenCorte from './components/PedidosChapas/GeneracionOrdenCorte';
import PedidosPicking from './components/PedidosChapasPicking/Picking';
import { useEffect } from 'react';
import {  TablaPedidosProvider} from './Context/Index';
import { GeneracionCorteFamilia, PedidosFamilia, SeleccionarFamiliaStock} from './components/CorteChapasStock/Index';
import AllCards from './components/CardHome/All_Cards';
import CumplimientoOrdenCorte from './components/CumplimientoOrdenCorte/CumplimientoOrdenCorte';
import { useTablaPedidosContext } from './Context/TablaPedidosContext';


function App() {
  //Local Storage & Token
  
  return (
    <>
        <TablaPedidosProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllCards />} />
          <Route path="configuraciones" element={<FormConfig />} />
          //Proveeo de contexto local para sección de Componente Padre - hijo - 'nieto'

          //MODULO 1
          <Route path='pedidos-chapas' element={<PedidosChapa />} /> 
          <Route path='generacion-corte' element={<GeneracionOrdenCorte />} /> 
          //MODULO 2
          <Route path='cumplimiento-orden-corte' element={<CumplimientoOrdenCorte />} /> 



          //MODULO 3
          <Route path='pedidos-chapas-picking' element={<PedidosPicking />} />
          //MODULO 4
          <Route path='seleccionar-familia-stock' element={<SeleccionarFamiliaStock />}/>
          <Route path='pedidos-familia' element={<PedidosFamilia />} />
          <Route path='generacion-corte-familia' element={<GeneracionCorteFamilia />} />
        </Route>
      </Routes>
        </TablaPedidosProvider>
    </>
  );
};

export default App;
