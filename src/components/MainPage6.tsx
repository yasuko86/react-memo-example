import { memo, useEffect, useState } from "react"
import sunnyIcon from '../sunny.svg';
import nightSunnyIcon from '../night-sunny.svg';
import { CityModel, getCityModelList } from "../data/cityData";

export interface Temperatures {
  [cityName: string]: number;
}

// City is not a pure component
export const MainPage6 = (): JSX.Element => {
  const [cities, setCities] = useState<CityModel[]>([]);

  useEffect(() => {
    setCities(getCityModelList());
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

  const showSunnyIcon = weather === "Sunny";

  // This block makes the component non-pure
  const currentTime = new Date();

  const dayTimeStart = new Date();
  dayTimeStart.setHours(5,0,0); // 5.00am
  const dayTimeEnd = new Date();
  dayTimeEnd.setHours(11,36,30); // 7.30 pm
  const dayTime: boolean = currentTime >= dayTimeStart && currentTime < dayTimeEnd

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
              <td>
                <span>{weather}</span>
                {showSunnyIcon && <img src={dayTime ? sunnyIcon : nightSunnyIcon} className="Icon-Weather" alt="logo" />}
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}

export const MemorizedCity = memo(City);
