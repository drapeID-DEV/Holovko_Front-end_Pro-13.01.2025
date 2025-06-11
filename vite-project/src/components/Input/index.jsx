import TextField from "@mui/material/TextField";

const Input = (props) => {
  const { label, meta, input, action } = props;

  return (
    <TextField
      sx={{
        m: 1,
        width: action == "edit" ? "80%" : "277px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: action == "edit" ? "#FFF" : "#D9D9D9",
          borderRadius: "0px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          borderRadius: "0px",
        },
      }}
      InputLabelProps={{
        sx: {
          color:  "#44B26F",
          "&.Mui-focused": {
            color: "#44B26F",
            marginTop: "10px",
          },
          "&.MuiInputLabel-shrink": {
            color: "#44B26F",
            marginTop: "10px",
          },
        },
      }}
      error={meta.submitFailed && Boolean(meta.error)}
      label={label}
      helperText={meta.submitFailed && meta.error}
      {...input}
    />
  );
};

export default Input;
