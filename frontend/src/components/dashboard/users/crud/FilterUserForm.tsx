import * as React from 'react';
import {TextFields} from "@/components/formElements/TextFields";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {Control} from "react-hook-form";
import {AddUserFormRequest} from "@/components/dashboard/users/form";
import {RoleEnum, SexEnum} from "@/queries";
const labelClasses: any = {
    label: `hidden`,
    root: `
        !mx-1
        min-w-[100px]
        flex-1
        !gap-x-2 
    `
};

export type propsType = {
    control: Control<AddUserFormRequest, any>
}

export function FilterUserForm({control}:propsType) {

    return <>
        <TextFields
            name='firstName'
            placeholder="First Name"
            control={control}
            labelClasses={labelClasses}
            size='small'
        />
        <TextFields
            name='lastName'
            placeholder="Last Name"
            control={control}
            labelClasses={labelClasses}
            size='small'
        />
        <TextFields
            name='email'
            placeholder="Email"
            control={control}
            labelClasses={labelClasses}
            size='small'
        />
        <TextFields
            name='sex'
            placeholder="Sex"
            control={control}
            labelClasses={{
                label: labelClasses.label,
                root: `${labelClasses.root} w-[100px] flex-none`
            }}
            size='small'
            type='select'
            list={[
                {value: String(SexEnum.MALE), label: 'Male'},
                {value: String(SexEnum.FEMALE), label: 'Female'},
            ]}
        />
        <TextFields
            name='role'
            placeholder="Role"
            control={control}
            labelClasses={{
                label: labelClasses.label,
                root: `${labelClasses.root} w-[100px] flex-none`
            }}
            size='small'
            type='select'
            list={[
                {value: String(RoleEnum.ADMIN), label: 'Admin'},
                {value: String(RoleEnum.USER), label: 'User'},
            ]}
        />
        <TextFields
            name='age'
            type='number'
            placeholder="Age"
            control={control}
            labelClasses={{
                label: labelClasses.label,
                root: `${labelClasses.root} w-[100px] flex-none`
            }}
            size='small'
        />
        <Button variant='outlined' type='submit'>
            <FilterAltOutlinedIcon/>
            <span>Filter</span>
        </Button>
    </>

}