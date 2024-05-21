import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CustomModal = ({
    openModal, toggleModal, 
    toggleHeader, titleHeader = '', textBody, 
    onClickCancel, onClickConfirm,
    textBtnCancel = '', textBtnConfirm,
    toLink
    
                       
} ) => {
    const [backdrop, setBackdrop] = useState('static');
    const [keyboard, setKeyboard] = useState(false);


    return(
        <>
            <Modal isOpen={openModal} toggle={toggleModal}  centered keyboard={keyboard} backdrop={backdrop}> 
            {titleHeader && 
                <ModalHeader toggle={toggleHeader}>{titleHeader} </ModalHeader>}
                <ModalBody>{textBody}</ModalBody>
                <ModalFooter>
                {textBtnCancel &&  
                    <Link autoFocus className='btn_volver_form_conf' onClick={onClickCancel}>{textBtnCancel} </Link>}
                    <Link className='btn_verde' onClick={onClickConfirm} to={toLink ? toLink : ''}>{textBtnConfirm} </Link>
                </ModalFooter>
            </Modal>
        </>
    );
};
export default CustomModal;