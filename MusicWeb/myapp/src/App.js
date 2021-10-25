import React, { useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppReducer from "./reducers/AppReducer";
import { useReducer } from "react";
import { Container } from 'react-bootstrap';
import Musicplayer from "./components/Musicplayer";
import DetailPlaylist from "./components/DetailPlaylist";
import DetailSong from "./components/DetailSong";
import Loading from "./components/Loading";
import Mymusic from "./components/Mymusic";
import MySong from "./components/MySong";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import MyPlaylist from "./components/MyPlaylist";
import FormUploadSong from "./components/FormUploadSong";
import FormUpdateSong from "./components/FormUpdateSong";
import FormCreatePlaylist from "./components/FormCreatePlaylist";
import Header from "./components/Header";
import SongList from "./components/SongList";
import Login from "./components/Login";
import Register from "./components/Register";
import PlaylistList from "./components/PlaylistList";
import AppContext from "./components/AppContext";
import axios from "axios";
function App() {
  const inittialstate = {
    user: null,
    img: null,
    songs: [],
    playlists: [],
    playingSong: null,
    playingPlaylist: null,
    songOfPlaylistPlaying: [],
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    loading: true,
  };
  const [state, dispatch] = useReducer(AppReducer, inittialstate);
  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "get",
        url: "/api/auth/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(option);
      if (response.data.data.user) {
        const user = {
          name: response.data.data.user.name,
          img: response.data.data.user.img,
          songs: response.data.data.user.songs,
          playlists: response.data.data.user.playlists
        };
        dispatch({ type: "CURRENT_USER", payload: { user } });
   
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);
  const getAllSongs = useCallback(async () => {
    try {
      const option = {
        method: "get",
        url: "/api/song"
      };
      const response = await axios(option);
      const songs = response.data.data.songs;
      dispatch({ type: "GET_ALL_SONGS", payload: songs });

    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {

    getAllSongs();
  }, [getAllSongs]);
  const getAllPlaylists = useCallback(async () => {
    try {
      const option = {
        method: "get",
        url: '/api/playlist'
      };
      const response = await axios(option);
      const playlists = response.data.data.playlists;
      dispatch({ type: "GET_ALL_PLAYLISTS", payload: playlists });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {

    getAllPlaylists();
  }, [getAllPlaylists]);
  setTimeout( () => {
    dispatch({ type: "LOADING_FINISH", payload: state.loading });
  }, 3000);

  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        <Container>
          {state.loading === true ? (
            <>
              <Container>
                <Loading />
              </Container>
            </>
          ) : (
            <>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Main/>
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/playlists">
                  <PlaylistList />
                </Route>

                <Route exact path="/playlists/detail/:id">
                  <DetailPlaylist />
                </Route>
                <Route exact path="/songs">
                  <SongList />
                </Route>
                <Route exact path="/songs/detail/:id">
                  <DetailSong />
                </Route>
                <Route exact path="/mymusic/song">
                  <Mymusic />
                  < MySong />
                </Route>
                <Route exact path="/mymusic/playlist">
                  <Mymusic />
                  < MyPlaylist />
                </Route>
                <Route exact path="/mymusic/upload">
                  <Mymusic />
                  < FormUploadSong />
                </Route>
                <Route exact path="/mymusic/update">
                  <Mymusic />
                  < FormUpdateSong />
                </Route>
                <Route exact path="/mymusic/create">
                  <Mymusic />
                  < FormCreatePlaylist />
                </Route>
                <Route path="*">
                  <NotFound/>
                </Route>
              </Switch>
              {state.playingSong === null ? (
                <>
                  <div></div>
                </>
              ) : (
                <>
                  {state.loading === true ? (
                    <>
                      <Loading />
                    </>
                  ) : (
                    <>
                      <Musicplayer song={state.playingSong} key={state.playingSong._id} />
                    </>
                  )
                  }
                </>
              )
              }
            </>
          )
          }

        </Container>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
