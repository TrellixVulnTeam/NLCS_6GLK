import React, { useContext } from 'react';
import { Modal, Form, ListGroup } from 'react-bootstrap';
import AppContext from './AppContext';
export default function ShowPlaylist(props) {
    const playlist = props.playlist;
    const { state } = useContext(AppContext);
    const { songs } = state;
    const newSongs = playlist.songs.map((song) => {
        return song;
    });
    const songOfPlaylist = [];
    newSongs.forEach(element => {
        songs.forEach((song) => {
            if (element === song.id) {
                songOfPlaylist.push(song);
            }
        })
    });
    return (
        <div >
            <Modal
                {...props}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Danh Sách Bài Hát Trong Playlist {playlist.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            {songOfPlaylist.length === 0 ? (

                                <div> 
                                    <p>
                                        Danh sách bài hát rỗng :(
                                    </p>
                                </div>

                            ): (
                                <>
                                {
                                    songOfPlaylist.map((song) => (
                                    <Form.Group controlId="formBasicCheckbox" key={song.id}>
                                        {song.name}
                                    </Form.Group>
                                    ))
                                    
                                }
                            </>
                            )
                            }

                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
        </Modal>
        </div >
    )
}
