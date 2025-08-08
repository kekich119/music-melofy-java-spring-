import React, { useEffect, useState } from "react";

function TracksList() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/tracks") // твой эндпоинт в бэке
            .then(res => res.json())
            .then(data => setTracks(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Tracks</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        <img src={track.cover} alt={track.title} width={50} />
                        <strong>{track.title}</strong> – {track.artist} ({track.duration})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TracksList;