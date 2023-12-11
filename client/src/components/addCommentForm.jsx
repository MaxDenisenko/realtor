import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { GetComments, CreateComment } from "../redux/actions/comments.action";
import { useDispatch } from "react-redux";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddCommentForm = ({ modalCommentsOpen, setModalCommentsOpen, phone, realtorFIO }) => {
  const [plusminus, setplusminus] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const handleClose = () => {
    setModalCommentsOpen(false);
  };
  const handleAdd = () => {
    const date = new Date()
    const dateNew = date.toISOString()
    dispatch(CreateComment(dateNew, phone, realtorFIO, plusminus, message))
    handleClose()
    dispatch(GetComments(phone))
  }
  const handleChangeRadio = (e) => {
    setplusminus(e.target.value);
  };

  return <>
    <Dialog
      open={modalCommentsOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ marginBottom: 3 }}>{`Добавить комментарий для ${phone}`}</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={plusminus}
            onChange={handleChangeRadio}
          >
            <FormControlLabel value="Положительный" control={<Radio />} label="Положительный" />
            <FormControlLabel value="Отрицательный" control={<Radio />} label="Отрицательный" />
          </RadioGroup>
        </FormControl>
        <TextField size="small" id="outlined-basic" label="Комментарий" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleAdd}>Добавить</Button>
      </DialogActions>
    </Dialog>
  </>
}

export default AddCommentForm