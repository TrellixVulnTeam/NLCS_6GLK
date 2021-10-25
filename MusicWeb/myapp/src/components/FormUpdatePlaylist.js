import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from './AppContext';
export default function FormUpdatePlaylist(props) {
  const { dispatch } = useContext(AppContext); 
    const [PlaylistToUpdate, setPlaylistToUpdate] = useState(props.playlist);
    const updatePlaylist = async () => {
        try{    
            const token = localStorage.getItem('token');
            const option = {
                method: "put",
                url: `/api/playlist/${props.playlist.id}`,
                data: PlaylistToUpdate,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios(option);
            dispatch({
                type: "UPDATE_ONE_PLAYLIST",
                payload: {...PlaylistToUpdate},
            })
            props.onHide()
        } 
        catch(error){
            console.log(error.response);
        }
    }
    return (
        <div>
      <Modal
        {...props}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Playlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tên playlist</label>
                <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Nhập tên playlist"
                    value={PlaylistToUpdate.name}
                    onChange={(e) => setPlaylistToUpdate({ ...PlaylistToUpdate, [e.target.name]: e.target.value })}
                />
            </div>
            <button type="button"
                className="btn btn-primary"
                onClick={() => updatePlaylist()}
            >Save</button>
        </form>
        </Modal.Body>
      </Modal>
    </div>
    )
}
