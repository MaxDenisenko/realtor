import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {AuthLogoutAction} from '../redux/actions/auth.action'
import { GetZapis } from "../redux/actions/zapis.action";
import AddForm from "./addForm";
import { Box, Button, Collapse, IconButton, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddCommentForm from "./addCommentForm";
import { GetComments } from "../redux/actions/comments.action";

// const message = [
//   {
//     id:1,
//     date:'01.11.2023',
//     realtorFIO:'Иванов Иван Иванович',
//     plusminus:'Отрицательный',
//     message:'Иван совсем не брежно относится к квартире'
//   },
//   {
//     id:2,
//     date:'01.11.2023',
//     realtorFIO:'Иванов Иван Иванович',
//     plusminus:'Отрицательный',
//     message:'Иван совсем не брежно относится к квартире'
//   },
//   {
//     id:3,
//     date:'01.11.2023',
//     realtorFIO:'Иванов Иван Иванович',
//     plusminus:'Положительный',
//     message:'Иван совсем не брежно относится к квартире'
//   },
//   {
//     id:4,
//     date:'01.11.2023',
//     realtorFIO:'Иванов Иван Иванович',
//     plusminus:'Положительный',
//     message:'Иван совсем не брежно относится к квартире'
//   },
//   {
//     id:5,
//     date:'01.11.2023',
//     realtorFIO:'Иванов Иван Иванович',
//     plusminus:'Отрицательный',
//     message:'Иван совсем не брежно относится к квартире'
//   },
// ]

const ListPhone = () => {
    const dispatch = useDispatch()
    const zapis = useSelector(state => state.zapis.zapis)
    useEffect(()=> {
        dispatch(GetZapis())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [modalOpen, setModalOpen] = useState(false);
    const handleClickOpen = () => {
        setModalOpen(true);
      };

    return <>
    <Box sx={{margin: "10px auto", width:"100%", maxWidth:650}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom:"5px"}}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Добавить телефон
            </Button>
            <AddForm modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            <Button variant="contained" onClick={()=>dispatch(AuthLogoutAction())}>Выйти</Button>
        </Box>
        <Box sx={{height: "100%"}}>
          <TableContainer component={Paper}>
            <Table sx={{maxWidth: "100%", minWidth:350}}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Телефон</TableCell>
                  <TableCell>+</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {zapis && zapis.map((item) => (
                  <Row key={item.id} row={item}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
}

function Row (props) {
  const {row} = props
  const [open, setOpen] = useState(false)
  const [openModalAddComment, setOpenModalAddComment] = useState(false)
  const realtorFIO = useSelector(state => state.auth.user.email)
  const dispatch = useDispatch()


  const getCommentsAndOpen = (phone) => {
    if(open) {
      setOpen(!open)
    }
    setOpen(!open)
    dispatch(GetComments(phone))
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>{row.id}</TableCell>
            <TableCell style={{padding:0}}>
              <IconButton
                size="small"
                onClick={()=>getCommentsAndOpen(row.phone)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>{row.phone} <IconButton size="small" onClick={()=>setOpenModalAddComment(true)}>
              <AddCommentIcon /></IconButton>
              <AddCommentForm modalCommentsOpen={openModalAddComment} setModalCommentsOpen={setOpenModalAddComment} phone={row.phone} realtorFIO={realtorFIO}/>
            </TableCell>
            <TableCell>{row.plus}</TableCell>
            <TableCell>{row.minus}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 0}}>
              <Typography variant="h6" gutterBottom component="div">
                Отзывы
              </Typography>
              <Table size="small" sx={{maxWidth:"100%"}}>
                <TableHead>

                </TableHead>
                <TableBody>
                  {row.message 
                  ? row.message.map((item) => (<Box sx={{border: 1}}>
                    <TableRow key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.realtorFIO}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan="2">{item.plusminus}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan="2">{item.message}</TableCell>
                    </TableRow>

                    </Box>
                  ))
                : <TableCell>Еще не оставили ни одного комментария</TableCell>
                }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
        </TableRow>
    </>
  )
}

export default ListPhone