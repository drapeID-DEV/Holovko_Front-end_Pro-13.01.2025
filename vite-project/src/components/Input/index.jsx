import TextField from '@mui/material/TextField';

const Input = (props) => {
  const { label, meta, input } = props;

  return <TextField label={label} error={Boolean(meta.error)} helperText={meta.error} {...input} />
}

export default Input;