import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './CountryDetail.css'
import { useOutletContext } from 'react-router-dom'
import { ThemeContext } from '../Context/ThemeContext'
import { useContext } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'
export default function CountryDetail() {
  const [isDark] = useTheme()
  console.log(isDark)


  const Params = useParams()

  const countryName = Params.country
  const location = useLocation()
  console.log(location.state)

  const [countryData, setCountry] = React.useState(null)
  const [notFound, setNotFound] = React.useState(false)
  console.log(countryData)
  function updateCountryData(data) {
    setCountry({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName||{})[0]?.common,
      population: data.population,
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      currencies: Object.values(data.currencies|| {})
        .map((currency) => currency.name)
        .join(', '),
      languages: Object.values(data.languages|| {}).join(', '),
      flag: data.flags.png,
      borders: [],
    })
    if (!data.borders) {
      data.borders = []
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => {
            return res.json()
          })
          .then(([borderCountry]) => borderCountry.name.common)
      }),
    ).then((borders) => {
      setCountry((preState) => ({
        ...preState,
        borders: borders,
      }))
    })
  }
  useEffect(() => {
    if (location.state) {
      updateCountryData(location.state)
      return
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((response) => response.json())
      .then(([data]) => {
        updateCountryData(data)
      })
      .catch((error) => {
        console.log(error)
        setNotFound(true)
      })
  }, [countryName])
  if (notFound) {
    return <h1>Country Not Found</h1>
  }
  return countryData === null ? (
    'loading.....'
  ) : (
    <main className={` ${isDark ? 'dark' : ''}`}>
    
      <a href="#" className="back-button" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
      </a>
      <div className="country-details">
        <img src={countryData.flag} alt={`${countryData.name} flag`} />
        <div className="details-text-container">
          <h1>{countryData.name}</h1>
          <div className="detail-text">
            <p>
              <b>Native Name: {countryData.nativeName|| countryData.name} </b>
              <span className="native-name"></span>
            </p>
            <p>
              <b>
                Population:{' '}
                {countryData.population.toLocaleString('en-US')}{' '}
              </b>{' '}
              <span className="population"></span>
            </p>
            <p>
              <b>Region:{countryData.region} </b>{' '}
              <span className="region"></span>
            </p>
            <p>
              <b>Sub Region: {countryData.subRegion} </b>{' '}
              <span className="sub-region"></span>
            </p>
            <p>
              <b>Capital: {countryData.capital?.join(',')}</b>
              <span className="capital"></span>
            </p>
            <p>
              <b>Top Level Domain: {countryData.tld} </b>{' '}
              <span className="top-level-domain"></span>
            </p>
            <p>
              <b>Currencies:{countryData.currencies} </b>{' '}
              <span className="currencies"></span>
            </p>
            <p>
              <b>Languages: {countryData.languages} </b>
              <span className="languages"></span>
            </p>
          </div>
          {countryData.borders.length !== 0 && (
            <div className="border-countries">
              <b>
                Border Countries:
                {countryData.borders.map((border) => (
                  <Link to={'/' + border} key={border}>
                    {' '}
                    {border}
                  </Link>
                ))}
              </b>
              &nbsp;
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
