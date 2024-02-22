export interface CityModel {
  name: string;
  population: number;
  area: number;
  weather: string;
}

export const weathers: string[] = ["Sunny", "Cloudy", "Rainy"]

export const getCityModelList = (): CityModel[] => {
  const sydney: CityModel = {
    name: "Sydney",
    population: 5297089,
    area: 12367,
    weather: "Sunny"
  };
  const melbourne: CityModel = {
    name: "Melbourne",
    population: 5031195,
    area: 9993,
    weather: "Sunny"
    //weather: weathers[Math.floor(Math.random() * weathers.length)]
  };
  const brisbane: CityModel = {
    name: "Brisbane",
    population: 2628083,
    area: 15842,
    weather: "Sunny"
    //weather: weathers[Math.floor(Math.random() * weathers.length)]
  }

  return [sydney, melbourne, brisbane]
}

export interface CityList {
  [cityName: string]: CityModel;
}

export const getCityList = (): CityList => {
  const sydney: CityModel = {
    name: "Sydney",
    population: 5297089,
    area: 12367,
    weather: weathers[Math.floor(Math.random() * weathers.length)]
  };
  const melbourne: CityModel = {
    name: "Melbourne",
    population: 5031195,
    area: 9993,
    weather: weathers[Math.floor(Math.random() * weathers.length)]
  };
  const brisbane: CityModel = {
    name: "Brisbane",
    population: 2628083,
    area: 15842,
    weather: weathers[Math.floor(Math.random() * weathers.length)]
  }

  return {"Sydney": sydney, "Melbourne": melbourne, "Brisbane": brisbane}
}