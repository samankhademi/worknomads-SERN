import {Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import {PropsType} from './types'
import {Autocomplete} from "@mui/material";

export function AutoCompleteFields(props: PropsType) {

    const register = typeof (props.register) === 'undefined' ? () => {
    } : props.register;

    const labelClasses: any = props.labelClasses ? props.labelClasses : {
        label: 'hidden',
        root: 'ml-0 mb-4 w-full flex-none'
    };

    return <Controller
        name={props.name}
        control={props.control}
        rules={props.validation}
        {...register(props.name)}
        render={({field}) => <Autocomplete
            {...field}
            onChange={(event, value) => {
                props.setValue(value)
            }}
            classes={{
                root: labelClasses.root
            }}
            multiple
            freeSolo
            open={props.open}
            onOpen={() => {
                props.setOpen(true);
            }}
            onClose={() => {
                props.setOpen(false);
                props.setSearch("")
            }}
            loading={props.loading}
            isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
            getOptionLabel={(option: any) => option[props.titleField]}
            options={props.options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose User Books"
                    onChange={(event) => {
                        props.setSearch(event.target.value)
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {props.loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
        }
    />
}