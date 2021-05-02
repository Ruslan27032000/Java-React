package com.javainuse.lanes.card;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "card")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CardsModel {


    @Column(name = "lane_id")
    public String laneId;

    @Column(name = "title")
    public String title;

    @Column(name = "description")
    public String description;

    @Id
    @Column(name = "id")
    public String id;

}
