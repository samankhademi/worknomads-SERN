import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TextFields} from "@/components/formElements/TextFields";
import {FormPropsType} from './types'
import {useProfileForm} from './useProfileForm'
import {SexEnum} from "@/queries";
import Box from "@mui/material/Box";

const labelClasses: any =  {
    label: `hidden`,
    root: `
        !mx-0
        my-4
        flex-none w-full
        text-11 xl:text-14 lg:text-11
    `
};

export function ProfileForm({open, setOpen}:FormPropsType){
    const { errors, control, handleSubmit, onSubmit } = useProfileForm()

    const handleClose = () => {
        setOpen(false);
    };

    return <Dialog
        open={open}
        onClose={handleClose}
    >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
            <DialogTitle>Update User Profile</DialogTitle>
            <DialogContent>
                    <TextFields
                        error={errors.firstName}
                        name='firstName'
                        placeholder="Enter your firstname"
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