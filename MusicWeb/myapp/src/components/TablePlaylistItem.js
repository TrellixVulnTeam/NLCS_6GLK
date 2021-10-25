import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import FormUpdatePlaylist from "./FormUpdatePlaylist";
import ShowPlaylist from "./ShowPlaylist";
import AppContext from './AppContext';
import axios from 'axios';
export default function TablePlaylistItem({ playlist }) {
    const { dispatch } = useContext(AppContext);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    const deletePlaylist = async () => {
        try {

            const token = localStorage.getItem('token');
            const option = {
                method: "delete",
                url: `/api/playlist/${playlist.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios(option);
            dispatch({
                type: "DELETE_ONE_PLAYLIST",
                payload: { playlist },
            })

        }
        catch (error) {
            console.log(error);
        }
    }
    let date = new Date(playlist.createdAt);
    return (
            <>   
                 <td>{playlist.name}</td>
            <td>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `}</td>
            <td>
                <Button variant="primary" onClick={() => setModalShow1(true)}>
                    Show Playlist
                </Button>
                <ShowPlaylist
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                    playlist={playlist} key={playlist._id}
                />
            </td>
            <td>
                <Button variant="primary" onClick={() => setModalShow2(true)}>
                    Sửa
                </Button>
                <FormUpdatePlaylist
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                    playlist={playlist} key={playlist._id}
                />
            </td>
            <td><Button
                onClick={() => deletePlaylist()}
            >
                Xóa
            </Button>
            </td>
            </>
    )
}
