import React, { useState, useEffect } from 'react';
import './App.css';

const filterTable = (e, selectedCountry, setCountry) => {
  setCountry(e);
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setCountry] = useState(null);
  const [filtredList, setFiltredList] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all').then(data => data.json()).then((res) => setCountries(res));
  }, []);

  useEffect(() => {
    if (countries === null) return;
    setCountry(countries[0].name)
  }, [countries])

  useEffect(() => {
    if (!countries) return;
    const regionCountry = countries.find(country => country.name === selectedCountry).subregion;

    const countriesList = countries.filter(country => country.subregion === regionCountry);
    setFiltredList(countriesList)
  }, [selectedCountry]);

  return (
    (countries && <div>
      <select onChange={(e) => filterTable(e.target.value, selectedCountry, setCountry)} placeholder={'test'}>
        {countries && countries.map(({name}) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      <table>
        <tr>
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th>Area</th>
          <th>Currency</th>
        </tr>

        {filtredList && filtredList.map(({name, capital, population, area, currencies}) => <tr>
          <td>{name}</td>
          <td>{capital}</td>
          <td>{population}</td>
          <td>{area}</td>
          <td>
            <div className="currencies">
              {currencies[0].code}

              <div className="currencies__modal">
                <div>{currencies[0].name}</div>
                <div>{currencies[0].symbol}</div>
              </div>
            </div>
          </td>
        </tr>)}
      </table>
    </div>)
  );
}

export default App;
