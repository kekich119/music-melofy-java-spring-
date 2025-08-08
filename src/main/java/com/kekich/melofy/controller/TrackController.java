package com.kekich.melofy.controller;

import com.kekich.melofy.model.Track;
import com.kekich.melofy.service.TrackService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TrackController {


    private final TrackService trackService;

    TrackController(TrackService trackService) {
        this.trackService = trackService;
    }


    @GetMapping("/icon")
    public String postImage(){
        return trackService.getIconUrl(1);
    }

    @GetMapping("/tracks")
    public List<Track> getAllTracks() {
        return trackService.getAllTracks(); // Возвращаем список треков из БД
    }



}
