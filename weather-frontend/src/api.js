import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/weather"
});

export const fetchCurrentWeather = (city) =>
  API.get(`/current?city=${city}`);

export const fetchForecast = (city) =>
  API.get(`/forecast?city=${city}`);