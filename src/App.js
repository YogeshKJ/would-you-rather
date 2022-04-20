import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/navbar/CustomNavbar';
import Home from './components/home/Home';
import NewQuestion from "./components/question/NewQuestion";
import Login from "./components/login/Login";
import { React, useEffect } from "react";
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";
import { setAuthedUser } from "./actions/authedUser";
import Poll from "./components/home/Poll";
import LeaderBoard from "./components/leaderboard/LeaderBoard";

function App({ authedUser, dispatch, loading }) {
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('authedUser'))
    id && dispatch(setAuthedUser(id))
  }, [dispatch])

  useEffect(() => {
    dispatch(handleInitialData())
  })

  if(loading)
    return <div>Loading</div>

  return (
    <div>
      <Navbar />
      {
        authedUser === '' ? (
          <Login />
        ) : <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newquestion" element={<NewQuestion />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />

          </Routes>
        </BrowserRouter>
      }

    </div>
  );
}

export default connect(state => ({
  authedUser: state.authedUser,
  loading: state.loading
}))(App)
