import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface Props{
    title:string
    description:string
    additionals?: {
        label:string,
        value:string
    }[]
    actions?: {
        text:string,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    }[]
    open:boolean;
    onModalClose: () => void
}

function CustomModal(props:Props){

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const {open, onModalClose,  title, description, actions, additionals} = props;

    useEffect(() => {
        setModalOpen(open);
    }, [open])

    return (
        <>
            <Modal
            open={modalOpen}
            onClose={onModalClose}
            aria-labelledby="custom-modal-title"
            aria-describedby="custom-modal-description"
            >
                <Box sx={style}>
                    <div className="custom-modal">
                        <div className="custom-modal-head">
                            <h2 id="custom-modal-title">{title}</h2>
                            <IconButton color="error" aria-label="close modal" onClick={onModalClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <p id="custom-modal-description">{description ? description : "N/A"}</p>
                        
                        {additionals && additionals.length > 0 ? 
                            <div className="custom-modal-additionals">
                                {additionals.map((addition) => 
                                    <div className="custom-modal-additionals-item">
                                        <h5>{addition.label}</h5>
                                        <p>{addition.value}</p>
                                    </div>
                                )}
                            </div> : null
                        }

                        {actions && actions.length > 0 ?
                            <div className="custom-modal-actions">
                                {actions.map((action) => 
                                    <button className="custom-modal-actions-button"
                                    onClick={(e) => action.onClick(e)}>
                                        {action.text}
                                    </button>
                                )}
                            </div> : null
                        }
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default CustomModal;