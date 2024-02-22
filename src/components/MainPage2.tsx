import { memo, useEffect, useState } from "react"
import { CityModel, getCityModelList } from "../data/cityData"

// Passing Object as props => always re-render every City component
export const MainPage2 = (): JSX.Element => {
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
            city={city}
          />
        )
      )}
      <button className = "MainButton" onClick={update}>Update</button>
    </div>
  );
}

interface CityProps {
  city: CityModel;
}

export const City = ({ city }: CityProps): React.ReactElement => {
  const { name, population, area, weather } = city;
  
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
