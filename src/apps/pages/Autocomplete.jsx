
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useEffect, useMemo, createContext } from "react";
import axios from "axios";
import {CircularProgress, TextField } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={top100Films}
      value={selectedValues}
      inputValue={inputValue}
      onInputChange={(event, newInputValue, reason) => {
        // prevent inputValue from being cleared on selection
        if (reason !== 'reset') {
          setInputValue(newInputValue);
        }
      }}
      onChange={(event, newValue) => {
        setSelectedValues(newValue);
        // don't reset inputValue here!
      }}
      getOptionLabel={(option) => option.title}
      filterSelectedOptions
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Checkboxes"
          placeholder="Favorites"
        />
      )}
    />
  );
}
export function MultiFormikOptimizedAutocomplete({
  value = [],
  onChange,
  url,
  label = "Select Options",
  multiple = true,
  errors,
  helper,
  ...props
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        console.log("API Response:", response.data);
        const data = response?.data?.Data?.rows || []; // Ensure it's always an array
        setOptions(Array.isArray(data) ? data : []);
        //setOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOptions([]); // Fallback to an empty array
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      sx={{
        "& .MuiAutocomplete-tag": { maxWidth: "90px" },
      }}
      size="small"
      multiple={multiple}
      limitTags={1}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={value}
      onChange={onChange}
      options={options}
      variant="standard" // Set variant to "standard"
      focused
      isOptionEqualToValue={(option, value) =>
        option?.RecordID === value?.RecordID
      }
      getOptionLabel={(option) => option?.Name || ""}
      // getOptionLabel={(option) => `${option.Code} || ${option.Name || ""}`}
      disableCloseOnSelect
      loading={loading}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ display: "flex", gap: 2, height: 20 }}>
          <Checkbox size="small" sx={{ marginLeft: -1 }} checked={selected} />
          {option.Name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={errors}
          variant="standard"
          focused
          helperText={helper}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
}
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  // ... more items
];
