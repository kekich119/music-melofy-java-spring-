package com.kekich.melofy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Entity
@Table(name = "song")
public class Track {

    @jakarta.persistence.Id
    @Id  // <-- Здесь дублирование
    private long id;
    @Column(name = "track_name")
    private String track_name;

    private String artist;

    @Column(name = "icon_url")
    private String icon_url;

    private String track_url;
}