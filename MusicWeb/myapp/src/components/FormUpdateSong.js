import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from './AppContext';
export default function FormUpdateSong(props) {
  const { dispatch } = useContext(AppContext);
  const [songToUpdate, setSongToUpdate] = useState(props.song);
  const updateSong = async () => {
    try {
      const token = localStorage.getItem('token');
      const option = {
        method: "put",
        url: `/api/song/${props.song.id}`,
        data: songToUpdate,
        headers: {
          Authorization: `Bearer ${token}`
          , "Content-Type": "multipart/form-data"
        }
      };
      await axios(option);
      dispatch({
        type: "UPDATE_ONE_SONG",
        payload: { ...songToUpdate },
      })
      props.onHide()
    }
    catch (error) {
      console.log(error.response);
    }
  }
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Song
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Tên bài hát</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Nhập tên bài hát"
                value={songToUpdate.name}
                onChange={(e) => setSongToUpdate({ ...songToUpdate, [e.target.name]: e.target.value })}
              />
            </div>
            <button type="button"
              className="btn btn-primary"
              onClick={() => updateSong()}
            >Save</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
