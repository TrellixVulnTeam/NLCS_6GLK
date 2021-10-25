import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Modal, Toast, Form, ListGroup, Button } from 'react-bootstrap';
import AppContext from './AppContext';
export default function AddSongToPlaylist(props) {
  const song = props.song;
  const [show, setShow] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const newPlaylists = state.playlists.filter((playlist) => {
    if (playlist.user.name === user) {
      var x = playlist;
    }
    return x;
  });
  const [songToUpdate] = useState(song);
  const updateSong = async () => {
    try {
      const token = localStorage.getItem('token');
      const option = {
        method: "put",
        url: `/api/song/${song.id}`,
        data: songToUpdate,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios(option);
      dispatch({
        type: "UPDATE_ONE_SONG",
        payload: { ...songToUpdate },
      })

    }
    catch (error) {
      console.log(error);
    }
  }
  const updatePlaylist = async({playlist}) =>{
    try {
      const token = localStorage.getItem('token');
      const option = {
        method: "put",
        url: `/api/playlist/${playlist.id}`,
        data: playlist,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios(option);
    }
    catch (error) {
      console.log(error);
    }
  }
  const addSongToPlaylist = async ({ playlist }, { song }) => {
    try {
      var x = false;
      for (const value of playlist.songs){
        if (song.id === value) {
          x = true;
          break;
        }
      }
      if( x === true){
        alert("Bài hát đã có trong playlist!!!");
      }else{
        if(song !== undefined && playlist !== undefined){
          dispatch({ type: "ADD_SONG_TO_PLAYLIST", payload: { song, playlist } });
          updateSong();
          updatePlaylist({playlist});
          setShow(true);
          props.onHide();
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div >
      <Modal
        {...props}
        size="lg"
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm Bài Hát {song.name} Vào Playlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCheckbox">
              <ListGroup>
                <ListGroup.Item>
                  {newPlaylists.map((playlist) => (
                    <Form.Group controlId="formBasicCheckbox" key={playlist.id}>
                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        label={playlist.name}
                        name="check"
                        value={songToUpdate._id}
                        onClick={() => addSongToPlaylist({ playlist }, { song })}
                      >
                        +
                      </Button>{playlist.name}

                    </Form.Group>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Toast
        style={{
          position: 'absolute',
          bottom: 100,
          left: 100,
          zIndex: 999
        }}
        delay={3000}
        autohide
        animation={false}
        onClose={() => setShow(false)} show={show}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">Thông báo</strong>

        </Toast.Header>
        <Toast.Body> Bạn đã thêm {song.name} vào playlist thành công!. </Toast.Body>
      </Toast>
    </div>
  )
}
