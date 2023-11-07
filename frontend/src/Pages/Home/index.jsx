import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';

function Home() {
    const [countrySelected, setCountrySelected] = useState(null);
    const [countries, setCountries] = useState([]);



    const getCountriesSelect = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/countries`)
        setCountries([{ id: '111', countryName: '------' }, ...data])
    }

    const handleChange = (value) => {
        if (value === '111') return setCountrySelected(null)
        const d = countries.find(x => x.id === value)
        setCountrySelected(d)
    }

    const renderCountryName = () => {
        if (countrySelected) {
            if (countrySelected.id === '111') {
                return {
                    countryName: '------',
                    visibility: 'hidden'
                }
            }
            return {
                countryName: countrySelected.countryName,
                visibility: 'visible'
            }
        }


        return {
            countryName: '------',
            visibility: 'hidden'
        }
    }

    useEffect(() => {
        getCountriesSelect()
    }, [])

    useEffect(() => {
        const lcNewData = localStorage.getItem('newData');
        if (lcNewData) {
            const newData = JSON.parse(lcNewData)
            setCountrySelected(newData)
        }
        localStorage.removeItem('newData')
    }, [])



    return (
        <>
            <div className="App">
                <Header title="Country Information" />

                <div className="select-container">
                    <label>Choose a country: </label>
                    <select value={countrySelected && countrySelected.id} onChange={(e) => handleChange(e.target.value)}>
                        {countries.map(x => (
                            <>
                                <option value={x.id}>{x.countryName}</option>
                            </>
                        ))}
                    </select>
                </div>

                {countrySelected && <div className="info-container">
                    <div style={{ visibility: renderCountryName().visibility }}>
                        <h2>{renderCountryName().countryName}</h2>
                    </div>

                    <div className="country-data">
                        <div className="country-data_table">
                            <table>
                                <thead>
                                    <th>Country</th>
                                    <th>{countrySelected.countryName}</th>
                                </thead>
                                <tr>
                                    <td>President/Leader</td>
                                    <td>{countrySelected.presidentName}</td>
                                </tr>
                                <tr>
                                    <td>Continent</td>
                                    <td>{countrySelected.continent}</td>
                                </tr>
                                <tr>
                                    <td>Capital</td>
                                    <td>{countrySelected.capital}</td>
                                </tr>
                                <tr>
                                    <td>Largest City</td>
                                    <td>{countrySelected.largestCity}</td>
                                </tr>
                                <tr>
                                    <td>Oficial Language</td>
                                    <td>{countrySelected && countrySelected.oficialLanguage.join(', ')}</td>
                                </tr>
                                <tr>
                                    <td>Demonym</td>
                                    <td>{countrySelected.demonym}</td>
                                </tr>
                                <tr>
                                    <td>Population</td>
                                    <td>{countrySelected.population}</td>
                                </tr>
                                <tr>
                                    <td>Currency</td>
                                    <td>{countrySelected.currency}</td>
                                </tr>
                                <tr>
                                    <td>Calling Code</td>
                                    <td>{countrySelected.callingCode}</td>
                                </tr>
                                <tr>
                                    <td>Internet TLD</td>
                                    <td>{countrySelected.internetTld}</td>
                                </tr>
                            </table>
                        </div>

                        <div className="country-data_flag">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/Images/${countrySelected.flag}`} alt="" />
                        </div>
                    </div>

                    <div className="country-photos">
                        <div className="country-photo">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/Images/${countrySelected.countryMap}`} alt="" />

                        </div>
                        <div className="country-photo">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/Images/${countrySelected.presidentImage}`} alt="" />

                        </div>
                        <div className="country-photo">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/Images/${countrySelected.coatOfArms}`} alt="" />
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default Home;
