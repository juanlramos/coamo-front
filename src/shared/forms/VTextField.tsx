import { TextField, TextFieldProps } from "@mui/material";
import { useController } from "react-hook-form";

type TVTextFieldProps = TextFieldProps & {
  name: string;
  control: any;
};

export const VTextField: React.FC<TVTextFieldProps> = ({
  name,
  control,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      {...rest}
      name={name}
      error={!!error}
      helperText={error ? error.message : ""}
      slotProps={{
        formHelperText:{
            style:{
                visibility: error ? "visible" : "hidden",
                height: error ? "20px" : "auto",
            }
        }
      }}
    />
  );
};
