import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = (props) => {
  const { label, meta, input } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{ m: 1, width: "277px" }}
      variant="outlined"
      error={meta.submitFailed && Boolean(meta.error)}
    >
      <InputLabel
        sx={{
          color: "#44B26F",
          "&.MuiInputLabel-shrink": {
            marginTop: "10px",
          },
          "&.Mui-focused": {
            marginTop: "10px",
            color: "#44B26F",
          },
        }}
        htmlFor="outlined-adornment-password"
      >
        {label}
      </InputLabel>
      <OutlinedInput
        sx={{
          borderRadius: "0px",
          backgroundColor: "#D9D9D9",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        label={label}
        {...input}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              sx={{
                color: "#44B26F",
              }}
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {meta.submitFailed && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordInput;
