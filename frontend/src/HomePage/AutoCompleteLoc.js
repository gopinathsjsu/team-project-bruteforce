import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "./AutoCompleteloc.css";

function AutoCompleteLoc() {
  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    console.log(address);
    // saveData("address", address);
    const data = geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        // saveData("location", latLng);
      })
      .catch((error) => console.error("Error", error));
    console.log(data);
  };
  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ width: "285px" }}>
            <input
              style={{
                height: "70px",
                width: "300px",
                fontSize: "16px",
                paddingLeft: "10px",
              }}
              // aria-expanded="false"
              id={styles.autoComplete}
              {...getInputProps({
                placeholder: "Please enter city name...",
              })}
            />
            <div
              className="autocomplete-dropdown-container"
              style={{
                position: "absolute",
                zIndex: "100",
                marginTop: "10px",
                padding: "8px!important",
              }}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? {
                      backgroundColor: "#fafbfc",
                      cursor: "pointer",
                      borderRadius: "4px",
                      padding: "14px 8px",
                      fontSize: "16px; ",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      borderRadius: "4px",
                      padding: "14px 8px",
                      fontSize: "16px; ",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>
                      <span className="pr-2">
                        <FontAwesomeIcon
                          icon={faMapMarker}
                          color="rgba(0, 0, 0, 0.5)"
                        />
                      </span>
                      <span className="p-2">{suggestion.description}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}

export default AutoCompleteLoc;
