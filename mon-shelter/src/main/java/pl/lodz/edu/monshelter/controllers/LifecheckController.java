package pl.lodz.edu.monshelter.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LifecheckController {

    @GetMapping("/ping")
    public String ping() {
        return "Hello, I'm alive!";
    }

}
