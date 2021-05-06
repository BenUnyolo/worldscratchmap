import React, { useContext, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { plusIcon, minusIcon, crossIcon } from "../images/iconsSVG";

import UserContext from "../context/UserContext";
import CountriesContext from "../context/CountriesContext";

import countriesOptions from "../countriesOptions";

import WorldMap from "./WorldMap";

const years = [];

// populate years array
(() => {
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i > 1900; i--) {
    years.push(i);
  }
})();

const EditMap = () => {
  const { userData } = useContext(UserContext);
  const { countries, setCountries } = useContext(CountriesContext);

  const [duplicateCountries, setDuplicateCountries] = useState(false);
  const backendDuplicatesDefault = { duplicates: [], write_success: null };
  const [backendDuplicates, setBackendDuplicates] = useState(
    backendDuplicatesDefault
  );

  const [deleteError, setDeleteError] = useState(null);

  const clearBackendErrors = () =>
    setBackendDuplicates(backendDuplicatesDefault);

  useEffect(() => checkCountriesUniqueLogic());

  const { register, control, handleSubmit, watch, errors, reset } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entry", // name for field array
  });

  const watchCountries = watch(["entry"]);

  const onSubmit = async (formData) => {
    clearBackendErrors();
    // return if form is empty
    if (Object.keys(formData).length === 0) return;
    // return if duplicate values in form
    if (duplicateCountries) return;

    let countriesRes = [];
    try {
      countriesRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/map/`,
        formData.entry,
        {
          headers: {
            "x-access-token": localStorage.getItem("auth-token"),
          },
        }
      );
      countriesRes = countriesRes.data;
      reset();
    } catch (err) {
      // TODO proper error action
      console.log(err.response.data);
    }

    if (
      !countriesRes.write_success &&
      countriesRes.duplicates &&
      countriesRes.duplicates.length !== 0
    ) {
      setBackendDuplicates({
        duplicates: countriesRes.duplicates,
        write_success: false,
      });
      // renderError("No countries were added as they are already on your map.", true)
    } else if (
      countriesRes.write_success &&
      countriesRes.duplicates &&
      countriesRes.duplicates.length !== 0
    ) {
      setBackendDuplicates({
        duplicates: countriesRes.duplicates,
        write_success: true,
      });
      // const duplicatesString = backendDuplicates.join(", ")
      // renderError(`Some countries were added, but the following are already on your map: ${duplicatesString}`, true, true)
      fetchCountries();
    }
    // if the api response has write_success = true, refetch countries and add to context
    else if (countriesRes.write_success) {
      setBackendDuplicates({ duplicates: [], write_success: true });
      fetchCountries();
    }
  };

  const onDeleteCountry = async (kickedCountry) => {
    try {
      setDeleteError(null);
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/map/${kickedCountry.country_code}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("auth-token"),
          },
        }
      );
      // filter removed country from context
      const newCountries = countries.filter(
        (country) => country.country_code !== kickedCountry.country_code
      );
      setCountries(newCountries);
    } catch (err) {
      // TODO add error for bottom countries section
      if (err.response.data.message) {
        setDeleteError(
          `Unable to delete ${kickedCountry.country}: ${err.response.data.message}`
        );
      } else {
        setDeleteError(
          `Unable to delete ${kickedCountry.country}, please try again`
        );
      }
      console.log(err.response.data);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/map/${userData.user.user_id}`
      );
      setCountries(res.data);
    } catch (err) {
      // TODO add error for bottom countries section
      console.log(err.response.data);
    }
  };

  const checkCountriesUniqueLogic = () => {
    if (watchCountries.entry) {
      // create array from countries object array
      let countryArray = watchCountries.entry.map((item) => item.country);
      // map over array to remove unselected fields
      countryArray = countryArray.filter((item) => item !== "Country");
      // check if there are duplicates
      const checkDuplicates =
        new Set(countryArray).size !== countryArray.length;
      // update state
      return checkDuplicates
        ? setDuplicateCountries(true)
        : setDuplicateCountries(false);
    }
  };

  const renderCountriesList = () => {
    return countries.map((country) => {
      return (
        <div
          className="flex p-2 mt-1 mx-1 border-2 border-gray-600 rounded"
          key={country.country_code}
        >
          <div className="flex-1">
            <div className="font-bold">{country.country}</div>
            <div className="text-sm">
              {country.year_visited === 0 ? "" : ""}
              {country.year_visited === 1 ? "Birthplace" : ""}
              {country.year_visited > 1 ? country.year_visited : ""}
            </div>
          </div>
          <div className="flex-none flex">
            <button className="m-auto" onClick={() => onDeleteCountry(country)}>
              {crossIcon}
            </button>
          </div>
        </div>
      );
    });
  };

  const renderError = (errorText, closeFunction, alert) => {
    return (
      <>
        <div
          className={
            "flex px-2 py-1 mb-2 " +
            (alert
              ? "bg-yellow-200 text-yellow-700"
              : "bg-red-200 text-red-700")
          }
        >
          <div className="flex-1 leading-tight">
            <div>{errorText}</div>
          </div>
          {closeFunction ? (
            <div className="flex-none flex">
              <button className="m-auto" onClick={() => closeFunction()}>
                {crossIcon}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  const renderNoCountryError = () => {
    // if no errors, exit function
    if (!errors.entry) return;
    // checks for countrySelected errors in the entry array
    const errorDetected = errors.entry.some((entry) => {
      return entry.country.type == "countrySelected";
    });
    // if errors found, return error
    if (errorDetected) return renderError("Field(s) Missing");
  };

  const renderBackendError = () => {
    if (
      !backendDuplicates.write_success &&
      backendDuplicates.duplicates.length !== 0
    ) {
      return renderError(
        "No countries were added as they are already on your map.",
        clearBackendErrors
      );
    } else if (
      backendDuplicates.write_success &&
      backendDuplicates.duplicates.length !== 0
    ) {
      const duplicatesString = backendDuplicates.duplicates.join(", ");
      return renderError(
        `Some countries were added, but the following are already on your map: ${duplicatesString}`,
        clearBackendErrors,
        true
      );
    }
  };

  const renderDeleteError = () => {
    const closeDeleteError = () => setDeleteError(null);
    if (deleteError) return renderError(deleteError, closeDeleteError);
  };

  const editComponent = (
    <div>
      {renderNoCountryError()}
      {renderBackendError()}
      {duplicateCountries ? renderError("Duplicate countries found") : ""}
      <div className="pb-4">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            id="add-countries-div"
            className="p-2 mt-1 mx-1 border-2 border-gray-600 rounded"
          >
            <div id="countries-selector-div">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={
                    (index === 0 ? `` : `pt-2`) +
                    ` ` +
                    (index === fields.length - 1 ? `mb-2` : `pb-2`) +
                    ` flex `
                  }
                >
                  <div className="flex flex-col flex-grow">
                    <div className="flex-grow">
                      <select
                        name={`entry[${index}].country`}
                        className="country-select"
                        ref={register({
                          required: true,
                          validate: {
                            // validate that country has been selected
                            countrySelected: (value) =>
                              value == "Country" ? false : true,
                          },
                        })}
                        // defaultValue={field.country}
                        defaultValue="Country"
                        // placeholder="Country"
                      >
                        <option disabled>Country</option>
                        {countriesOptions.map((value) => (
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
                        {years.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div
                    onClick={() => remove(index)}
                    className="flex-none flex pl-2"
                  >
                    <span className="cursor-pointer m-auto">{minusIcon}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full text-left block flex items-stretch"
              onClick={() => append({ country: "", year: "" })}
            >
              <span className="self-center mr-1">{plusIcon}</span>
              New Field
            </button>
          </div>
          <div className="rounded text-white bg-gray-500 hover:bg-gray-600 p-2 mt-1 mx-1">
            <button type="submit" className="w-full text-left block font-bold">
              Add to Map
            </button>
          </div>
        </form>
      </div>
      <div>
        {renderDeleteError()}
        {renderCountriesList()}
      </div>
    </div>
  );

  return <WorldMap sidebar={editComponent} />;
};

export default EditMap;
