import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {Form, Row, Col, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './FormConfig.css'
import	{BsCheckCircle  } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import {useTablaPedidosContext} from '../../Context/TablaPedidosContext';
import CustomModal from '../Common/CustomModal';
const FormConfig = () => {

  const { register, handleSubmit, control, formState: {errors}} = useForm({});
  const {URL_INPUT, setearURLInput} = useTablaPedidosContext();
  const [cargarView, setearCargaView] = useState(false);

  const [parametrosApi, setTipoParametrosApi] = useState({});
  const [modalCredenciales, setModalCredenciales] = useState(false);
  const [modalApiResponse, setearModalApiResponse] = useState(false);
  const [mensajeApi, setearMensajeApi] = useState('');
  const [errorMensajeApi, setearErrorMensajeApi] = useState('');
  const [errorResponse, setearErrorResponse] = useState(false);
  
      
  const toggleModalCredenciales = () => setModalCredenciales(!modalCredenciales);
  const toggleResponseApi = () => setearModalApiResponse(!modalApiResponse);
  const getData = async() =>{
    const URL_GET_PARAMS =  `${URL_INPUT}/api/v1/ParametrosQuery/Parametros`;
    try {
      setearCargaView(true);
      const response = await axios.get(URL_GET_PARAMS);
      //console.log(response);
      if (response.status === 200) {
        let data = response.data[0];
        setTipoParametrosApi(data);
        
      }
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
      
    }finally{
      setearCargaView(false);
    }
   
  };

  const updateData = async (credenciales) =>{ 
    let API_UPDATE = `${URL_INPUT}/api/v1/ParametrosApi/Update`;
    let jsonParametros = JSON.stringify(parametrosApi)
    let jsonCredenciales = JSON.stringify(credenciales);
    const model = { ...JSON.parse(jsonParametros), ...JSON.parse(jsonCredenciales) };

   try {
    //console.log(model);
    const dataPut = await axios.put(
        API_UPDATE, 
        model, {
        headers: {'Content-Type': 'application/json'}
      });
   
    if(dataPut.status === 200){
      let dataResponse = dataPut.data;
      //console.log(dataResponse);
      if (!dataResponse?.includes('Error')) {
        //console.log(dataResponse);
        setearMensajeApi(dataResponse);
        setearErrorResponse(false);
        setModalCredenciales(false);
        toggleResponseApi();
        
      }else{
        //console.log(dataResponse);

        setearErrorMensajeApi(dataResponse);
        setearErrorResponse(true);
      };
    };
   } catch (error) {
    //console.log({error});

  
  };
};

  useEffect(() => {
   getData();
  }, []);

   const onSubmit = (data) => {
     setModalCredenciales(true);
     //console.log('soy onsubmit');
    };
//  const changeInputCredencial = (e) => {
//   const { name, value } = e.target;
//  };

  let styleInputModal = errors ? 'inputInvalid' : 'inputValid';
  return (
    <>
    {
      cargarView ?
      (<p> Cargando datos...</p>)
      : (
        <>
        
        <Form style={{ margin:'auto' }} className="media"  fluid="md" onSubmit={handleSubmit(onSubmit)}>
    
    <h4 className='titulo_params'>Parámetros del sistema</h4>
    <Row md={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='urlApi'>URL conexiones</Label>
            <Input className='input_URL' bsSize="sm" readOnly={true} defaultValue={URL_INPUT} onChange={(e) => setearURLInput(e.target.value)} name='urlApi' type='text' placeholder='http://10.1.1.88:7766...' /> 
          </FormGroup>
    </Col>
    </Row>
    <h6 className='subtitulo_form_config'>Tipos de comprobantes</h6>
      <Row xs={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='tipoPreparacionConsiderar'>Tipo de órdenes de preparación a considerar</Label>
            <Input className='input_form' bsSize="sm" name='tipoPreparacionConsiderar' type='text' {...register('tipoPreparacionConsiderar')} defaultValue={parametrosApi.tipoPreparacionConsiderar} onChange={e => setTipoParametrosApi({...parametrosApi, tipoPreparacionConsiderar: e.target.value})} /> 
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='tipoPickingConsiderar'>Tipo de órdenes picking a considerar</Label>
            <Input className='input_form' bsSize="sm" name='tipoPickingConsiderar' type='text' {...register('tipoPickingConsiderar')} defaultValue={parametrosApi.tipoPickingConsiderar} onChange={ e => setTipoParametrosApi({ ...parametrosApi, tipoPickingConsiderar: e.target.value})} />
          </FormGroup>
        </Col>
         <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='grupoDeposito'>Grupo de depósito</Label>
            <Input className='input_form' bsSize="sm" name='grupoDeposito' type='number' {...register('grupoDeposito')} defaultValue={parametrosApi.grupoDeposito} onChange={e => setTipoParametrosApi({ ...setTipoParametrosApi
            , grupoDeposito: e.target.value})} />

          </FormGroup>
        </Col>
         <Col>
          <FormGroup>
          <Label className='col-form-label-md' for='articuloScrap'>Artículo scrap</Label>
          <Input className='input_form' bsSize="sm" name='articuloScrap' type='text' {...register('articuloScrap')} defaultValue={parametrosApi.articuloScrap} onChange={ e => setTipoParametrosApi({ ...parametrosApi, articuloScrap: e.target.value})} />
          </FormGroup>
        </Col>
      </Row>
      <h6 className='subtitulo_form_config'>Orden de fabricación</h6>
      <Row md={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='divisionOF'>División</Label>
              <Input className='input_form' bsSize="sm" name='divisionOF' type='number' {...register('divisionOF')} defaultValue={parametrosApi.divisionOF} onChange={ e => setTipoParametrosApi({ ...parametrosApi, divisionOF: e.target.value})} />
            
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='sucursalOF'>Sucursal</Label>
              <Input className='input_form' bsSize="sm" name='sucursalOF' type='number' {...register('sucursalOF')} defaultValue={parametrosApi.sucursalOF} onChange={ e => setTipoParametrosApi({ ...parametrosApi, sucursalOF: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='tipoOF'>Tipo de orden de fabricación</Label>
              <Input className='input_form' bsSize="sm" name='tipoOF' type='text' {...register('tipoOF')} defaultValue={parametrosApi.tipoOF} onChange={ e => setTipoParametrosApi({ ...parametrosApi, tipoOF: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='componenteGenerico'>Componente genérico</Label>
              <Input className='input_form' bsSize="sm" name='componenteGenerico' type='number' {...register('componenteGenerico')} defaultValue={parametrosApi.componenteGenerico} onChange={ e => setTipoParametrosApi({ ...parametrosApi, componenteGenerico: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='depositoArtAFabricar'>Depósito artículos a fabricar</Label>
              <Input className='input_form' bsSize="sm" name='depositoArtAFabricar' type='number' {...register('depositoArtAFabricar')} defaultValue={parametrosApi.depositoArtAFabricar} onChange={ e=> setTipoParametrosApi({...parametrosApi, depositoArtAFabricar: e.target.value})} />
           
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='depositoComponentes'>Depósito de componentes</Label>
              <Input className='input_form' bsSize="sm" name='depositoComponentes' type='number' {...register('depositoComponentes')} defaultValue={parametrosApi.depositoComponentes} onChange={e => setTipoParametrosApi({...parametrosApi, depositoComponentes: e.target.value})} />
           
          </FormGroup>
        </Col>
      </Row>
      <h6 className='subtitulo_form_config'>Remito de producción realizada</h6>
      <Row md={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='divisionRem'>División</Label>
              <Input className='input_form' bsSize="sm" name='divisionRem' type='number' {...register('divisionRem')} defaultValue={parametrosApi.divisionRem} onChange={e => setTipoParametrosApi({...parametrosApi, divisionRem: e.target.value})} />
            
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='sucursalRem'>Sucursal</Label>
              <Input className='input_form' bsSize="sm" name='sucursalRem' type='number' {...register('sucursalRem')} defaultValue={parametrosApi.sucursalRem} onChange={e => setTipoParametrosApi({...parametrosApi, sucursalRem: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='tipoRem'>Tipo de orden de fabricación</Label>
              <Input className='input_form' bsSize="sm" name='tipoRem' type='text' {...register('tipoRem')} defaultValue={parametrosApi.tipoRem} onChange={e => setTipoParametrosApi({...parametrosApi, tipoRem: e.target.value})} />
          </FormGroup>
        </Col>
      </Row>
      <h6 className='subtitulo_form_config'>Consumo automático</h6>
      <Row md={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='divisionCA'>División</Label>
              <Input className='input_form' bsSize="sm" name='divisionCA' type='number' {...register('divisionCA')} defaultValue={parametrosApi.divisionCA} onChange={e => setTipoParametrosApi({...parametrosApi, divisionCA: e.target.value})} />
            
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='sucursalCA'>Sucursal</Label>
              <Input className='input_form' bsSize="sm" name='sucursalCA' type='number' {...register('sucursalCA')} defaultValue={parametrosApi.sucursalCA} onChange={e => setTipoParametrosApi({...parametrosApi, sucursalCA: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='tipoCA'>Tipo de transferencia</Label>
              <Input className='input_form' bsSize="sm" name='tipoCA' type='text' {...register('tipoCA')} defaultValue={parametrosApi.tipoCA} onChange={e => setTipoParametrosApi({...parametrosApi, tipoCA: e.target.value})} />
          </FormGroup>
        </Col>
      </Row>
      <h6 className='subtitulo_form_config'>Transefencia de stock de salida</h6>
      <Row md={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='divisionTS'>División</Label>
              <Input className='input_form' bsSize="sm" name='divisionTS' type='number' {...register('divisionTS')} defaultValue={parametrosApi.divisionTS} onChange={e => setTipoParametrosApi({...parametrosApi, divisionTS: e.target.value})} />
            
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='sucursalTS'>Sucursal</Label>
              <Input className='input_form' bsSize="sm" name='sucursalTS' type='number' {...register('sucursalTS')} defaultValue={parametrosApi.sucursalTS} onChange={e => setTipoParametrosApi({...parametrosApi, sucursalTS: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='tipoTS'>Tipo de transferencia</Label>
              <Input className='input_form' bsSize="sm" name='tipoTS' type='text' {...register('tipoTS')} defaultValue={parametrosApi.tipoTS} onChange={e => setTipoParametrosApi({...parametrosApi, tipoTS: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='depositoTS'>Depósito</Label>
              <Input className='input_form' bsSize="sm" name='depositoTS' type='number' {...register('depositoTS')} defaultValue={parametrosApi.depositoTS} onChange={e => setTipoParametrosApi({...parametrosApi, depositoTS: e.target.value})} />
          </FormGroup>
        </Col>
      </Row>
      <h6 className='subtitulo_form_config'>Transefencia de stock de entrada</h6>
      <Row md={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='divisionTE'>División</Label>
              <Input className='input_form' bsSize="sm" name='divisionTE' type='number' {...register('divisionTE')} defaultValue={parametrosApi.divisionTE} onChange={e => setTipoParametrosApi({...parametrosApi, divisionTE: e.target.value})} />
            
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='sucursalCA'>Sucursal</Label>
              <Input className='input_form' bsSize="sm" name='sucursalTE' type='number' {...register('sucursalTE')} defaultValue={parametrosApi.sucursalTE} onChange={e => setTipoParametrosApi({...parametrosApi, sucursalTE: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='tipoCA'>Tipo de transferencia</Label>
              <Input className='input_form' bsSize="sm" name='tipoTE' type='text' {...register('tipoTE')} defaultValue={parametrosApi.tipoTE} onChange={e => setTipoParametrosApi({...parametrosApi, tipoTE: e.target.value})} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='depositoTS'>Depósito</Label>
              <Input className='input_form' bsSize="sm" name='depositoTE' type='number' {...register('depositoTE')}  defaultValue={parametrosApi.depositoTE} onChange={e => setTipoParametrosApi({...parametrosApi, depositoTE: e.target.value})}/>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='depositoTS'>Depósito reserva inicial</Label>
              <Input className='input_form' bsSize="sm" name='depositoReservaInicial' type='number' {...register('depositoReservaInicial')}  defaultValue={parametrosApi.depositoReservaInicial} onChange={e => setTipoParametrosApi({...parametrosApi, depositoReservaInicial: e.target.value})}/>
          </FormGroup>
        </Col>
      </Row>
        <h6 className='subtitulo_form_config'>Ventas</h6>
        <Row md={4}>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='depositoTS'>Cantidad de meses de ventas</Label>
              <Input className='input_form' bsSize="sm" name='cantidadDeMesesVentas' type='number' {...register('cantidadDeMesesVentas')}  defaultValue={parametrosApi.cantidadDeMesesVentas} onChange={e => setTipoParametrosApi({...parametrosApi, cantidadDeMesesVentas: e.target.value})}/>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label className='col-form-label-md' for='depositoTS'>Tipo de orden de preparación final</Label>
              <Input className='input_form' bsSize="sm" name='tipoOrdenPreparacionParcial' type='text' {...register('tipoOrdenPreparacionParcial')}  defaultValue={parametrosApi.tipoOrdenPreparacionParcial} onChange={e => setTipoParametrosApi({...parametrosApi, tipoOrdenPreparacionParcial: e.target.value})}/>
          </FormGroup>
        </Col>
          
        </Row>
      <Row md={4} className='row_btn_user'>
      
        <Col className='btn_conteneir_col'>
          <Button className='btn_grabar_form_conf' onClick={toggleModalCredenciales} color="success">Grabar</Button>
         
          <Link className='btn_volver_form_conf' to={'/'}>Volver</Link>
     
        </Col>
      </Row>
    </Form>
    <Modal isOpen={modalCredenciales} toggle={toggleModalCredenciales} >
      <ModalHeader toggle={toggleModalCredenciales}>Ingrese sus credenciales:</ModalHeader>
      <ModalBody>
        <FormGroup>
        <Col>
        <Label className='col-form-label-dm' for="usuario">Usuario</Label>
        <Controller
            name='usuario' 
            control={control} 
            rules={{ required: 'Debe escribir un usuario' }} 
            render={({ field }) => (
              <>
              <Input className={styleInputModal} bsSize="sm" id="usuario" 
                  name="usuario" type="text" {...register('usuario')} {...field}/>
                  {errors.usuario && <p className='error'>{errors.usuario.message}</p>}
              </>
            )}
          />
        </Col>
        <Col>
          <Label  className='col-form-label-dm' for="contraseña">Contraseña</Label>
          <Controller
            name='contraseña' 
            control={control} 
            rules={{ required: 'Debe escribir una contraseña' }} 
            render={({ field }) => (
              <>
              <Input {...register('contraseña')} className={styleInputModal} bsSize="sm" id="contraseña" 
                name="contraseña" defaultValue={''} type="password" {...field} />
                {errors.contraseña && <p className='error'>{errors.contraseña.message}</p>}
                <br />
                {errorResponse && <h5 className='h5_errorApi'>{errorMensajeApi}</h5> }
              </>
            )}
          />
        </Col> 
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModalCredenciales}>Cancelar</Button>
        <Button color="success" onClick={handleSubmit((data) => {
          updateData(data);
          
        })}>Grabar cambios</Button>
      </ModalFooter>
    </Modal>
  
      <CustomModal 
                    openModal={modalApiResponse}
                    toggleModal={toggleResponseApi}
                    toggleHeader={toggleResponseApi}
                    titleHeader={<BsCheckCircle className="icono-confirmacion animated.flip"/>}
                    textBody={<p style={{textAlign: "center", fontSize:"1.3rem"}}>{mensajeApi}</p>}
                    onClickConfirm={() => {
                        setearModalApiResponse(false);
                    }}
                    textBtnConfirm="CERRAR"
                    toLink={'/configuraciones'}
                    
                />
        </>
      )
     }
    </>

  );

 }
 export default FormConfig;

