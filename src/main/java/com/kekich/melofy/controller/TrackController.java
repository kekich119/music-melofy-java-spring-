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


    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Path filePath = Paths.get("uploads").resolve(filename); // путь к папке с файлами
        Resource file = new FileSystemResource(filePath);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        // Определяем Content-Type по расширению
        MediaType mediaType;
        if (filename.toLowerCase().endsWith(".mp3")) {
            mediaType = MediaType.valueOf("audio/mpeg");
        } else if (filename.toLowerCase().endsWith(".png")) {
            mediaType = MediaType.IMAGE_PNG;
        } else if (filename.toLowerCase().endsWith(".jpg") || filename.toLowerCase().endsWith(".jpeg")) {
            mediaType = MediaType.IMAGE_JPEG;
        } else {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(file);
    }



}
