package com.javainuse.repositories;


import com.javainuse.entities.ItemsDesc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public interface ItemDescRepository extends JpaRepository<ItemsDesc, Long> {
    List<ItemsDesc> getAllByItemsId(Long items_id);
}
