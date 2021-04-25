package com.javainuse.services.impl;


import com.javainuse.entities.Items;
import com.javainuse.entities.ItemsDesc;
import com.javainuse.repositories.ItemDescRepository;
import com.javainuse.repositories.ItemRepository;
import com.javainuse.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {


    @Autowired
    private ItemRepository itemRepository;


    @Override
    public List<Items> getAllItems(String creator) {
        return itemRepository.findByCreator(creator);
    }

    @Override
    public Items addItem(Items item) {
        return itemRepository.save(item);
    }

    @Autowired
    private ItemDescRepository itemDescRepository;

    @Override
    public List<ItemsDesc> getAllDescById(Long id) {
        return itemDescRepository.getAllByItemsId(id);
    }

    @Override
    public ItemsDesc addDescItem(ItemsDesc itemsDesc) {
        return itemDescRepository.save(itemsDesc);
    }

    @Override
    public void deleteItem(Long id) {
        Optional<ItemsDesc> opt = itemDescRepository.findById(id);
        if (opt.isPresent()) {
            ItemsDesc itemsDesc = opt.get();
            itemDescRepository.delete(itemsDesc);
        }
    }

    @Override
    public List<Items> searchItem(String name) {
        return itemRepository.findByName(name);
    }

    @Override
    public List<ItemsDesc> getALlDesc() {
        return itemDescRepository.findAll();
    }
}
