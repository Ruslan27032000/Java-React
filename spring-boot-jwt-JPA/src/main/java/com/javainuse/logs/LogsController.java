package com.javainuse.logs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value = "/trello")
public class LogsController {

    @Autowired
    private LogsRepository logsRepository;

    @PostMapping(value = "/createLog")
    public ResponseEntity<?> createLog(@RequestBody LogsModel logsModel) {
        logsRepository.save(logsModel);
        return new ResponseEntity<>(logsModel, HttpStatus.OK);
    }

    @GetMapping(value="/allLogs")
    public ResponseEntity<?> getLogs(){
        List<LogsModel> logsModelList = (List<LogsModel>) logsRepository.findAllByOrderByCreateDateDesc();
        return new ResponseEntity<>(logsModelList, HttpStatus.OK);
    }
}
