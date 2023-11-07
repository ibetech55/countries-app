import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router-dom';
import AccessModal from '../../Components/AccessModal';


const initialValues = {
    countryName: '',
    presidentName: '',
    continent: '',
    capital: '',
    largestCity: '',
    oficialLanguage: '',
    demonym: '',
    population: '',
    currency: '',
    callingCode: '',
    internetTld: '',
    flag: '',
    countryMap: '',
    presidentImage: '',
    coatOfArms: ''
}

const Admin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [countrySelected,] = useState(null);
    const [countries, setCountries] = useState([]);
    const [formValues, setFormValues] = useState(initialValues)
    const [addCountry, setAddCountry] = useState(false)
    const [openModal, setOpenModal] = useState(true)
    const [loading, setLoading] = useState(false);

    const getCountriesSelect = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/countries`)
        setData([...data])
        setCountries([{ id: '111', countryName: '------' }, ...data])
    }

    const handleChange = (value) => {
        if (value === '111') return setFormValues(initialValues)
        const d = countries.find(x => x.id === value)
        setFormValues({ ...d })
    }

    const handleFormValues = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        let formData = new FormData();
        // eslint-disable-next-line
        Object.entries(formValues).forEach(x => {
            if (x === 'flag' || x === 'countryMap' || x === 'presidentImage' || x === 'coatOfArms') {
                formData.append(x[0], x[1])

            } else {
                formData.set(x[0], x[1])
            }
        })
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/countries`, formData)
        window.localStorage.setItem('newData', JSON.stringify(data))

        setTimeout(function () {
            navigate('/')
        }, 2000)
    }

    const handleChangeFile = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.files[0] })
    }

    const handleAddCountry = () => {
        setFormValues(initialValues);
        setCountries([{ id: '111', countryName: '------' }])
        setAddCountry(true)
    }

    const handleCancelCountry = () => {
        setFormValues(initialValues);
        setCountries([{ id: '111', countryName: '------' }, ...data])
        setAddCountry(false)
    }

    useEffect(() => {
        getCountriesSelect()
    }, [])

    return (
        <>
            <div className='admin' style={openModal ? { height: '100vh', overflow: 'hidden' } : {}}>
                <Header title="View Country Information" />
                <div className="top-container">
                    <div className="select-container">
                        <label>Choose a country: </label>
                        <select disabled={addCountry} value={countrySelected && countrySelected.id} onChange={(e) => handleChange(e.target.value)}>
                            {countries.map(x => (
                                <>
                                    <option value={x.id}>{x.countryName}</option>
                                </>
                            ))}
                        </select>
                    </div>
                    <div className='buttons'>
                        {!addCountry && <button onClick={handleAddCountry}>Add Country</button>}
                        {addCountry && <button className="cancel-button" onClick={handleCancelCountry}>Cancel</button>}
                        {!addCountry && <button onClick={() => setAddCountry(true)}>Edit Country</button>}
                    </div>
                </div>


                <div className="country-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="countryName">Country Name</label>
                            <input disabled={!addCountry} type="text" id="countryName" name="countryName" value={formValues.countryName} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="presidentName">President Name</label>
                            <input disabled={!addCountry} type="text" id="presidentName" name="presidentName" value={formValues.presidentName} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="continent">Continent</label>
                            <select disabled={!addCountry} id="continent" name="continent" value={formValues.continent} onChange={handleFormValues}>
                                <option value="">---Select a continent---</option>
                                <option value="Africa">Africa</option>
                                <option value="Asia">Asia</option>
                                <option value="Australia">Australia</option>
                                <option value="Europe">Europe</option>
                                <option value="North America">North America</option>
                                <option value="South America">South America</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="capital">Capital</label>
                            <input disabled={!addCountry} type="text" id="capital" name="capital" value={formValues.capital} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="largestCity">Largest City</label>
                            <input disabled={!addCountry} type="text" id="largestCity" name="largestCity" value={formValues.largestCity} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="oficialLanguage">Oficial Language</label>
                            <input disabled={!addCountry} type="text" id="oficialLanguage" name="oficialLanguage" value={formValues.oficialLanguage} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="demonym">Demonym</label>
                            <input disabled={!addCountry} type="text" id="demonym" name="demonym" value={formValues.demonym} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="population">Population</label>
                            <input disabled={!addCountry} type="text" id="population" name="population" value={formValues.population} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="currency">Currency</label>
                            <input disabled={!addCountry} type="text" id="currency" name="currency" value={formValues.currency} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="callingCode">Calling Code</label>
                            <input disabled={!addCountry} type="text" id="callingCode" name="callingCode" value={formValues.callingCode} onChange={handleFormValues} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="internetTld">Internet TLD</label>
                            <input disabled={!addCountry} type="text" id="internetTld" name="internetTld" value={formValues.internetTld} onChange={handleFormValues} />
                        </div>
                        {addCountry &&
                            <>
                                <div className="form-control">
                                    <label htmlFor="flag">Select Flag</label>
                                    <input type="file" id="flag" name="flag" onChange={handleChangeFile} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="countryMap">Select Map Image</label>
                                    <input type="file" id="countryMap" name="countryMap" onChange={handleChangeFile} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="presidentImage">Select President Image</label>
                                    <input type="file" id="presidentImage" name="presidentImage" onChange={handleChangeFile} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="coatOfArms">Select Coat of Arms</label>
                                    <input type="file" id="coatOfArms" name="coatOfArms" onChange={handleChangeFile} />
                                </div>
                            </>}
                        <div class="form-submit">
                            <button type='submit'>Enter</button>
                        </div>
                    </form>
                </div>

            </div>
            <AccessModal visible={openModal} closeModal={() => setOpenModal(false)} />
            {loading && <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, height: '100vh', width: '100%', background: 'rgba(0,0,0,0.4)', overflow: 'hidden' }}>
            </div>}
        </>
    )
}

export default Admin