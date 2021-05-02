package com.javainuse.logs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.*;
import java.util.Date;

@Entity(name = "logs")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="type")
    public String type;

    @Column(name = "action")
    public String action;

    @Column(name = "date")
    public Date createDate;
}
