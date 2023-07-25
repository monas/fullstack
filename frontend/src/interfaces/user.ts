export interface UserInterface {
  id: number;
  created_at: string;
  email: string;
  email_verified_at: string;
  latest_weather?: LatestWeatherInterface;
  latitude: string;
  longitude: string;
  name: string;
  updated_at: string;
}

export interface WeatherSyncInterface {
  weather: LatestWeatherInterface;
}

export interface LatestWeatherInterface {
  conditions: WeatherConditionsInterface;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
}

export interface WeatherConditionsInterface {
  base: "stations";
  clouds: CloudsInterface;
  cod: number;
  coord: CoordsInterface;
  dt: number;
  id: number;
  main: MainInterface;
  name: string;
  snow?: DropsInterface;
  rain?: DropsInterface;
  sys: SysInterface;
  timezone: number;
  visibility: number;
  weather: WeatherDetailsInterface[];
  wind: WindInterface;
}

export interface CloudsInterface {
  all: number;
}

export interface CoordsInterface {
  lat: number;
  long: number;
}

export interface MainInterface {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface DropsInterface {
  "1h?": number;
  "3h?": number;
}

export interface SysInterface {
  sunrise: number;
  sunset: number;
}

export interface WindInterface {
  deg: number;
  gust: number;
  speed: number;
}

export interface WeatherDetailsInterface {
  id: number;
  main: string;
  description: string;
  icon: string;
}
