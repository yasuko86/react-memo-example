import { memo, useCallback, useEffect, useState } from "react"
import { CityList, CityModel, getCityList, weathers } from "../data/cityData";

// Passing only primitive values and memorized function as props => does not re-render City components unnecessarily
export const MainPage5 = (): JSX.Element => {
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [cities, setCities] = useState<CityList>({} as CityList)

  useEffect(() => {
    const cityData = getCityList();
    const names = Object.keys(cityData);
    setCities(cityData);
    setCityNames(names);
  }, [])

  const update = () => {
    const updatedCities = getCityList();
    setCities(updatedCities);
  };

  const updateWeatherWithCallback = useCallback((name: string, population: number, area: number) => {
    const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
    const updatedCity: CityModel = {
      name,
      population,
      area,
      weather: newWeather,
    }
    setCities((prevState) => ({
      ...prevState,
      [name]: updatedCity
    }));
  }, [])

  return (
    <div className="Main">
      {cities && cityNames.map((cityName) => 
        (
          <MemorizedCity 
            name={cities[cityName].name}
            population={cities[cityName].population}
            area={cities[cityName].area}
            weather={cities[cityName].weather}
            updateWeatherWithCallback={updateWeatherWithCallback}
            setCities={setCities}
          />
        )
      )}
      <button className = "MainButton" onClick={update}>Update</button>
    </div>
  );
}

interface CityProps {
  name: string;
  population: number;
  area: number;
  weather: string;
  updateWeatherWithCallback: (name: string, population: number, area: number) => void;
  setCities: (
    value: React.SetStateAction<CityList>
  ) => void;
}

export const City = ({ name, population, area, weather, updateWeatherWithCallback, setCities }: CityProps): React.ReactElement => {
  console.log(`${name} rendered!`)

  const updateWeatherWithSetState = () => {
    const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
    const updatedCity: CityModel = {
      name,
      population,
      area,
      weather: newWeather,
    }
    setCities((prevState) => ({
      ...prevState,
      [name]: updatedCity
    }));
  }

  return (
    <div className="City">
        <h2>{name}</h2>
        <table>
          <tbody>
            <tr>
              <th>Population</th>
              <td>{population.toLocaleString("en-AU")}</td>
            </tr>
            <tr>
              <th>Area</th>
              <td>{area} km2</td>
            </tr>
            <tr>
              <th>Weather</th>
              <td>{weather}</td>
            </tr>
          </tbody>
        </table>
      <button onClick={() => updateWeatherWithCallback(name, population, area)}>Update Weather with useCallback</button>
      <button onClick={updateWeatherWithSetState}>Update Weather with setState</button>
    </div>
  );
}

export const MemorizedCity = memo(City);
