import React from "react";
import PropTypes from "prop-types";

const selectedOffice = ({ setSelectedOffice }) => {
  const handleOffice = (e) => {
    e.preventDefault();
    setSelectedOffice(e.target.value);
  };

  return (
    <label htmlFor="office">
      <select name="office" id="office" onChange={handleOffice}>
        <optgroup label="Mayor">
          <option value="Honolulu Mayor">Honolulu Mayor</option>
          <option value="Hawaii Mayor">Hawaii Mayor</option>
        </optgroup>
        <optgroup label="Legislature">
          <option value="House">House</option>
          <option value="Senate">Senate</option>
        </optgroup>
        <optgroup label="Council">
          <option value="Hawaii Council">Hawaii Council</option>
          <option value="Honolulu Council">Honolulu Council</option>
          <option value="Kauai Council">Kauai Council</option>
          <option value="Maui Council">Maui Council</option>
        </optgroup>
        <optgroup label="OHA">
          <option value="OHA">OHA</option>
        </optgroup>
        <optgroup label="Prosecuting Attorney">
          <option value="Prosecuting Attorney">Prosecuting Attorney</option>
        </optgroup>
      </select>
    </label>
  );
};

export default selectedOffice;

selectedOffice.propTypes = {
  setSelectedOffice: PropTypes.func.isRequired,
};
