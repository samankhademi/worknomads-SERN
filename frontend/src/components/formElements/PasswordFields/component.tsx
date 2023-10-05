import React, {MouseEvent} from "react";
import {Controller} from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EyeIcon from "@mui/icons-material/Visibility";
import {PropsType} from "./types";

export function PasswordFields(props:PropsType) {
    const [showPassword, setShowPassword] = React.useState<Boolean>(false);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const labelClasses: any = props.labelClasses ? props.labelClasses : {
        label: 'mr-4 text-18 w-48 text-grayLabel',
        root: 'ml-0 mb-32 w-full flex-none'
    };

    return <FormControlLabel
        label={props.label}
        labelPlacement="start"
        classes={labelClasses}
        name={props.name}
        control={
            <Controller
                name={props.name}
                control={props.control}
                rules={props.validation}
                render={({field}) =>
                    <TextField
                        {...field}
                        label={props.placeholder}
                        classes={{
                            root: labelClasses.input ? labelClasses.input : 'w-full',
                        }}
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(props.error)}
                        helperText={(props.error?.type && (props.validationMessage || props.error.message)) ? (props.validationMessage || props.error.message) : undefined}
                        autoComplete={field.name}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {setShowPassword(!showPassword)}}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <EyeIcon className="fill-black"/> :
                                        <EyeIcon className="fill-black"/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />

                }
            />
        }
    />
}