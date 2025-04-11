import axios from "axios";

const API_URL = "https://api.weatherapi.com/v1/current.json";
const API_KEY = import.meta.env.VITE_API_KEY;

export interface WeatherResponse {
    temp: number; // Температура
    condition: {
        text: string; // Описание погоды
    };
}

export const getCurrentWeather = async (city: string, lang: string) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: city,
                lang: lang
            }
        });

        const weatherData: WeatherResponse = {
            temp: lang === 'ru' ? response.data.current.temp_c : response.data.current.temp_f, // В зависимости от языка
            condition: response.data.current.condition
        };

        return weatherData;
    } catch (error) {
        console.error('Ошибка при получении погоды:', error);
    }
}