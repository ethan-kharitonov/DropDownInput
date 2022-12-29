import React, { useState, useRef, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import deepEqual from "./deepEqual";

const isOptionEqualToValue = (option, value) => {
  return option.toLowerCase() === value.toLowerCase();
};

const DropDownInput = ({ options, onSelect, loading, label, sx }) => {
  const [inputValue, setInputValue] = useState("");
  const lastReturned = useRef("");

  useEffect(() => {
    setInputValue("");
    lastReturned.current = "";
  }, [options]);

  const getValueFromLabel = (label) => {
    const validOptions = options.find(
      (o) => o.label.toLowerCase() === label.toLowerCase()
    );
    return validOptions ? validOptions.value : "";
  };

  const getLabelFromValue = (value) => {
    const validOptions = options.find((o) => o.value === value);
    return validOptions ? validOptions.label : "";
  };

  const onInputChange = (newInput, reason) => {
    if (reason === "reset") {
      return;
    }
    setInputValue(newInput);
  };

  const onChange = (newValue, reason) => {
    if (reason === "selectOption") {
      setInputValue(newValue);
      lastReturned.current = getValueFromLabel(newValue);
      onSelect(lastReturned.current);
    }
    if (reason === "clear") {
      lastReturned.current = "";
      onSelect(lastReturned.current);
    }
  };

  const onClose = (event, reason) => {
    if (reason === "selectOption") {
      return;
    }
    const input = event.target.value;
    const newReturnValue = getValueFromLabel(input);
    setInputValue(newReturnValue ? getLabelFromValue(newReturnValue) : "");
    if (lastReturned.current === newReturnValue) {
      return;
    }
    lastReturned.current = newReturnValue;
    onSelect(lastReturned.current);
  };
  return (
    <Autocomplete
      autoComplete
      onChange={(_, value, reason) => onChange(value, reason)}
      inputValue={inputValue}
      onInputChange={(_, input, r) => onInputChange(input, r)}
      onClose={onClose}
      options={options.map((o) => o.label)}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={{ width: 320, height: 56, ...sx }}
      disabled={options.length === 0 || loading}
      renderInput={(params) => renderInput(params, loading, label)}
    />
  );
};

const renderInput = (params, loading, label) => {
  return (
    <TextField
      {...params}
      label={loading ? `Loading ${label}` : label}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );
};

export default DropDownInput;
