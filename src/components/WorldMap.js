import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { throttle } from "throttle-debounce";
import { getScreenWidth } from "../lib/getScreenWidth";

import UserContext from "../context/UserContext";
import CountriesContext from "../context/CountriesContext";
import geoJsonData from "../world.geo.json";
// geojson from https://geojson-maps.ash.ms/

const screenWidth = getScreenWidth();

const geoJson = geoJsonData.features;

// custom leaflet component for info box (country, year visited)
const InfoComponent = ({ infoObject }) => {
  const context = useLeafletContext();

  let { name, year_visited } = infoObject;

  // checks if we are on touch device
  let isTouchDevice = "ontouchstart" in document.documentElement;

  let infoHtml = () => {
    let template = () => `<div class="w-48 p-2 mt-1 mx-1 border-2 border-gray-600 rounded bg-white">
    <div class="text-base font-bold block">${
      // checks for country name argument, if not then checks if touch device or not for message
      name
        ? name
        : `${isTouchDevice ? "Click" : "Hover over"} country for details`
    }</div>
    ${year_visited ? `<div class="text-sm block">${year_visited}</div>` : ""}
    </div>`;

    return name ? template(name, year_visited) : template();
  };

  // extends leaflet controls with our info box
  L.Control.Info = L.Control.extend({
    onAdd: function (map) {
      this._div = L.DomUtil.create("div");
      this._div.innerHTML = infoHtml();
      return this._div;
    },

    onRemove: function (map) {},
  });

  L.control.info = function (opts) {
    return new L.Control.Info(opts);
  };

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const control = L.control.info({ position: "topright" });
    container.addControl(control);

    return () => {
      container.removeControl(control);
    };
  }, [infoObject, context]);

  return null;
};

// changes map zoom based on screen width
const mapZoom =
  screenWidth.size === "xl"
    ? 2.25
    : screenWidth.size === "lg" || screenWidth.size === "md"
    ? 2
    : 1.75;

const WorldMap = (props) => {
  const { userData } = useContext(UserContext);
  const { countries, setCountries } = useContext(CountriesContext);

  const [infoComponentObject, setInfoComponentObject] = useState({});

  const geoJsonLayer = useRef();

  const fetchCountries = async () => {
    // TODO add try catch
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/map/${userData.user.user_id}`
    );
    // add countries array with years to context
    setCountries(res.data);
  };

  // run useEffect when userData state changes (log in updated in state)
  useEffect(() => {
    // only runs if user is logged in else will fail as we send get request based on logged in user
    if (userData.user) {
      fetchCountries();
    }
  }, [userData]);

  // updates geoJson highlighting when countries state changes
  useEffect(() => {
    // runs if .current property initialised
    if (geoJsonLayer.current) {
      // reduce geoJSON to only visited countries
      let visitedJson = geoJson.reduce((finalArray, geoJsonCountry) => {
        // array.some returns true if country found in state
        let countryPresent = countries.some((stateCountry) => {
          // checks if current geojson country is in the state's country array
          let found =
            stateCountry.country_code === geoJsonCountry.properties.iso_a3;
          // if it is we add the year visited to the geojson properties
          if (found) {
            if (stateCountry.year_visited === 1)
              geoJsonCountry.properties.year_visited = "Birthplace";
            else if (stateCountry.year_visited === 0)
              geoJsonCountry.properties.year_visited = "";
            else
              geoJsonCountry.properties.year_visited =
                stateCountry.year_visited;
          }
          return found;
        });
        // if the country was present add it to final array
        if (countryPresent) return [...finalArray, geoJsonCountry];
        // if not return previous array
        return finalArray;
      }, []);
      geoJsonLayer.current.clearLayers().addData(visitedJson);
    }
  }, [countries]);

  // onEachFeature function for map for hover actions
  const onEachFeature = (feature, layer) => {
    layer.on({
      // mousemove is being throttled to stop large numbers of calls
      // second argument is 'noTrailing', stops final call after last throttled call
      mousemove: throttle(200, true, (e) => {
        setInfoComponentObject({
          name: feature.properties.name,
          year_visited: feature.properties.year_visited,
        });
      }),
      mouseout: (e) => {
        setInfoComponentObject({});
      },
      click: (e) => {
        setInfoComponentObject({
          name: feature.properties.name,
          year_visited: feature.properties.year_visited,
        });
      },
      // touchend: (e) => {
      //   setInfoComponentObject({});
      // },
    });
  };

  // render sidebar if passed through props
  const renderSidebar = () => {
    if (props.sidebar) {
      return (
        <div className="flex-none w-full lg:w-3/12 lg:flex-auto">
          {props.sidebar}
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex flex-row flex-wrap flex-auto w-full h-full min-h-0 lg:flex-no-wrap">
        {renderSidebar()}
        <MapContainer
          className="flex-none order-first h-full w-full lg:flex-auto lg:order-none"
          center={[20, 15]}
          zoomSnap={0.25}
          zoom={mapZoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
            url="https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={[]}
            ref={geoJsonLayer}
            color="#38b2ac"
            weight="1"
            onEachFeature={onEachFeature}
          ></GeoJSON>
          <InfoComponent infoObject={infoComponentObject}></InfoComponent>
        </MapContainer>
      </div>
    </>
  );
};

export default WorldMap;
