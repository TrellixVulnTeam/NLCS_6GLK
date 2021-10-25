import React, { useContext } from 'react'
import AppContext from './AppContext';
import TableSongItem from "./TableSongItem"
export default function MySong() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const newSong = state.songs.filter((song) => {
       if (song.user.name === user)
            var x =  song;
        return x;
    });
    return (
        <div>
            <table className="table" style={{
                marginBottom: "100px"
                }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Tên bài hát</th>
                        <th scope="col">Thời điểm upload</th>
                        <th scope="col" colSpan="4" className="text-center">Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {newSong.map((song) => (
                        <tr key = {song.id}>
                            <TableSongItem song={song} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
