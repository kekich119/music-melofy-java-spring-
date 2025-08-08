package com.kekich.melofy.service;

import com.kekich.melofy.model.Track;
import com.kekich.melofy.repository.TrackRepository;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;
import java.util.List;

@Service
public class TrackService {

    private final TrackRepository repo;

    public TrackService(TrackRepository repo) {
        this.repo = repo;
    }

    public String getIconUrl(long id) {
        return repo.findById(id)
                .map(track -> {
                    String fileName = Paths.get(track.getIcon_url()).getFileName().toString();
                    return "http://localhost:8080/files/" + fileName; // полный путь
                })
                .orElse(null);
    }

    public List<Track> getAllTracks() {
        return repo.findAll();
    }


}
