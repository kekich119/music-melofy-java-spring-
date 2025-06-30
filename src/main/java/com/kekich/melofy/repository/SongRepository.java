package com.kekich.melofy.repository;

import com.kekich.melofy.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    public Song findByName(String name);
}
