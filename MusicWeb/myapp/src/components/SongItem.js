import React, { useContext } from 'react'
import "../css/songitem.css";
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AppContext from './AppContext';
import { useCookies } from 'react-cookie';
export default function SongItem({ song }) {
  const [setCookie] = useCookies(['currentSong']);
  const { state, dispatch } = useContext(AppContext);
  const $ = document.querySelector.bind(document);
  const audioP = $("#audio");
  const player = $(".control-player");
  const progress = $("#progress-bar");
  const playingSong = async (song) => {
    try {
      if(song !== undefined){
        dispatch({ type: "PLAYING_SONG", payload: { song } });
        dispatch({ type: "IS_PAUSE", payload: state.isPlaying });
        player.classList.remove("playing");
        setCookie('cTime', 0, { path: '/' });
        if (audioP !== undefined) {
          audioP.play();
          progress.value = 0;
        }
      }else{
        alert("Loading!!!")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <Card style={{ width: '18rem', margin: "10px" }} className="Card">
        <Link to={`songs/detail/${song.id}`} >
          <Card.Img variant="top" src={require("../public/uploads/img/song/" + song.img).default} alt="img" id="img" className="card-song" />
        </Link>
        <Card.Body>
          <Card.Title style={{ fontSize: "12px", fontWeight: "500", textAlign: "center" }}>{song.name}</Card.Title>
          <Button variant="primary" style={{ width: '100%' }}
            onClick={() => playingSong(song)}
          >
            Play
          </Button>
        </Card.Body>
      </Card>
  )
}
