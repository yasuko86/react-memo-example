import { memo, useEffect, useState } from "react"
import { CityModel, getCityModelList } from "../data/cityData"

// Passing each city properties (primitive values) separately as props => does not re-render City components unnecessarily
export const MainPage = (): JSX.Element => {
  const [cities, setCities] = useState<CityModel[]>([])

  useEffect(() => {
    const cityData = getCityModelList();
    setCities(cityData);
  }, [])

  const update = () => {
    const updatedCities = getCityModelList();
    setCities(updatedCities);
  };

  return (
    <div className="Main">
      {cities.map((city) => 
        (
          <MemorizedCity 
            name={city.name}
            population={city.population}
            area={city.area}
            weather={city.weather}
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
}

export const City = ({ name, population, area, weather }: CityProps): React.ReactElement => {
  console.log(`${name} rendered!`)

  return (
    <div>
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
    </div>
  );
}

export const MemorizedCity = memo(City);
