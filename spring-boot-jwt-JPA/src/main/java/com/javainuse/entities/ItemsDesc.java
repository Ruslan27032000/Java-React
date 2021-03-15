package com.javainuse.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "items_desc")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemsDesc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "taskText")
    private String taskText;

    @Column(name = "done")
    private boolean done;

    @ManyToOne(fetch = FetchType.EAGER)
    private Items items;

}
