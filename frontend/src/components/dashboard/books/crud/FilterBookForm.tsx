import * as React from 'react';
import {TextFields} from "@/components/formElements/TextFields";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {Control} from "react-hook-form";
import {AddBookFormRequest} from "@/components/dashboard/books/form";
const labelClasses: any = {
    label: `hidden`,
    root: `
        !mx-1
        w-1/4
        !gap-x-2 
    `
};

export type propsType = {
    control: Control<AddBookFormRequest, any>
}

export function FilterBookForm({control}:propsType) {

    return <>
        <TextFields
            name='bookTitle'
            placeholder="Enter your Book Title"
            control={control}
            labelClasses={labelClasses}
            size='small'
        />
        <TextFields
            name='ISBN'
            placeholder="Enter ISBN"
            control={control}
            labelClasses={labelClasses}
            size='small'
        />
        <TextFields
            name='publisher'
            placeholder="Publisher"
            control={control}
            labelClasses={labelClasses}
            size='small'
        />
        <TextFields
            name='yearOfPublication'
            type='number'
            placeholder="Year Of Publication"
            control={control}
            labelClasses={labelClasses}
            size='small'
        />
        <Button variant='outlined' type='submit'>
            <FilterAltOutlinedIcon/>
            <span>Filter</span>
        </Button>
    </>

}