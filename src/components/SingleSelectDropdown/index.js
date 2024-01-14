import React from "react";
import Select from "react-select";

const SingleSelectDropdown = ({ options, selectedValue, onChange }) => {
	const formattedOptions = options.map((option) => ({
		value: option?.id,
		label: option?.name,
	}));

	const formattedSelectedValue = selectedValue
		? { value: selectedValue, label: selectedValue }
		: null;

	return (
		<Select
			options={formattedOptions}
			value={formattedSelectedValue}
			onChange={onChange}
		/>
	);
};

export default SingleSelectDropdown;
