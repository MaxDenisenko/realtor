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

const message = [
  {
    id:1,
    date:'01.11.2023',
    realtorFIO:'Иванов Иван Иванович',
    plusminus:'-',
    message:'Иван совсем не брежно относится к квартире'
  },
  {
    id:2,
    date:'01.11.2023',
    realtorFIO:'Иванов Иван Иванович',
    plusminus:'-',
    message:'Иван совсем не брежно относится к квартире'
  },
  {
    id:3,
    date:'01.11.2023',
    realtorFIO:'Иванов Иван Иванович',
    plusminus:'+',
    message:'Иван совсем не брежно относится к квартире'
  },
  {
    id:4,
    date:'01.11.2023',
    realtorFIO:'Иванов Иван Иванович',
    plusminus:'+',
    message:'Иван совсем не брежно относится к квартире'
  },
  {
    id:5,
    date:'01.11.2023',
    realtorFIO:'Иванов Иван Иванович',
    plusminus:'-',
    message:'Иван совсем не брежно относится к квартире'
  },
]

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
    <div style={{margin:"10px", display: "flex", justifyContent: "space-between"}}>
        <Button variant="outlined" onClick={handleClickOpen}>
            Добавить телефон
        </Button>
        <AddForm modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <Button variant="contained" onClick={()=>dispatch(AuthLogoutAction())}>Выйти</Button>
    </div>
    <div style={{height: "100%", margin:"10px"}}>
      <TableContainer component={Paper}>
        <Table sx={{maxWidth: 650}}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
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
    </div>
    
    </>
}

function Row (props) {
  const {row} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.plus}</TableCell>
            <TableCell>{row.minus}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Отзывы
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Дата</TableCell>
                    <TableCell>Риелтор</TableCell>
                    <TableCell>+/-</TableCell>
                    <TableCell>Отзыв</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {message && message.map((item) => (
                    <TableRow>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.realtorFIO}</TableCell>
                      <TableCell>{item.plusminus}</TableCell>
                      <TableCell>{item.message}</TableCell>
                    </TableRow>
                  ))}
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