import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from "@mui/material";
import { CreateZapis, GetZapis } from "../redux/actions/zapis.action";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddForm = ({modalOpen, setModalOpen}) => {
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()

    const handleClose = () => {
    setModalOpen(false);
  };
    const handleAdd = () => {
        dispatch(CreateZapis(phone))
        handleClose()
        dispatch(GetZapis())
    }

    return <>
        <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >{"Добавить телефон"}</DialogTitle>
        <DialogContent>
            <TextField sx={{marginTop:2}} size="small" id="outlined-basic" label="Телефон" variant="outlined" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAdd}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </>
}

export default AddForm