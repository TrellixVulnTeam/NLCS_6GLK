import React, { useContext } from 'react';
import FormUpdateSong from "./FormUpdateSong";
import FormUpdateImgSong from "./FormUpdateImgSong";
import AddSongToPlaylist from "./AddSongToPlaylist";
import { Button } from 'react-bootstrap';
import AppContext from './AppContext';
import axios from 'axios';
export default function TableSongItem({ song }) {
    const { dispatch } = useContext(AppContext); 
   
    const deleteSong = async () => {
        try{    
            const token = localStorage.getItem('token');
            const option = {
                method: "delete",
                url: `/api/song/${song.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios(option);
            dispatch({
                type: "DELETE_ONE_SONGS",
                payload: {song},
            })
        } 
        catch(error){
            console.log(error);
        }
    }
    let date = new Date(song.createdAt);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    const [modalShow3, setModalShow3] = React.useState(false);
    return (
        <>
            <td>{song.name}</td>
            <td>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `}</td>
            <td>
                <Button variant="primary" onClick={() => setModalShow1(true)}>
                    Thêm vào playlist
                </Button>
                <AddSongToPlaylist
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                    song={song} key={song._id}
                />
            </td>
            <td>
                <Button variant="primary" onClick={() => setModalShow2(true)}>
                    Sửa Tên Bài Hát
                </Button>
                <FormUpdateSong
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                    song={song} key={song._id}
                />
            </td>
            <td>
                <Button variant="primary" onClick={() => setModalShow3(true)}>
                    Sửa Ảnh Bài Hát
                </Button>
                <FormUpdateImgSong
                    show={modalShow3}
                    onHide={() => setModalShow3(false)}
                    song={song} key={song._id}
                />
            </td>
            <td> 
                <Button
                    onClick = {() => deleteSong()}
                >
                Xóa
            </Button>
            </td>
        </>
    )
}
