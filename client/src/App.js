import { useEffect, useState } from "react";
import SignIn from "./components/loginForm";
import axios from "axios";


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(()=> {
    if (localStorage.getItem('token')) {
      CheckAuth()
  }
  },[])

  const CheckAuth =  () => {
    return async (userData) => {
    try {
      const response = await axios.get('https://maxdenisenko.ru/api/refresh', { withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      setUserData(response.data)
      setIsLogin(true)
    } catch (error) {
      console.log(error);
    }
  }
  };

  return <>
    {!isLogin ? <SignIn isLogin={isLogin} setIsLogin={setIsLogin}/> : <div>Авторизован</div>}
  </>
  
}

export default App;
