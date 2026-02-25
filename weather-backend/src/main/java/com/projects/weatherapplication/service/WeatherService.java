package com.projects.weatherapplication.service;
import com.projects.weatherapplication.model.ForecastResponse;
import com.projects.weatherapplication.model.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherResponse getWeatherByCity(String city) {

        String url = "https://api.openweathermap.org/data/2.5/weather?q="
                + city + "&appid=" + apiKey + "&units=metric";

        Map<String, Object> response =
                restTemplate.getForObject(url, Map.class);

        Map<String, Object> main =
                (Map<String, Object>) response.get("main");

        Map<String, Object> wind =
                (Map<String, Object>) response.get("wind");

        List<Map<String, Object>> weatherList =
                (List<Map<String, Object>>) response.get("weather");

        Map<String, Object> weatherDetails = weatherList.get(0);

        WeatherResponse weather = new WeatherResponse();
        weather.setCity((String) response.get("name"));
        weather.setTemperature(
                Double.parseDouble(main.get("temp").toString()));
        weather.setHumidity(
                Integer.parseInt(main.get("humidity").toString()));
        weather.setWindSpeed(
                Double.parseDouble(wind.get("speed").toString()));
        weather.setDescription(
                (String) weatherDetails.get("description"));
        weather.setIcon(
                (String) weatherDetails.get("icon"));

        return weather;
    }
    public List<ForecastResponse> getFiveDayForecast(String city) {

        String url = "https://api.openweathermap.org/data/2.5/forecast?q="
                + city + "&appid=" + apiKey + "&units=metric";

        Map<String, Object> response =
                restTemplate.getForObject(url, Map.class);

        List<Map<String, Object>> list =
                (List<Map<String, Object>>) response.get("list");

        List<ForecastResponse> forecastList = new ArrayList<>();

        for (int i = 0; i < list.size(); i += 8) {

            Map<String, Object> item = list.get(i);
            Map<String, Object> main =
                    (Map<String, Object>) item.get("main");

            List<Map<String, Object>> weather =
                    (List<Map<String, Object>>) item.get("weather");

            ForecastResponse forecast = new ForecastResponse();
            forecast.setDate((String) item.get("dt_txt"));
            forecast.setTemperature(
                    Double.parseDouble(main.get("temp").toString()));
            forecast.setDescription(
                    (String) weather.get(0).get("description"));
            forecast.setIcon(
                    (String) weather.get(0).get("icon"));

            forecastList.add(forecast);
        }

        return forecastList;
    }
}