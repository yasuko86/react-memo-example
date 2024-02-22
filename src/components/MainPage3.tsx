import { memo, useEffect, useState } from "react"
import { CityModel, getCityModelList } from "../data/cityData"

// Passing Object as props with custom equality check => does not re-render City components unnecessarily
export const MainPage3 = (): JSX.Element => {
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

// Custom equality check
const cityPropsAreEqual = (prevProp: CityProps, newProp: CityProps): boolean => {
  return prevProp.city.name === newProp.city.name
    && prevProp.city.population === newProp.city.population
    && prevProp.city.area === newProp.city.area 
    && prevProp.city.weather === newProp.city.weather;
}

export const MemorizedCity = memo(City, cityPropsAreEqual);
