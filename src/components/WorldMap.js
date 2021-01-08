import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Tooltip, GeoJSON } from "react-leaflet";
// geojson from https://geojson-maps.ash.ms/

import UserContext from '../context/UserContext'
import CountriesContext from '../context/CountriesContext'
import geoJsonData from '../world.geo.json';

const geoJson = geoJsonData.features

// let sqlString = ""
// geoJson.sort(function(a, b) {
//     var textA = a.properties.name.toUpperCase();
//     var textB = b.properties.name.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });
// geoJson.forEach((country) => {
//     let string = `("${country.properties.adm0_a3}", "${country.properties.name}"),`
//     sqlString = sqlString.concat('\n', string)
// })
// console.log(sqlString)

const WorldMap = (props) => {
    const { userData } = useContext(UserContext)
    const { countries, setCountries } = useContext(CountriesContext)

    const geoJsonLayer = useRef()

    const fetchCountries = async () => {
        // TODO add try catch
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/map/${userData.user.user_id}`)
        // add countries array with years to context
        setCountries(res.data)
    }

    // run useEffect when userData state changes (log in updated in state)
    useEffect(() => {
        // only runs if user is logged in else will fail as we send get request based on logged in user
        if (userData.user) {
            fetchCountries()
        }
    }, [userData])

    // updates geoJson highlighting when countries state changes
    useEffect(() => {
        // runs if .current property initialised
        if (geoJsonLayer.current) {
            // reduce geoJSON to only visited countries
            let visitedJson = geoJson.reduce((finalArray, geoJsonCountry) => {
                // array.some returns true if country found in state
                let countryPresent = countries.some((stateCountry) => {
                    // checks if current geojson country is in the state's country array
                    let found = (stateCountry.country_code === geoJsonCountry.properties.iso_a3);
                    // if it is we add the year visited to the geojson properties
                    if (found) {
                        if (stateCountry.year_visited === 1) geoJsonCountry.properties.year_visited = "Birthplace";
                        else if (stateCountry.year_visited === 0) geoJsonCountry.properties.year_visited = "";
                        else geoJsonCountry.properties.year_visited = stateCountry.year_visited;
                    }
                    return found
                })
                // if the country was present add it to final array
                if (countryPresent) return [...finalArray, geoJsonCountry]
                // if not return previous array
                return finalArray
            }, [])
            geoJsonLayer.current.clearLayers().addData(visitedJson);
        }
    }, [countries]);

    // onEachFeature function for map (adds tooltip for countries)
    const onEachFeature = (feature, layer) => {
        layer.on({
            mousemove: (e) => {
                layer.bindTooltip(feature.properties.name + "<br>" + feature.properties.year_visited);
                layer.openTooltip(e.latlng);
            },
            mouseout: (e) => {
                layer.unbindTooltip();
                layer.closeTooltip();
            },
            // touchmove: (e) => {
            //     console.log(e, feature.properties.name, layer)
            //     layer.bindTooltip(feature.properties.name + " hello");
            //     layer.openTooltip(e.latlng);
            // },
            // touchend: (e) => {
            //     layer.unbindTooltip();
            //     layer.closeTooltip();
            // }
        });
        return (<Tooltip sticky>{`feature: ${feature}, layer: ${layer}`}</Tooltip>)
    };

    // render sidebar if passed through props
    const renderSidebar = () => {
        if (props.sidebar) {
            return (
                <div className="w-3/12 overflow-auto" style={{ flex: "1 1 auto" }}>
                    { props.sidebar}
                </div>
            )
        }
    }

    return (
        <>
            <div id="map-outer-div">
                {renderSidebar()}
                {/* TODO different zooms on different screen sizes? */}
                <MapContainer style={{ flex: "1 1 auto" }} center={[20, 10]} zoom={2.2} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        data={[]}
                        ref={geoJsonLayer}
                        color='#38b2ac'
                        weight='1'
                        onEachFeature={onEachFeature}
                    >
                    </GeoJSON>
                </MapContainer>
            </div>
        </>
    )
}

export default WorldMap