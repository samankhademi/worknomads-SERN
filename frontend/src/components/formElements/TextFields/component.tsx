import {MouseEvent} from "react";
import {Controller} from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { PropsType } from './types'

export function TextFields(props:PropsType) {

    const showClear = typeof (props.showClear) === 'undefined';
    const register = typeof (props.register) === 'undefined' ? () => {} : props.register;

    const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const labelClasses: any = props.labelClasses ? props.labelClasses : {
        label: 'mr-4 text-18 w-48 text-grayLabel',
        root: 'ml-0 mb-32 w-full flex-none'
    };

    const handleErrorMessage = () => {
        if (props.error?.type) {
            if (props.error?.message) {
                 return props.error?.message
            } else {
                return props.validationMessage
            }
        }
        return undefined
    }

    return <FormControlLabel
        label={props.tooltip ? <>{props.label} {props.tooltip}</> : props.label}
        labelPlacement="start"
        classes={labelClasses}
        name={props.name}
        sx={props.sx}
        control={
            <Controller
                name={props.name}
                control={props.control}
                rules={props.validation}
                {...register(props.name)}
                render={({field}) =><>
                    <TextField
                        {...field}
                        onChange={(event) => {
                            field.onChange({ target: { name: event.target.name, value: event.target.value }})
                            if (props.onChange) props.onChange(event.target.value)
                        }}
                        label={props.placeholder}
                        inputRef={field.ref}
                        size={props.size || 'medium'}
                        classes={{
                            root: labelClasses?.input ? labelClasses?.input : 'w-full',
                        }}
                        disabled={props?.disabled || props.loading}
                        select={props?.type === 'select'}
                        error={Boolean(props.error)}
                        helperText={handleErrorMessage()}
                        InputLabelProps={{
                            shrink: field.value?.length > 0 || Boolean(props?.mask)
                        }}
                        InputProps={{
                            type: props?.type === 'select' ? undefined : (props?.type || 'text'),
                            inputProps: {
                                min: props?.type === 'number' ? 0 : undefined,
                                step: props?.type === '.1' ? 0 : undefined,
                                sx: props.sx,
                            },
                            readOnly: props.readonly,
                            startAdornment: ((props?.type !== 'select') && props.loading) && <InputAdornment position="end">
                                <CircularProgress />
                            </InputAdornment>,
                            endAdornment: ((props?.type !== 'select') && field?.value?.trim()?.length > 0 && showClear) && <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        field.onChange({ target: { name: props.name, value: '' }})
                                        if (props.onClear) props.onClear()
                                    }}
                                    onMouseDown={handleMouseDown}
                                    edge="end"
                                    className='fill-black'
                                >
                                    <ClearIcon className="fill-black TextInput_clearIcon"/>
                                </IconButton>
                            </InputAdornment>,
                        }}
                    >
                        {props?.type === 'select' && props?.list?.map(item => <MenuItem selected={item?.value === field.value} key={item?.value} value={item?.value}>{item?.label}</MenuItem>)}
                    </TextField>
                </>
                }
            />
        }
    />
}