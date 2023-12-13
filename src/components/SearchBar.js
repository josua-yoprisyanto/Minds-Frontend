import React, { useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const SearchBar = (props) => {
  const { placeholder, value, onChange } = props;
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
      />
    </Card>
  );
};
