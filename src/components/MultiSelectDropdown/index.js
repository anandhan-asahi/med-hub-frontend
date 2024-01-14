// MultiSelectDropdown.js

import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({ options, selectedValues, onChange }) => {
	const formattedOptions = options.map((option) => ({
		value: option?.id,
		label: option?.name,
	}));

	const formattedSelectedValues = selectedValues?.length
		? selectedValues.map((value) => ({
				value: value.value,
				label: value.label,
		  }))
		: [];

	return (
		<Select
			isMulti
			options={formattedOptions}
			value={formattedSelectedValues}
			onChange={onChange}
		/>
	);
};

export default MultiSelectDropdown;
