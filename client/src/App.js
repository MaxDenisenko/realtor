import { useEffect } from "react";
import SignIn from "./components/loginForm";
import {useDispatch, useSelector} from 'react-redux'
import {AuthCheckAction} from './redux/actions/auth.action'
import ListPhone from "./components/listPhone";

function App() {
const dispatch = useDispatch()
const isLogin = useSelector(state => state.auth.isLogin)

  useEffect(()=> {
    if (localStorage.getItem('tokenR')) {
      dispatch(AuthCheckAction())
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <>
    {isLogin ? <ListPhone/> : <SignIn/>}
  </>
  
}

export default App;
