package com.projects.weatherapplication.controller;
import com.projects.weatherapplication.model.WeatherResponse;
import com.projects.weatherapplication.service.WeatherService;

import org.springframework.web.bind.annotation.*;
import com.projects.weatherapplication.model.ForecastResponse;
import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:5173")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public WeatherResponse getWeather(
            @RequestParam String city) {

        return weatherService.getWeatherByCity(city);
    }
    @GetMapping("/forecast")
    public List<ForecastResponse> getForecast(
            @RequestParam String city) {

        return weatherService.getFiveDayForecast(city);
    }
}