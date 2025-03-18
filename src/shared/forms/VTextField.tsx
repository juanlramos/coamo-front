import { TextField, TextFieldProps } from "@mui/material";
import { useController } from "react-hook-form";


type TVTextFieldProps = TextFieldProps & {
    name: string
    control: any
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, control, ...rest }) => {

    const {field} = useController({
        name,
        control,
        defaultValue: '',
    });

    return (
        <TextField
            {...field}
            {...rest}
            placeholder={name}
        />
    );
};