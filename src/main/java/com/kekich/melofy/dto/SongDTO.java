package com.kekich.melofy.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongDTO {

    private long songId;
    private String songName;
    private String artistName;

}
