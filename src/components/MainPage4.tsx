import { memo, useEffect, useState } from "react"
import { CityList, CityModel, getCityList, weathers } from "../data/cityData";

// Passing function as props => always re-render every City component
export const MainPage4 = (): JSX.Element => {
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

  const updateWeather = (name: string, population: number, area: number) => {
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
  };

  return (
    <div className="Main">
      {cities && cityNames.map((cityName) => 
        (
          <MemorizedCity 
            name={cities[cityName].name}
            population={cities[cityName].population}
            area={cities[cityName].area}
            weather={cities[cityName].weather}
            updateWeather={updateWeather}
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
  updateWeather: (name: string, population: number, area: number) => void;
}

export const City = ({ name, population, area, weather, updateWeather }: CityProps): React.ReactElement => {
  console.log(`${name} rendered!`)

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
      <button onClick={() => updateWeather(name, population, area)}>Update Weather</button>
    </div>
  );
}

export const MemorizedCity = memo(City);
