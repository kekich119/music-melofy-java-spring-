import React, { useEffect, useState } from "react";

export default function SpotifyClone() {
    const [search, setSearch] = useState("");
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/tracks")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки");
                return res.json();
            })
            .then((data) => {
                setTracks(data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Фильтрация треков по названию или артисту
    const filteredTracks = tracks.filter(
        (track) =>
            track.track_name.toLowerCase().includes(search.toLowerCase()) ||
            track.artist.toLowerCase().includes(search.toLowerCase())
    );

    // icon_url из выбранного трека или из первого в списке (для иконки в сайдбаре)
    const iconUrl = selectedTrack?.icon_url || (tracks.length > 0 ? tracks[0].icon_url : "");

    return (
        <div className="app">
            <aside className="sidebar">
                <div className="logo">
                    {iconUrl && (
                        <img
                            src={iconUrl}
                            alt="Иконка Melofy"
                            style={{ width: 32, height: 32, marginRight: 8, verticalAlign: "middle" }}
                        />
                    )}
                    Melofy
                </div>
                <nav className="menu">
                    <a href="#home" className="menu-item active">
                        Главная
                    </a>
                    <a href="#search" className="menu-item">
                        Поиск
                    </a>
                    <a href="#library" className="menu-item">
                        Ваша библиотека
                    </a>
                </nav>
            </aside>

            <div className="main-content">
                <header className="header">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Искать..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Поиск"
                    />
                </header>

                <main className="albums-section">
                    {!selectedTrack ? (
                        <div className="albums-grid">
                            {filteredTracks.length ? (
                                filteredTracks.map((track) => (
                                    <div
                                        key={track.id}
                                        className="album-card"
                                        onClick={() => setSelectedTrack(track)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Открыть трек ${track.track_name}`}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") setSelectedTrack(track);
                                        }}
                                    >
                                        <img
                                            src={track.icon_url}
                                            alt={`Обложка трека ${track.track_name}`}
                                            loading="lazy"
                                        />
                                        <div className="album-info">
                                            <h3>{track.track_name}</h3>
                                            <p>{track.artist}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-results">Ничего не найдено</p>
                            )}
                        </div>
                    ) : (
                        <div className="album-detail">
                            <button
                                className="back-btn"
                                onClick={() => setSelectedTrack(null)}
                                aria-label="Назад к списку треков"
                            >
                                ← Назад
                            </button>

                            <div className="album-header">
                                <img src={selectedTrack.icon_url} alt={selectedTrack.track_name} />
                                <div>
                                    <h2>{selectedTrack.track_name}</h2>
                                    <h4>{selectedTrack.artist}</h4>
                                </div>
                            </div>

                            <p style={{ padding: "0 16px", fontSize: "1.1rem" }}>
                                Дополнительная информация о треке отсутствует.
                            </p>
                        </div>
                    )}
                </main>

                <footer className="footer-player">
                    <div className="player-info">
                        {selectedTrack ? (
                            <>
                                <img
                                    src={selectedTrack.icon_url}
                                    alt={selectedTrack.track_name}
                                    className="player-album-cover"
                                />
                                <div>
                                    <p className="player-track">Выбран трек:</p>
                                    <p className="player-album">{selectedTrack.track_name}</p>
                                </div>
                            </>
                        ) : (
                            <p>Выберите трек для прослушивания</p>
                        )}
                    </div>
                    <div className="player-controls">
                        <button aria-label="Предыдущий трек" disabled>
                            ⏮
                        </button>
                        <button aria-label="Воспроизвести/Пауза" disabled>
                            ▶️
                        </button>
                        <button aria-label="Следующий трек" disabled>
                            ⏭
                        </button>
                    </div>
                </footer>

            </div>

            {/* CSS стили из твоего кода — можно вставить сюда как есть */}
            <style>{`
       
* {
    box-sizing: border-box;
}
body, html, #root, .app {
    margin: 0; padding: 0; height: 100%;
    font-family: "Spotify Circular", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #121212;
    color: #b3b3b3;
    display: flex;
    user-select: none;
}
.app {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
}

/* Сайдбар */
.sidebar {
    width: 220px;
    background-color: #000000;
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    gap: 36px;
    box-shadow: 2px 0 8px rgba(0,0,0,0.7);
}
.logo {
    color: #1db954;
    font-weight: 900;
    font-size: 1.8rem;
    user-select: none;
}
.menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.menu-item {
    color: #b3b3b3;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background-color 0.25s ease, color 0.25s ease;
    cursor: pointer;
    user-select: none;
}
.menu-item:hover,
.menu-item:focus {
    background-color: #1db954;
    color: #fff;
    outline: none;
}
.menu-item.active {
    color: #1db954;
    font-weight: 700;
}

/* Основная часть */
.main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #181818;
}

/* Хедер с поиском */
.header {
    padding: 20px 32px;
    border-bottom: 1px solid #282828;
    background-color: #181818;
    display: flex;
    justify-content: center;
}
.search-input {
    width: 100%;
    max-width: 600px;
    padding: 12px 20px;
    border-radius: 24px;
    border: none;
    background-color: #282828;
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: background-color 0.3s ease;
}
.search-input::placeholder {
    color: #b3b3b3;
}
.search-input:focus {
    background-color: #3e3e3e;
}

/* Секция с альбомами */
.albums-section {
    flex-grow: 1;
    padding: 28px 32px;
    overflow-y: auto;
}
.albums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
    gap: 22px;
}
.album-card {
    background-color: #181818;
    border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    user-select: none;
}
.album-card:hover,
.album-card:focus {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px #1db954aa;
    outline: none;
}
.album-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-bottom: 2px solid #1db954;
}
.album-info {
    padding: 12px 16px;
    text-align: center;
    color: #b3b3b3;
}
.album-info h3 {
    margin: 0 0 6px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
}
.album-info p {
    margin: 0;
    font-size: 0.9rem;
    color: #b3b3b3;
}
.no-results {
    color: #777;
    text-align: center;
    font-size: 1.2rem;
    margin-top: 60px;
    user-select: none;
}

/* Детали альбома */
.album-detail {
    max-width: 720px;
    margin: 0 auto;
    background-color: #181818;
    border-radius: 16px;
    padding: 36px 32px;
    box-shadow: 0 10px 30px #1db954aa;
    user-select: none;
    animation: fadeInUp 0.4s ease forwards;
}
.back-btn {
    background: none;
    border: none;
    color: #1db954;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    margin-bottom: 28px;
    transition: color 0.3s ease;
}
.back-btn:hover {
    color: #1ef95a;
}
.album-header {
    display: flex;
    gap: 24px;
    align-items: center;
    margin-bottom: 32px;
}
.album-header img {
    width: 180px;
    height: 180px;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 12px 30px #1db954aa;
    filter: drop-shadow(0 0 20px #1db954cc);
    transition: filter 0.3s ease;
}
.album-header h2 {
    margin: 0;
    font-size: 2.8rem;
    font-weight: 900;
    color: #1db954;
    text-shadow: 0 0 14px #1ef95a;
}
.album-header h4 {
    margin: 8px 0 0;
    font-weight: 600;
    color: #b3b3b3;
}
.track-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 3px solid #1db954;
}
.track-item {
    display: flex;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255 255 255 / 0.1);
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.25s ease;
}
.track-item:hover,
.track-item:focus {
    background-color: rgba(29, 185, 84, 0.15);
    outline: none;
}

/* Мини-плеер */
.footer-player {
    height: 80px;
    background-color: #181818;
    border-top: 1px solid #282828;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    color: #b3b3b3;
    user-select: none;
}
.player-info {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
}
.player-album-cover {
    width: 56px;
    height: 56px;
    border-radius: 6px;
    object-fit: cover;
    box-shadow: 0 0 10px #1db954cc;
}
.player-track {
    font-weight: 600;
    color: #fff;
    margin: 0;
}
.player-album {
    font-size: 0.9rem;
    color: #b3b3b3;
    margin: 0;
}
.player-controls {
    display: flex;
    gap: 24px;
    align-items: center;
}
.player-controls button {
    background: none;
    border: none;
    color: #b3b3b3;
    font-size: 1.6rem;
    cursor: not-allowed; /* Пока неактивные */
    transition: color 0.3s ease;
}
.player-controls button:hover:not(:disabled) {
    color: #1db954;
}

/* Анимация */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Скроллбар */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: #121212;
}
::-webkit-scrollbar-thumb {
    background-color: #1db954;
    border-radius: 4px;
}
      `}</style>
        </div>
    );
}