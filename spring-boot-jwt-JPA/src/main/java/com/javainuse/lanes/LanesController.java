package com.javainuse.lanes;

import com.javainuse.lanes.card.CardRepository;
import com.javainuse.lanes.card.CardsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value = "/trello")
public class LanesController {

    @Autowired
    private LanesRepository lanesRepository;

    @Autowired
    private CardRepository cardRepository;

    @PostMapping(value = "/change")
    public ResponseEntity<?> changeItems(@RequestBody List<LanesModel> lanes) {
        cardRepository.deleteAll();
        lanesRepository.deleteAll();
        for (int i = 0; i < lanes.size(); i++) {
            if (lanes.get(i).getCards().size() != 0) {
                for (int j = 0; j < lanes.get(i).getCards().size(); j++) {
                    cardRepository.save(lanes.get(i).getCards().get(j));
                }
            }
            lanesRepository.save(lanes.get(i));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAll() {
        List<LanesModel> lanes = lanesRepository.findAll();
        return new ResponseEntity<>(lanes, HttpStatus.OK);
    }
}
