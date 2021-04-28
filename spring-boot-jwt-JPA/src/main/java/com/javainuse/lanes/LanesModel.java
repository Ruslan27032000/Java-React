package com.javainuse.lanes;

import com.javainuse.lanes.card.CardsModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;

@Entity(name = "lanes")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LanesModel {
    @Id
    @Column(name = "id")
    public String id;

    @Column(name = "title")
    public String title;

    @OneToMany(fetch = FetchType.LAZY)
    public List<CardsModel> cards;
}
