import {Controller, FieldError} from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectCaret from 'assets/common/selectCaret.svg';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import CircleLoading from '@mui/material/CircularProgress';
import FormHelperText from "@mui/material/FormHelperText";

type PropsType = {
    control: any,
    error?: FieldError,
    label: string,
    name: string,
    placeholder: string,
    validation?: any,
    labelClass?: string,
    inputClass?: string,
    fieldLabelClass?: string,
    holderClass?: string,
    validationMessage?: string,
    list: any[],
    mask?: string,
    disabled?: boolean
    readonly?: boolean
    multiple?: boolean
    loading?: boolean
}

export default function SelectFields(props:PropsType) {
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


    return <div className="flex items-center">
            <InputLabel className={props.fieldLabelClass}>{props.label}</InputLabel>
            <FormControl fullWidth size='small' error={Boolean(props.error)}>
                <InputLabel
                    id={`label-${props?.label?.replaceAll(' ','')}-${props?.placeholder?.replaceAll(' ','')}`}
                >
                    {props.placeholder}
                </InputLabel>
                <Controller
                    name={props.name}
                    control={props.control}
                    rules={props.validation}
                    render={({field}) => <>
                        <Select
                            {...field}
                            inputRef={field.ref}
                            size="small"
                            label={props.placeholder}
                            id={`select-${props?.label?.replaceAll(' ','')}-${props?.placeholder?.replaceAll(' ','')}`}
                            labelId={`label-${props?.label?.replaceAll(' ','')}-${props?.placeholder?.replaceAll(' ','')}`}
                            IconComponent={() => props.loading ? <CircleLoading size={20} className="mr-2 mt-1"/> : <SelectCaret className="mr-2 mt-1 w-[30px]" />}
                            disabled={props?.disabled}
                            error={Boolean(props.error)}
                            multiple={props.multiple}
                            className={props.inputClass}
                            MenuProps={{
                                MenuListProps: {
                                    dense: true,
                                    classes: {
                                        dense: 'p-0',
                                        root: 'p-0',
                                    }
                                }
                            }}
                            renderValue={(selected) => (
                                <Box className="flex flex-wrap gap-0.5">
                                    {props.multiple && selected.map((value:any) => (
                                        <Chip key={value} label={props?.list?.find(a => a.value === value)?.label} />
                                    ))}
                                    {!props.multiple && props?.list?.find(a => a.value === selected)?.label}
                                </Box>
                            )}

                        >
                            {props?.list?.map(item => <MenuItem key={item?.value} value={item?.value}>
                                {props?.multiple && <Checkbox checked={field?.value?.indexOf(item?.value) > -1} />}
                                <ListItemText>{item?.label}</ListItemText>
                            </MenuItem>)}
                        </Select>
                    </>
                    }
                />
                {Boolean(props.error) && <FormHelperText className='-mt-5'>{handleErrorMessage()}</FormHelperText>}

            </FormControl>
    </div>
}