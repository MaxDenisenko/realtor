import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {AuthLogoutAction} from '../redux/actions/auth.action'
import { GetZapis } from "../redux/actions/zapis.action";
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AddForm from "./addForm";
import { Box, Button } from "@mui/material";

function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter placeholder="Поиск"/>
      </Box>
    );
  }


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
    const columns = [
        {field: 'id', headerName: 'ID', width: 20},
        {field: 'phone', headerName: 'Телефон', width : 130},
        {field: 'plus',type: 'number', headerName: '+', width: 75},
        {field: 'minus',type: 'number', headerName: '-', width: 75},
]

    return <>
    <div style={{margin:"10px", display: "flex", justifyContent: "space-between"}}>
        <Button variant="outlined" onClick={handleClickOpen}>
            Добавить телефон
        </Button>
        <AddForm modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <Button variant="contained" onClick={()=>dispatch(AuthLogoutAction())}>Выйти</Button>
    </div>
    <div style={{height: "100%", margin:"10px"}}>
        {zapis && <DataGrid
            rows={zapis}
            columns={columns}
            initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20, 30, 40]}
              autoHeight
            slots={{ toolbar: QuickSearchToolbar }}
            />}
    </div>
    
    </>
}

export default ListPhone