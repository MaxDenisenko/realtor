import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {AuthLogoutAction} from '../redux/actions/auth.action'
import { GetZapis } from "../redux/actions/zapis.action";
import { DataGrid } from '@mui/x-data-grid';


const ListPhone = () => {
    const dispatch = useDispatch()
    const zapis = useSelector(state => state.zapis.zapis)
    const isLogin = useSelector(state => state.auth.isLogin)
    useEffect(()=> {
        dispatch(GetZapis())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const columns = [
        {field: 'id', headerName: 'ID', width: 20},
        {field: 'phone', headerName: 'Номер телефона', width: 240},
        {field: 'plus',type: 'number', headerName: 'Положительных', width: 180},
        {field: 'minus',type: 'number', headerName: 'Отрицательных', width: 180},
]

    if(!isLogin) {
        return <div>Загрузка...</div>
    }
    return <>
    <div>
        <button onClick={()=>dispatch(AuthLogoutAction())}>Выйти</button>
    </div>
    <div style={{height: '100%', width:'100%'}}>
        {zapis && <DataGrid
            rows={zapis}
            columns={columns}
            initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 9 },
                },
              }}
              pageSizeOptions={[9, 10]}
              checkboxSelection
            />}
    </div>
    
    </>
}

export default ListPhone