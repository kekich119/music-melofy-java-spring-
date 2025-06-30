package com.kekich.melofy.service;


import com.kekich.melofy.model.Song;
import com.kekich.melofy.repository.SongRepository;
import org.springframework.stereotype.Service;

@Service
public class SongService {
    private final SongRepository songRepository;


    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }


    public Song save(Song song) {
        return songRepository.save(song);
    }
}
