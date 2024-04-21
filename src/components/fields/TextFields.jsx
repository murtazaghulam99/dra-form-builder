import React from "react";
import {
  Box,
  Typography,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
} from "@mui/material";
import ActionButtons from "../ActionButtons";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CustomTextField = ({
  index,
  label,
  disabled,
  helpText,
  tooltip,
  variable,
  name,
  value,
  required,
  placeholder,
  type,
  options,
  actionButton = true,
  handleFieldChange,
}) => {
  const handleChange = (event, fieldType) => {
    handleFieldChange(event, fieldType);
  };

  return (
    <Box className="text-field-wrapper" key={index}>
      {actionButton && (
        <Box className="field-topbar flex gap-x-2 mb-3 items-center">
          <ActionButtons />
          <Typography className="variable bg-[#F1F5F9] rounded-2xl px-3 text-[10px] text-[#2A4376] font-medium">
            var: {variable}
          </Typography>
        </Box>
      )}
      <Box className="form-group flex-col flex">
        <label
          htmlFor={name}
          className=" text-[#2A4376] text-[16px] capitalize pb-2 font-bold"
        >
          <Tooltip title={tooltip}>
            {index + 1}. {label}
          </Tooltip>

          {disabled && <CheckCircleOutlineIcon className="text-green-500" />}
        </label>
        {type === "checkbox" || type === "radio" ? (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={value || ""}
            name={String(name)}
            onChange={(event) => handleChange(event, type)}
          >
            {options &&
              options.map((val, index) => (
                <FormControlLabel
                  key={index}
                  value={val}
                  control={<Radio />}
                  label={val}
                />
              ))}
          </RadioGroup>
        ) : (
          <TextField
            type={type || "text"}
            name={String(name)}
            value={value}
            id={name}
            onChange={(event) => handleChange(event, type)}
            onKeyDown={(event) => handleChange(event, type)}
            placeholder={placeholder}
            required={required}
            className=" bg-white rounded-xl w-[300px] border-[#94A3B8]"
            disabled={disabled}
          />
        )}
        {helpText && <small>{helpText}</small>}
      </Box>
    </Box>
  );
};

export default CustomTextField;
