import axios from 'axios';
import React, {  useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function FormUpdateImgSong(props) {
    const [images, setImages] = useState(false)
    const history = useHistory();
    const [songToUpdate] = useState(props.song);
    const handleUpload = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('img', file)
            const res = await axios.post('/api/song/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${token}` }
            })
            console.log(res.data);
            setImages(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const handleOnSubmit = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/song/update/${props.song.id}`, {...songToUpdate, images}, {
                headers: {Authorization: `Bearer ${token}`}
            })
            history.push("/")
            } catch (error) {
                console.log(error);
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
                            Update Img Song
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleOnSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Upload Ảnh.</label>
                                <input type="file" name="img" id="file" onChange={handleUpload}/>
                            </div>
                            
                            <button type="submit"
                                className="btn btn-primary"
                            >Save</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
