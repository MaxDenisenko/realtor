import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetZapis, SearchZapis } from "../redux/actions/zapis.action";
import { Box, Collapse, IconButton, TextField, Typography } from "@mui/material";
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
  let zapis = useSelector(state => state.zapis.zapis)
  const searchZapis = useSelector(state => state.zapis.searchPhone)
  const hasError = useSelector(state => state.auth.hasError)
  const [searchedValue, setSearchedValue] = useState('')

  useEffect(() => {
    dispatch(GetZapis())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (value) => {
    setSearchedValue(value)
    dispatch(SearchZapis(value))
  }
  if (searchZapis && searchZapis.length > 0) {
    zapis = searchZapis
  }
  return <>
    <Box sx={{ margin: "10px auto", width: "100%", maxWidth: 650 }}>
      <MainAppBar />
      <Box sx={{ height: "100%" }}>
        {hasError && <ErrorMsg />}
        <TextField id="filled-basic" variant="filled" placeholder="Поиск" style={{ width: "100%" }} type="number" onChange={e => handleSearch(e.target.value)} value={searchedValue} />
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

function Row (props) {
  const { row } = props
  const [open, setOpen] = useState(false)
  const [openModalAddComment, setOpenModalAddComment] = useState(false)
  const realtorFIO = useSelector(state => state.auth.user.email)
  const dispatch = useDispatch()


  const getCommentsAndOpen = (phone) => {
    if (!open) {
      setOpen(true)
      dispatch(GetComments(phone))
    }
    setOpen(!open)
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
        <TableCell>{row.phone}
          <IconButton size="small" onClick={() => setOpenModalAddComment(true)}>
            <AddCommentIcon />
          </IconButton>
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
              <Table size="small" sx={{ borderBottom: 'unset', borderRadius: 3, maxWidth: "100%", marginBottom: 1 }} >
                <TableBody>
                  {row.message
                    ? row.message.map((item) => <CollapseTable row={item} key={item.id}/>)
                    : <TableRow><TableCell>Еще не оставили ни одного комментария</TableCell></TableRow>
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

function CollapseTable(props) {

  const { row } = props
  const changeColor = (plusminus) => {
    let color = '#ff9e81'
    if (plusminus === 'Положительный') {
      color = '#9CEE90'
    }
    return color
  }

  return (
    <>
        <TableRow style={{ backgroundColor: (changeColor(row.plusminus)) }}>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.realtorFIO}</TableCell>
        </TableRow >
        <TableRow style={{ backgroundColor: (changeColor(row.plusminus)) }}>
          <TableCell colSpan="2">{row.plusminus}</TableCell>
        </TableRow>
        <TableRow style={{ backgroundColor: (changeColor(row.plusminus)) }}>
          <TableCell colSpan="2">{row.message}</TableCell>
        </TableRow>
    </>
  )
}

export default ListPhone