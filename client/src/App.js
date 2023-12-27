import { useEffect } from "react";
import SignIn from "./components/loginForm";
import { useDispatch, useSelector } from 'react-redux'
import { AuthCheckAction } from './redux/actions/auth.action'
import ListPhone from "./components/listPhone";
import Registration from "./components/registrationForm";

function App() {
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.auth.isLogin)
  const isLoading = useSelector(state => state.auth.isLoading)
  const registration = useSelector(state => state.auth.registration)

  useEffect(() => {
    if (localStorage.getItem('tokenR')) {
      dispatch(AuthCheckAction())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) { return <div style={{ textAlign: "center" }}>Загрузка...</div> }
  if (registration) { return <Registration /> }
  if (!isLogin) { return <SignIn /> }
  return <>
      <ListPhone />
  </>

}

export default App;
