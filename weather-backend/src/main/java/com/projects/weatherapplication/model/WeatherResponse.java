package com.projects.weatherapplication.model;

import lombok.Data;

@Data
public class WeatherResponse {

    private String city;
    private double temperature;
    private String description;
    private int humidity;
    private double windSpeed;
    private String icon;
}