import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? `User is authorized ${store.user.email}` : 'Please Log In or Sign Up'}</h1>
      <h1>{store.user.isActivated ? 'Email is confirmed' : 'Please confirm your email'}</h1>
      <button onClick={() => store.logout()}>Log Out</button>
      <div>
        <button onClick={getUsers}>Get Users</button>
      </div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);
