import { useEffect } from "react";
import SignIn from "./components/loginForm";
import {useDispatch, useSelector} from 'react-redux'
import {AuthCheckAction, AuthLogoutAction} from './redux/actions/auth.action'

function App() {
const dispatch = useDispatch()
const isLogin = useSelector(state => state.auth.isLogin)

  useEffect(()=> {
    if (localStorage.getItem('token')) {
      dispatch(AuthCheckAction())
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return <>
    {isLogin ? <button onClick={()=>dispatch(AuthLogoutAction())}>Выйти</button> : <SignIn/>}
  </>
  
}

export default App;
