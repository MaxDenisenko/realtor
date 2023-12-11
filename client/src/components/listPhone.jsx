import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetZapis } from "../redux/actions/zapis.action";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddCommentForm from "./addCommentForm";
import { GetComments } from "../redux/actions/comments.action";
import MainAppBar from "./AppBar";
import ErrorMsg from "../ext/error";


const ListPhone = () => {
  const dispatch = useDispatch()
  const zapis = useSelector(state => state.zapis.zapis)
  const hasError = useSelector(state => state.auth.hasError)
  useEffect(() => {
    dispatch(GetZapis())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return <>
    <Box sx={{ margin: "10px auto", width: "100%", maxWidth: 650 }}>
    <MainAppBar />
      <Box sx={{ height: "100%" }}>
      {hasError && <ErrorMsg/>}
        <TableContainer >
          <Table sx={{ maxWidth: "100%", minWidth: 350 }}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell>+</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zapis && zapis.map((item) => (
                <Row key={item.id} row={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </>
}

function Row(props) {
  const { row } = props
  const [open, setOpen] = useState(false)
  const [openModalAddComment, setOpenModalAddComment] = useState(false)
  const realtorFIO = useSelector(state => state.auth.user.email)
  const dispatch = useDispatch()


  const getCommentsAndOpen = (phone) => {
    if (open) {
      setOpen(!open)
    }
    setOpen(!open)
    dispatch(GetComments(phone))
  }

  const changeColor = (plusminus) => {
    let color = '#ff9e81'
    if (plusminus === 'Положительный') {
      color = '#9CEE90'
    } 
    return color
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{ padding: 0 }}>
          <IconButton
            size="small"
            onClick={() => getCommentsAndOpen(row.phone)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.phone} <IconButton size="small" onClick={() => setOpenModalAddComment(true)}>
          <AddCommentIcon /></IconButton>
          <AddCommentForm modalCommentsOpen={openModalAddComment} setModalCommentsOpen={setOpenModalAddComment} phone={row.phone} realtorFIO={realtorFIO} />
        </TableCell>
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
              {row.message
                ? row.message.map((item) => (<>
                  <Table size="small" sx={{borderBottom:'unset',borderRadius: 3, maxWidth: "100%", marginBottom: 1, backgroundColor: (changeColor(item.plusminus))}} >
                    <TableBody>
                      <TableRow key={item.id} >
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.realtorFIO}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan="2">{item.plusminus}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan="2">{item.message}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
                ))
                : <TableRow><Typography variant="h8" gutterBottom component="div">Еще не оставили ни одного комментария</Typography></TableRow>
              }

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ListPhone