import React, { useContext, useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import axios from 'axios';

import UserContext from '../context/UserContext'
import CountriesContext from '../context/CountriesContext'

import countriesOptions from '../countriesOptions'

import WorldMap from './WorldMap';

// (() => {
//   countries.forEach((country) => {
//     let current = country.n.length
//     if (current > longest) {
//       longest = current
//       longestName = country.n
//     }
//   })
// })()

const years = [];

// populate years array
(() => {
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i > 1900; i--) {
    years.push(i)
  }
})()

const plusIcon = (
  <svg id="Layer_1" className="stroke-current stroke-1 fill-current w-5 h-5" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g>
      <g id="Icon-Plus" transform="translate(28.000000, 278.000000)">
        <path d="M4-222.1c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9s23.9,10.7,23.9,23.9     C27.9-232.8,17.2-222.1,4-222.1L4-222.1z M4-267.3c-11.7,0-21.3,9.6-21.3,21.3s9.6,21.3,21.3,21.3s21.3-9.6,21.3-21.3     S15.7-267.3,4-267.3L4-267.3z" id="Fill-38" />
        <polygon id="Fill-39" points="-8.7,-247.4 16.7,-247.4 16.7,-244.6 -8.7,-244.6    " />
        <polygon id="Fill-40" points="2.6,-258.7 5.4,-258.7 5.4,-233.3 2.6,-233.3    " />
      </g>
    </g>
  </svg>
)

const minusIcon = (
  <svg id="Layer_2" className="stroke-current stroke-1 fill-current w-5 h-5" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g>
      <g id="Icon-Minus" transform="translate(78.000000, 278.000000)">
        <path d="M-45.9-222.1c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9S-22-259.3-22-246.1     C-22-232.9-32.7-222.1-45.9-222.1L-45.9-222.1z M-45.9-267.4c-11.7,0-21.3,9.6-21.3,21.3c0,11.7,9.6,21.3,21.3,21.3     s21.3-9.6,21.3-21.3C-24.6-257.8-34.2-267.4-45.9-267.4L-45.9-267.4z" id="Fill-41" />
        <polygon id="Fill-42" points="-58.7,-247.5 -33.2,-247.5 -33.2,-244.7 -58.7,-244.7    " />
      </g>
    </g>
  </svg>
)

const crossIcon = (
  <svg id="Layer_3" className="stroke-current stroke-1 fill-current w-5 h-5" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g>
      <g id="Icon-Close-O" transform="translate(378.000000, 278.000000)">
        <path d="M-345.9-222.1c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9     c13.2,0,23.9,10.7,23.9,23.9C-322-232.9-332.7-222.1-345.9-222.1L-345.9-222.1z M-345.9-267.4c-11.7,0-21.3,9.6-21.3,21.3     c0,11.7,9.6,21.3,21.3,21.3s21.3-9.6,21.3-21.3C-324.6-257.8-334.2-267.4-345.9-267.4L-345.9-267.4z" id="Fill-52" />
        <polyline id="Fill-53" points="-356.3,-233.8 -358.2,-235.7 -335.6,-258.3 -333.7,-256.4 -356.3,-233.8    " />
        <polyline id="Fill-54" points="-335.6,-233.8 -358.2,-256.4 -356.3,-258.3 -333.7,-235.7 -335.6,-233.8    " />
      </g>
    </g>
  </svg>
)

const EditMap = () => {
  const { userData } = useContext(UserContext)
  const { countries, setCountries } = useContext(CountriesContext)

  const [duplicateCountries, setDuplicateCountries] = useState(false);
  const backendDuplicatesDefault = { duplicates: [], write_success: null }
  const [backendDuplicates, setBackendDuplicates] = useState(backendDuplicatesDefault);

  const clearBackendErrors = () => setBackendDuplicates(backendDuplicatesDefault)

  useEffect(() => (
    checkCountriesUniqueLogic()
  ))

  const { register, control, handleSubmit, watch, errors, reset } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entry" // name for field array
  });

  const watchCountries = watch(["entry"])

  const onSubmit = async formData => {
    clearBackendErrors()
    // return if form is empty
    if (Object.keys(formData).length === 0) return
    // return if duplicate values in form
    if (duplicateCountries) return

    let countriesRes = [];
    try {
      countriesRes = await axios.post('/map/',
        formData.entry,
        {
          headers: {
            'x-access-token': localStorage.getItem("auth-token")
          }
        });
      console.log("THIS IS THE COUNTRIES RES:")
      console.log(countriesRes.data)
      countriesRes = countriesRes.data
      reset()
    } catch (err) {
      // TODO proper error action
      console.log('ERROR HERE')
      console.log(err.response.data)
    }

    if (!countriesRes.write_success && countriesRes.duplicates && countriesRes.duplicates.length !== 0) {
      console.log('WE ARE HERE BECAUSE IT WAS ALL DUPLICATE')
      setBackendDuplicates({ duplicates: countriesRes.duplicates, write_success: false })
      // renderError("No countries were added as they are already on your map.", true)
    } else if (countriesRes.write_success && countriesRes.duplicates && countriesRes.duplicates.length !== 0) {
      console.log('WE ARE HERE BECAUSE THERE WERE THINGS WRITTEN BUT THERE ARE DUPLICATES')
      setBackendDuplicates({ duplicates: countriesRes.duplicates, write_success: true })
      // const duplicatesString = backendDuplicates.join(", ")
      // renderError(`Some countries were added, but the following are already on your map: ${duplicatesString}`, true, true)
      fetchCountries()
    }
    // if the api response has write_success = true, refetch countries and add to context
    else if (countriesRes.write_success) {
      setBackendDuplicates({ duplicates: [], write_success: true })
      console.log('WE ARE HERE BECAUSE EVERTHING WROTE')
      fetchCountries()
    }
  }

  const onDeleteCountry = async (kickedCountry) => {
    try {
      await axios.delete(`/map/${kickedCountry}`, {
        headers: {
          'x-access-token': localStorage.getItem("auth-token")
        }
      });
      // filter removed country from context
      const newCountries = countries.filter((country) => country.country_code !== kickedCountry)
      setCountries(newCountries)
    } catch (err) {
      // TODO add error for bottom countries section
      console.log('NO BUENO')
      console.log(err.response.data)
    }
  }

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`/map/${userData.user.user_id}`)
      setCountries(res.data)
    } catch (err) {
      // TODO add error for bottom countries section
      console.log(err.response.data)
    }
  }

  const checkCountriesUniqueLogic = () => {
    if (watchCountries.entry) {
      // create array from countries object array
      let countryArray = watchCountries.entry.map((item) => item.country)
      // map over array to remove unselected fields
      countryArray = countryArray.filter((item) => item !== "Country")
      // check if there are duplicates
      const checkDuplicates = new Set(countryArray).size !== countryArray.length
      // update state
      return checkDuplicates ? setDuplicateCountries(true) : setDuplicateCountries(false)
    }
  }

  const renderCountriesList = () => {
    return countries.map((country) => {
      return (
        <div className="flex p-2 mt-1 mx-1 border-2 border-gray-600 rounded" key={country.country_code}>
          <div className="flex-1">
            <div className="font-bold">{country.country}</div>
            <div className="text-sm">
              {country.year_visited === 0 ? "" : ""}
              {country.year_visited === 1 ? "Birthplace" : ""}
              {country.year_visited > 1 ? country.year_visited : ""}
            </div>
          </div>
          <div className="flex-none flex">
            <button className="m-auto" onClick={() => onDeleteCountry(country.country_code)}>
              {crossIcon}
            </button>
          </div>
        </div>
      );
    })
  }

  const renderError = (errorText, closeFunction, alert) => {

    return (
      <>
        <div className={"flex px-2 py-1 mb-2 " + (alert ? "bg-yellow-200 text-yellow-700" : "bg-red-200 text-red-700")}>
          <div className="flex-1 leading-tight">
            <div>{errorText}</div>
          </div>
          {
            closeFunction ? <div className="flex-none flex">
              <button className="m-auto" onClick={() => closeFunction()}>
                {crossIcon}
              </button>
            </div> :
              ""
          }
        </div>
      </>
    )
  }

  const renderNoCountryError = () => {
    // if no errors, exit function
    if (!errors.entry) return
    // checks for countrySelected errors in the entry array
    const errorDetected = errors.entry.some((entry) => {
      return entry.country.type == "countrySelected"
    })
    // if errors found, return error
    if (errorDetected) return renderError("Field(s) Missing")
  }

  const renderBackendError = () => {
    if (!backendDuplicates.write_success && backendDuplicates.duplicates.length !== 0) {
      return renderError("No countries were added as they are already on your map.", clearBackendErrors)
    } else if (backendDuplicates.write_success && backendDuplicates.duplicates.length !== 0) {
      const duplicatesString = backendDuplicates.duplicates.join(", ")
      return renderError(`Some countries were added, but the following are already on your map: ${duplicatesString}`, clearBackendErrors, true)
    }
  }

  const editComponent = (
    <div>
      {renderNoCountryError()}
      {renderBackendError()}
      {duplicateCountries ? renderError("Duplicate countries found") : ""}
      <div className="pb-4">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="add-countries-div" className="p-2 mt-1 mx-1 border-2 border-gray-600 rounded">
            <div id="countries-selector-div">
              {fields.map((field, index) => (
                <div key={field.id} className={((index == 0) ? `` : `pt-2`) + ` ` + ((index == fields.length - 1) ? `mb-2` : `pb-2`) + ` flex `}>
                  <div className="flex flex-col flex-grow">
                    <div className="flex-grow">
                      <select
                        name={`entry[${index}].country`}
                        className="country-select"
                        ref={register({
                          required: true,
                          validate: {
                            // validate that country has been selected
                            countrySelected: value => value == "Country" ? false : true
                          }
                        })}
                        // defaultValue={field.country}
                        defaultValue="Country"
                      // placeholder="Country"
                      >
                        <option disabled>Country</option>
                        {countriesOptions.map(value => (
                          <option key={value.c} value={value.c}>
                            {value.n}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* {noCountryError(index)} */}

                    <div className="flex-grow">
                      <select
                        name={`entry[${index}].year`}
                        className="country-select"
                        ref={register()}
                        defaultValue={0}
                      >
                        <option value={0}>Year (optional)</option>
                        <option value={1}>Birthplace</option>
                        {years.map(value => <option key={value} value={value}>{value}</option>)}
                      </select>

                    </div>
                  </div>

                  <div onClick={() => remove(index)} className="flex-none flex pl-2">
                    <span className="cursor-pointer m-auto">
                      {minusIcon}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="w-full text-left block flex items-stretch" onClick={() => append({ country: "", year: "" })}>
              <span className="self-center mr-1">{plusIcon}</span>
              New Field
            </button>
          </div>
          <div className="rounded text-white bg-gray-500 hover:bg-gray-600 p-2 mt-1 mx-1">
            <button type="submit" className="w-full text-left block font-bold">Add to Map</button>
          </div>
        </form>
      </div>
      <div>
        {renderCountriesList()}
      </div>
    </div>
  )

  return (
    <WorldMap sidebar={editComponent} />
  )
}



export default EditMap;