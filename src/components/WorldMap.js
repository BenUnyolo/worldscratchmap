import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, GeoJSON } from "react-leaflet";
// geojson from https://geojson-maps.ash.ms/

import UserContext from '../context/UserContext'
import CountriesContext from '../context/CountriesContext'
import geoJsonData from '../world.geo.json';

const geoJson = geoJsonData.features

const WorldMap = (props) => {
    const { userData } = useContext(UserContext)
    const { countries, setCountries } = useContext(CountriesContext)

    const [highlightedCountries, setHighlightedCountries] = useState([]);

    const geoJsonLayer = useRef()

    const fetchCountries = async () => {
        // TODO add try catch
        const res = await axios.get(`/map/${userData.user.user_id}`)
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

    // updates local highlightedCountries state when countries context updates
    useEffect(() => {
        setHighlightedCountries(countries.map((item) => item.country_code))
    }, [countries])

    // updates geoJson highlighting when highlightedCountries state changes
    useEffect(() => {
        // runs if .current property initialised
        if (geoJsonLayer.current) {
            // filter JSON to only visited countries
            const visitedJson = geoJson.filter((country) => {
                return highlightedCountries.indexOf(country.properties.iso_a3) !== -1
            })
            // TODOzo
            visitedJson.map((country) => "")
            // update our map's geojson data
            geoJsonLayer.current.clearLayers().addData(visitedJson);
        }
    }, [highlightedCountries]);

    // onEachFeature function for map (adds tooltip for countries)
    const onEachFeature = (feature, layer) => {
        let yearVisited;
        console.log(feature)
        // console.log("GOT HERE 2")
        // if (countries.length !== 0) {
        //     const countryState = countries.reduce((country) => country.country_code === feature.properties.iso_a3)
        //     console.log(countryState)
        //     yearVisited = countryState.year_visited
        // }
        layer.on({
            mousemove: (e) => {
                // console.log(e, feature.properties.name, layer)
                layer.bindTooltip(feature.properties.name + "<br>" + yearVisited);
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