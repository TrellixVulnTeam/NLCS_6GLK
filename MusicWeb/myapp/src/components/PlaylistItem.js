import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import "../css/PlaylistItem.css";
import "../css/reset.css";
import AppContext from './AppContext';
import { useCookies } from 'react-cookie';
export default function PlaylistItem({ playlist }) {
  const { state, dispatch } = useContext(AppContext);
  const [cookies,setCookie] = useCookies(['currentSong']);
  const playingPlaylist = async (playlist) => {
    try {
      dispatch({ type: "PLAYING_PLAYLIST", payload: { playlist } });
      if (state.songs.length === 0) {
        console.log("NULL");
      } else {
        let newSong = state.songs.filter((song) => {
          for (const value of playlist.songs)
            if (song.id === value) {
              var x = song;
            }
          return x;
        });
        if (newSong.length === 0) {
          alert("Playlist rỗng !!!");

        } else {
          dispatch({ type: "SET_PLAYLIST", payload: { newSong } });
          setCookie('cIndex', 0, { path: '/' });
          setCookie('cTime', 0, { path: '/' });
          let song = newSong[cookies.cIndex];
          if(song !== undefined){
            dispatch({ type: "PLAYING_SONG", payload: { song } });
          }else{
            alert("Loading!!!");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card style={{ width: '20rem', margin: "10px", border: "solid #F8F9FA 4px", backgroundColor: "#F8F9FA" }} className="playlist-card">
      <Link to={`playlists/detail/${playlist.id}`} onClick={() => playingPlaylist(playlist)} className="nav-link">
        <Card.Img variant="top" src={require("../public/uploads/img/playlist/" + playlist.img).default} alt="img" id="img" className="card-song" />
      </Link>
      <Card.Body>
        <Card.Title style={{ fontWeight: "500", textAlign: "center", borderTop: "solid #FFFFFF 2px",color:"#517AA3", fontSize:"18px" }}>{playlist.name}</Card.Title>
      </Card.Body>
    </Card>
  )
}
