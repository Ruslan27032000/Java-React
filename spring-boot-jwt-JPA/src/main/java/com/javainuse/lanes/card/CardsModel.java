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

    @Id
    @Column(name = "lane_id")
    public String laneId;

    @Column(name = "title")
    public String title;

    @Column(name = "description")
    public String description;

    @Column(name = "id", length = 3000)
    public String id;

}
