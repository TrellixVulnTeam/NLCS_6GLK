export default function reducer(state, action) {
    switch (action.type) {
        case "CURRENT_USER":
            if (action.payload === null) {
                return {
                    ...state,
                    user: null,
                    img: null,
                };
            }
            else {
                return {
                    ...state,
                    user: action.payload.user.name,
                    img: action.payload.user.img,
                };
            }

        case "GET_ALL_PLAYLISTS":
            return { ...state, playlists: action.payload };
        case "GET_ALL_SONGS":
            return { ...state, songs: action.payload };
        case "GET_ONE_SONGS":
            return { ...state, songs: action.payload };
        case "CREATE_ONE_SONG":
            return { ...state, songs: [...state, action.payload] };

        case "ADD_SONG_TO_PLAYLIST":
            state.playlists.filter((playlist) => {
                if (playlist.id === action.payload.playlist.id) {
                    if (playlist.songs.includes(action.payload.song.id) === false) {
                        playlist.songs.push(action.payload.song.id);
                        action.payload.song.playlists.push(action.payload.playlist.id);
                    }
                    return { ...state };
                }
                return { ...state };
            });
            return { ...state };
        case "UPDATE_ONE_SONG":
            return {
                ...state, songs: state.songs.map((song) =>
                    song.id === action.payload.id
                        ? { ...song, ...action.payload }
                        : song
                ),
            };
        case "UPDATE_ONE_PLAYLIST":
            return {
                ...state, playlists: state.playlists.map((playlist) =>
                    playlist.id === action.payload.id
                        ? { ...playlist, ...action.payload }
                        : playlist
                ),
            };
        case "DELETE_ONE_SONGS":
            return {
                ...state, songs: state.songs.filter((song) => song.id !== action.payload.song.id),
            };
        case "DELETE_ONE_PLAYLIST":
            return {
                ...state, playlists: state.playlists.filter((playlist) => playlist.id !== action.payload.playlist.id),
            };
        case "PLAYING_PLAYLIST":
            return {
                ...state, playingPlaylist: state.playlists.filter((playlist) =>
                    playlist.id === action.payload.playlist.id),
            };
        case "IS_PLAYING":
            return { ...state, isPlaying: true };
        case "SET_CURRENTINDEX":
            return { ...state, currentIndex: action.payload.tmp };
        case "ON_REPEATEMODE":
            return { ...state, isRepeat: true };
        case "OFF_REPEATEMODE":
            return { ...state, isRepeat: false };
        case "ON_RANDOMMODE":
            return { ...state, isRandom: true };
        case "OFF_RANDOMMODE":
            return { ...state, isRandom: false };
        case "IS_PAUSE":
            return { ...state, isPlaying: false };
        case "LOADING_FINISH":
            return { ...state, loading: false };
        case "PLAYING_SONG":
            return {
                ...state, playingSong: state.songs.filter((song) =>
                    song.id === action.payload.song.id),
            };
        case "RESET_SONG":
            return {
                ...state, playingSong: null, isPlaying: false
            }
        case "SET_PLAYLIST":
            state.songOfPlaylistPlaying = action.payload.newSong;
            return {
                ...state
            };
        case "UPLOAD_SONG":
            state.songs.push(action.payload.response.data.data.Songs);
            return { ...state}
        case "CREATE_ONE_PLAYLIST":
            state.playlists.push(action.payload.response.data.data.playlists);
            return { ...state};
        default:
            return state;
    }   
}
