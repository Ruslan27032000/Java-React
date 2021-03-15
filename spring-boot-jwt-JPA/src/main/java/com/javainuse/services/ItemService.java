package com.javainuse.services;


import com.javainuse.entities.Items;
import com.javainuse.entities.ItemsDesc;

import java.util.List;

public interface ItemService {

    List<Items> getAllItems(String creator);
    Items addItem(Items item);

    List<ItemsDesc> getAllDescById(Long id);

    ItemsDesc addDescItem(ItemsDesc itemsDesc);

    void deleteItem(Long id);

    List<Items> searchItem(String name);



}
