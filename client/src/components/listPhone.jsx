import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {AuthLogoutAction} from '../redux/actions/auth.action'
import { GetZapis } from "../redux/actions/zapis.action";
import { DataGrid } from '@mui/x-data-grid';
import AddForm from "./addForm";
import { Button } from "@mui/material";


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
        {field: 'phone', headerName: 'Номер телефона', width: 140},
        {field: 'plus',type: 'number', headerName: 'Положительных', width: 120},
        {field: 'minus',type: 'number', headerName: 'Отрицательных', width: 120},
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
                  paginationModel: { page: 0, pageSize: 39 },
                },
              }}
              pageSizeOptions={[39, 40]}
              checkboxSelection
            />}
    </div>
    
    </>
}

export default ListPhone