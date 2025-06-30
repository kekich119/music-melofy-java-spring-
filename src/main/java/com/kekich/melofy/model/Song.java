package com.kekich.melofy.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Song {
    @Id
    private long id;


    private String songName;

    private String artistName;

    public Song(String songName, String artistName) {
        this.songName = songName;
        this.artistName = artistName;
    }

    public Song() {
    }


}
