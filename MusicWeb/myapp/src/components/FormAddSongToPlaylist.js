import React, { useContext, useState } from 'react'
import { ListGroup, Form, Button, Toast } from 'react-bootstrap';
import AppContext from './AppContext';
import AddSongToPlaylistItem from "./AddSongToPlaylistItem";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
export default function FormAddSongToPlaylist({ song }) {
    const { state, dispatch } = useContext(AppContext);
    const { playlists, songs, user } = state;
    const newPlaylists = state.playlists.filter((playlist) => {
        if (playlist.user.name === user) {
            return playlist;
        }
    });
    const history = useHistory();
    const [songToUpdate, setSongToUpdate] = useState(song);
    const update = async () => {
        try {
            console.log(songToUpdate);
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
            console.log(error.response);
        }
    }
    const addSongToPlaylist = async ({ playlist }, { song }) => {
        try {
            dispatch({ type: "ADD_SONG_TO_PLAYLIST", payload: { song, playlist } });
            update();
            // setShow(true);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Form>
            <Form.Group controlId="formBasicCheckbox">
                <ListGroup>
                    <ListGroup.Item>
                        {newPlaylists.map((playlist) => (
                            <Form.Group controlId="formBasicCheckbox">
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
                                </Button> {playlist.name}
                            </Form.Group>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Form.Group>
        </Form>
                   
        </div>
        
    )
}
