import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/navbar/CustomNavbar';
import Home from './components/home/Home';
import NewQuestion from "./components/question/NewQuestion";
import Login from "./components/login/Login";
import Poll from "./components/poll/Poll";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import NotFound from './components/notFound/NotFound'

import { React, useEffect } from "react";
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";
import { setAuthedUser } from "./actions/authedUser";
import { saveQid } from "./actions/question";
import LoadingBar from "react-redux-loading";

function App({ authedUser, dispatch, loading, qid }) {
  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem('authedUser'))
    const qid = JSON.parse(sessionStorage.getItem('qid'))
    id && dispatch(setAuthedUser(id))
    qid && dispatch(saveQid(qid))
  }, [dispatch])

  useEffect(() => {
    authedUser === '' && dispatch(handleInitialData())
  })

  return (
    <div>
      <LoadingBar />
      {
        loading
          ? null
          : (
            <div>
              <Navbar />
              {
                authedUser === '' ? (
                  <Login />
                ) : <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<NewQuestion />} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />
                    <Route path={`/questions/${qid}`} element={<Poll />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              }
            </div>
          )
      }
    </div>
  );
}

function mapStateToProps({ authedUser, qid, users }) {
  return {
    authedUser,
    loading: users === null,
    qid
  }
}

export default connect(mapStateToProps)(App)
