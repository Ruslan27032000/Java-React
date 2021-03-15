package com.javainuse.controller;

import com.javainuse.config.JwtTokenUtil;
import com.javainuse.entities.Items;
import com.javainuse.entities.ItemsDesc;
import com.javainuse.services.ItemService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class HelloWorldController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private ItemService itemService;


    @GetMapping(value = "/allItems")
    public ResponseEntity<?> getAllItems(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        } else {
            System.out.println("JWT Token does not begin with Bearer String");
        }
        List<Items> items = itemService.getAllItems(username);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }


    @PostMapping(value = "/addItem")
    public ResponseEntity<?> addItem(HttpServletRequest request, @RequestBody Items item) {
        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        // JWT Token is in the form "Bearer token". Remove Bearer word and get
        // only the Token
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        } else {
            System.out.println("JWT Token does not begin with Bearer String");
        }
        item.setCreator(username);
        itemService.addItem(item);
        return ResponseEntity.ok(item);
    }

    @GetMapping(value = "/getDesc/{item_id}")
    public ResponseEntity<?> getDescById(@PathVariable(name = "item_id") Long id) {

        List<ItemsDesc> itemsDescs = itemService.getAllDescById(id);
        return new ResponseEntity<>(itemsDescs, HttpStatus.OK);
    }

    @PostMapping(value = "/addItemDesc")
    public ResponseEntity<?> addDesc(@RequestBody ItemsDesc desc) {
        itemService.addDescItem(desc);
        return ResponseEntity.ok(desc);
    }

    @DeleteMapping(value = "/deleteItem/{item_id}")
    public ResponseEntity<?> deleteDescById(@PathVariable(name = "item_id") Long id) {
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping(value = "/search")
    public ResponseEntity<?> searchItemByName(HttpServletRequest request,@RequestParam(name = "name", defaultValue = "") String name) {
        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        } else {
            System.out.println("JWT Token does not begin with Bearer String");
        }
//        List<Items> items;
//        if (name.equals("")) {
//            items = itemService.getAllItems();
//        } else {
//            items = itemService.searchItem(name);
//        }
        ArrayList<Items> items = new ArrayList<Items>();
        for (Items item : itemService.getAllItems(username)) {
            if (item.getName().toLowerCase().contains(name.toLowerCase())) {
                items.add(item);
            }
        }
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

}