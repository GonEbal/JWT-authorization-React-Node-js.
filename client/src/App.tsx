import React, {FC, useEffect, useContext} from 'react';
import { Context } from './index';
import LoginForm from './components/LoginForm';
import {observer} from 'mobx-react-lite';

const App:FC = () => {

  const {store} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? `User is authorized ${store.user.email}` : 'Please Log In or Sign Up'}</h1>
      <button onClick={() => store.logout()}>Log Out</button>
    </div>
  );
}

export default observer(App);
