import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TextFields} from "@/components/formElements/TextFields";
import {emailValidation, passwordValidation} from "@/utils/customValidations";
import {FormPropsType} from './types'
import {useAddEdit} from './useAddEdit'
import {SexEnum, RoleEnum} from "@/queries";
import Box from "@mui/material/Box";
import {AutoCompleteFields} from "@/components/formElements/AutoCompleteFields";
import {useState} from "react";
import {PasswordFields} from "@/components/formElements/PasswordFields";

const labelClasses: any =  {
    label: `hidden`,
    root: `
        !mx-0
        my-4
        flex-none w-full
    `
};

export function AddEditUserForm(props:FormPropsType){
    const {
        errors,
        control,
        handleSubmit,
        onSubmit,
        isCurrentUser,
        data, isLoading,
        setSearchBook,
        setValue
    } = useAddEdit(props)

    const handleClose = () => {
        props.setOpen(false);
    };
    const [open, setOpen] = useState<boolean>(false)
    return <Dialog
        open={props.open}
        onClose={handleClose}
    >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
            <DialogTitle>{props.editMode ? 'Modify User' : 'Add User'}</DialogTitle>
            <DialogContent>
                <TextFields
                    error={errors.firstName}
                    name='firstName'
                    placeholder="Enter your first name"
                    control={control}
                    label="First name"
                    validation={{required: true}}
                    validationMessage="First name is required"
                    labelClasses={labelClasses}
                />
                <TextFields
                    error={errors.lastName}
                    name='lastName'
                    placeholder="Enter your last name"
                    control={control}
                    label="Last name"
                    validation={{required: true}}
                    validationMessage="Last name is required"
                    labelClasses={labelClasses}
                />
                {!isCurrentUser &&
                    <>
                        <TextFields
                            error={errors.email}
                            name='email'
                            placeholder="Enter your email"
                            control={control}
                            label="Email"
                            validation={{required: true, pattern: emailValidation}}
                            validationMessage="Email Is Not Valid"
                            labelClasses={labelClasses}
                        />
                        <PasswordFields
                            error={errors.password}
                            name='password'
                            placeholder=" Enter your password"
                            control={control}
                            label="Password"
                            validation={{required: !props.editMode, pattern: passwordValidation}}
                            validationMessage="Password Should be Stronger"
                            labelClasses={labelClasses}
                        />

                        <TextFields
                            error={errors.role}
                            name='role'
                            placeholder="Role"
                            control={control}
                            label="Role"
                            validation={{required: true}}
                            validationMessage="Role is required"
                            labelClasses={labelClasses}
                            type='select'
                            list={[
                                {value: String(RoleEnum.ADMIN), label: 'Admin'},
                                {value: String(RoleEnum.USER), label: 'User'},
                            ]}
                        />
                    </>}

                <TextFields
                    error={errors.sex}
                    name='sex'
                    placeholder="Sex"
                    control={control}
                    label="Sex"
                    validation={{required: true}}
                    validationMessage="Sex is required"
                    labelClasses={labelClasses}
                    type='select'
                    list={[
                        {value: String(SexEnum.MALE), label: 'Male'},
                        {value: String(SexEnum.FEMALE), label: 'Female'},
                    ]}
                />
                <TextFields
                    error={errors.age}
                    name='age'
                    type='number'
                    placeholder="Age"
                    control={control}
                    label="Age"
                    validation={{required: true}}
                    validationMessage="Age is required"
                    labelClasses={labelClasses}
                />
                <AutoCompleteFields
                    options={data?.message?.books || []}
                    control={control}
                    name='books'
                    placeholder='Select Books'
                    setOpen={(open) => { setOpen(open)}}
                    open={open}
                    setSearch={(text) => { setSearchBook(text) }}
                    loading={isLoading}
                    setValue={(value) => {
                        setValue('books', value)
                    }}
                    titleField='bookTitle'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit' autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Box>
    </Dialog>

}