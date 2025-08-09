import { useEffect, useState } from "react";
import TrackList from "./TrackList";

export default function App() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/tracks")
            .then((res) => res.json())
            .then((data) => setTracks(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="app">
            <h1>🎵 My Tracks</h1>
            <TrackList tracks={tracks} />
        </div>
    );
}