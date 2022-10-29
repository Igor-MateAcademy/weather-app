export interface LatLon {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  coord: LatLon;
  country: string;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface CloudsData {
  all: number;
}

export interface RainData {
  '3h': number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust: number;
}

export interface MainData {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

export interface SysData {
  pod: 'n' | 'd';
}

export interface WeatherAtCurrentPoint {
  id: number;
  main: string;
  description: string;
}

export interface WeatherData {
  clouds: CloudsData;
  dt: number;
  dt_txt: string;
  main: MainData;
  pop: number;
  rain: RainData;
  sys: SysData;
  visibility: number;
  wind: WindData;
  weather: WeatherAtCurrentPoint[];
}

export interface CityWeather {
  city: City;
  list: WeatherData[];
  lat: number;
  lon: number;
}

export interface ForecastData {
  name: string;
  date: moment.Moment;
  humidity: number;
  degrees: number;
  sys: 'n' | 'd';
  wind: Omit<WindData, 'deg'>;
  clouds: number;
  weather: WeatherAtCurrentPoint;
  visibility: number;
}
