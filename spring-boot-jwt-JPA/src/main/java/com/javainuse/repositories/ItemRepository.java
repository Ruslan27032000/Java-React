package com.javainuse.repositories;


import com.javainuse.entities.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ItemRepository  extends JpaRepository<Items,Long> {

    List<Items> findByName(String firstName);

    List<Items> findByCreator(String creator);

}
