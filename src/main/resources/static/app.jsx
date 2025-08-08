// App.jsx
import React, {useState, useEffect} from "react";

const sampleAlbums = [
    {
        id: 1,
        title: "Магия Звука",
        artist: "DJ Cool",
        cover: "https://picsum.photos/200?random=1",
        tracks: [
            {id: 11, title: "Волшебный бит", duration: "3:45"},
            {id: 12, title: "Ночная прогулка", duration: "4:20"},
        ],
    },
    {
        id: 2,
        title: "Летний Ветер",
        artist: "The Breeze",
        cover: "https://picsum.photos/200?random=2",
        tracks: [
            {id: 21, title: "Солнечный день", duration: "3:12"},
            {id: 22, title: "Вечер на пляже", duration: "5:01"},
        ],
    },
    // Добавь ещё альбомы...
];

export default function App() {
    const [albums, setAlbums] = useState(sampleAlbums);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [search, setSearch] = useState("");

    // Фильтрация по поиску (альбомы + треки)
    const filteredAlbums = albums
        .map((album) => ({
            ...album,
            tracks: album.tracks.filter((t) =>
                t.title.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter(
            (album) =>
                album.title.toLowerCase().includes(search.toLowerCase()) ||
                album.artist.toLowerCase().includes(search.toLowerCase()) ||
                album.tracks.length > 0
        );

    return (
        <div className="app">
            <header>
                <h1>Музыкальный плеер</h1>
                <input
                    type="search"
                    placeholder="Искать альбом, исполнителя или трек..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </header>

            <main>
                {!selectedAlbum && (
                    <section className="album-list">
                        {filteredAlbums.length ? (
                            filteredAlbums.map((album) => (
                                <div
                                    key={album.id}
                                    className="album-card"
                                    onClick={() => setSelectedAlbum(album)}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`Открыть альбом ${album.title} исполнителя ${album.artist}`}
                                >
                                    <img src={album.cover} alt={`${album.title} обложка`}/>
                                    <div className="album-info">
                                        <h3>{album.title}</h3>
                                        <p>{album.artist}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>По вашему запросу ничего не найдено</p>
                        )}
                    </section>
                )}

                {selectedAlbum && (
                    <section className="album-details">
                        <button onClick={() => setSelectedAlbum(null)} className="back-btn">
                            ← Назад к альбомам
                        </button>
                        <div className="album-header">
                            <img src={selectedAlbum.cover} alt={`${selectedAlbum.title} обложка`}/>
                            <div>
                                <h2>{selectedAlbum.title}</h2>
                                <h4>{selectedAlbum.artist}</h4>
                            </div>
                        </div>
                        <ul className="track-list">
                            {selectedAlbum.tracks.length ? (
                                selectedAlbum.tracks.map((track) => (
                                    <li key={track.id} className="track-item">
                                        <span>{track.title}</span>
                                        <span>{track.duration}</span>
                                    </li>
                                ))
                            ) : (
                                <li>Нет треков по вашему запросу</li>
                            )}
                        </ul>
                    </section>
                )}
            </main>

            <footer>© 2025 Твой Музыкальный Плеер</footer>


            <style>{`
  * {
    box-sizing: border-box;
  }
  body, html, #root, .app {
    margin: 0; padding: 0; height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #121212; /* глубокий чёрный */
    color: #ddd;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  header {
    padding: 18px 24px;
    background-color: #1f1f1f; /* чуть светлее для шапки */
    box-shadow: 0 2px 8px rgba(100, 86, 180, 0.3);
    position: sticky;
    top: 0;
    z-index: 100;
    user-select: none;
  }
  header h1 {
    margin: 0 0 10px;
    font-weight: 700;
    font-size: 2.4rem;
    color: #a78aff; /* мягкий фиолетовый акцент */
  }
  .search-input {
    width: 100%;
    max-width: 480px;
    padding: 10px 18px;
    border-radius: 40px;
    border: none;
    font-size: 1rem;
    outline: none;
    background-color: #292929;
    color: #ccc;
    transition: background-color 0.25s ease;
  }
  .search-input::placeholder {
    color: #7f7f9a;
  }
  .search-input:focus {
    background-color: #3b2f5c;
    color: #eee;
  }
  main {
    flex-grow: 1;
    padding: 24px 40px;
    overflow-y: auto;
  }
  .album-list {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
    gap: 18px;
  }
  .album-card {
    background-color: #1e1e1e;
    border-radius: 14px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(120, 90, 200, 0.15);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: column;
    user-select: none;
  }
  .album-card:hover, .album-card:focus {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(120, 90, 200, 0.4);
    outline: none;
  }
  .album-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-bottom: 2px solid #9578c4; /* лёгкий фиолетовый акцент */
  }
  .album-info {
    padding: 12px 16px;
    text-align: center;
  }
  .album-info h3 {
    margin: 0 0 4px;
    font-weight: 700;
    font-size: 1.1rem;
    color: #b9a8d9;
  }
  .album-info p {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: #9999aa;
  }
  .album-details {
    max-width: 650px;
    margin: 0 auto;
    background-color: #1f1f1f;
    border-radius: 16px;
    padding: 28px 32px;
    box-shadow: 0 10px 30px rgba(110, 85, 190, 0.25);
    user-select: none;
    animation: fadeInUp 0.4s ease forwards;
  }
  .back-btn {
    background: none;
    border: none;
    color: #b9a8d9;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 20px;
    transition: color 0.25s ease;
  }
  .back-btn:hover {
    color: #d1c4ff;
  }
  .album-header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 28px;
  }
  .album-header img {
    width: 160px;
    height: 160px;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 5px 15px rgba(130, 100, 220, 0.3);
  }
  .album-header h2 {
    margin: 0;
    font-size: 2.4rem;
    font-weight: 800;
    color: #c6b8ff;
  }
  .album-header h4 {
    margin: 8px 0 0;
    font-weight: 500;
    color: #a8a0bf;
  }
  .track-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 2px solid #9578c4;
  }
  .track-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(255 255 255 / 0.08);
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }
  .track-item:hover {
    background-color: rgba(145, 120, 220, 0.15);
  }
  footer {
    text-align: center;
    padding: 16px;
    font-size: 0.9rem;
    background-color: #1a1a1a;
    color: #8888aa;
    user-select: none;
    box-shadow: 0 -2px 6px rgba(100, 90, 170, 0.25);
  }
  @keyframes fadeInUp {
    from {opacity: 0; transform: translateY(15px);}
    to {opacity: 1; transform: translateY(0);}
  }
`}</style>
        </div>
    );
}