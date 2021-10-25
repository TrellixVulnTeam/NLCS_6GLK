import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';
import AppContext from './AppContext';
export default function FormCreatePlaylist() {
    const [errorMessage, setErrorMessage] = useState(null);
    const { dispatch } = useContext(AppContext);
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData()
            if (!data.img[0]) return alert("File not exist.")
            formData.append("img", data.img[0]);
            formData.append("name", data.name);
            formData.append("isPublic", data.isPublic);
            const option = {
                method: "POST",
                url: "/api/playlist/",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                    , "Content-Type": "multipart/form-data"
                }
            };
            setLoading(true);
            const response = await axios(option);
            dispatch({
                type: "CREATE_ONE_PLAYLIST",
                payload: { response },
            });
            setTimeout(function () {
                setLoading(false);
                history.push("/playlists");
            }, 2000);
            console.log(response);

        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };
    if(loading) return <div><Loading /></div>
    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tên Playlist</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Nhập tên playlist"
                    {...register("name")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Upload Ảnh.</label>
                <input type="file"
                    className="form-control-file"
                    id="file"
                    name="img"
                    {...register("img")}
                />
            </div>
            <div className="form-check">
                <input className="form-check-input"
                    type="checkbox"
                    id="defaultCheck2"
                    {...register("isPublic")}
                />
                <label className="form-check-label" htmlFor="defaultCheck2">
                    Public.
                </label>
            </div>
            <button type="submit" className="btn btn-primary">Tạo Playlist.</button>
            {
                errorMessage && (Array.isArray(errorMessage) ? (errorMessage.map((err) => (
                    <div className="error-message">Error: {err}</div>

                )))
                    : (
                        <div className="error-message">Error: {errorMessage}</div>
                    ))
            }
        </form>
    )
}
