package com.projects.weatherapplication.model;

import lombok.Data;

@Data
public class ForecastResponse {

    private String date;
    private double temperature;
    private String description;
    private String icon;
}