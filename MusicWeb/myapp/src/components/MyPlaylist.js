import React, { useContext } from 'react'
import AppContext from './AppContext';
import TablePlaylistItem from "./TablePlaylistItem"
export default function MyPlaylist() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const newPlaylist = state.playlists.filter((playlist) => {
        if (playlist.user.name === user) {
            var x = playlist;
        }
        return x;
    });
    return (
        <div style={{
            position: 'relative'
        }}>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Tên PLaylist</th>
                        <th scope="col">Thời điểm upload</th>
                        <th scope="col" colSpan="3" className="text-center">Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {newPlaylist.map((playlist) => (
                       
                            <tr key={playlist.id}>
                                <TablePlaylistItem playlist={playlist} />
                            </tr>
                     
                    ))}
                </tbody>
            </table>
        </div>
    )
}
