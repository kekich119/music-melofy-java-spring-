export default function TrackList({ tracks }) {
    return (
        <div className="track-list">
            {tracks.map((track) => (
                <div key={track.id} className="track-card">
                    <img
                        src={track.icon_url}
                        alt={track.track_name}
                        className="track-icon"
                    />
                    <div className="track-info">
                        <h3>{track.track_name}</h3>
                        <p>{track.artist}</p>
                        <audio controls>
                            <source src={track.track_url} type="audio/mpeg" />
                        </audio>
                    </div>
                </div>
            ))}
        </div>
    );
}