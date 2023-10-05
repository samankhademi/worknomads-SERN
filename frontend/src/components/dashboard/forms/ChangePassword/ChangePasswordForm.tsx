import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormPropsType} from './types'
import {useChangePasswordForm} from './useChangePasswordForm'
import Box from "@mui/material/Box";
import {PasswordFields} from "@/components/formElements/PasswordFields";

const labelClasses: any =  {
    label: `hidden`,
    root: `
        !mx-0
        my-4
        flex-none w-full
        text-11 xl:text-14 lg:text-11
    `
};

export function ChangePasswordForm({open, setOpen}:FormPropsType){
    const { errors, control, handleSubmit, onSubmit, formData } = useChangePasswordForm()

    const handleClose = () => {
        setOpen(false);
    };

    return <Dialog
        open={open}
        onClose={handleClose}
    >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
            <DialogTitle>Update User Password</DialogTitle>
            <DialogContent>
                <PasswordFields
                    error={errors.oldPassword}
                    name='oldPassword'
                    placeholder="Enter your old password"
                    control={control}
                    label="Old Password"
                    validation={{required: true}}
                    validationMessage="Old password is required"
                    labelClasses={labelClasses}
                />
                <PasswordFields
                    error={errors.newPassword}
                    name='newPassword'
                    placeholder="Enter your new password"
                    control={control}
                    label="New Password"
                    validation={{
                        required: {
                            message: "Password is required",
                            value: true
                        },
                        minLength: {
                            message: "Password should at least 8 char",
                            value: 8
                        },
                        validate: (value: string) => value === formData('newPasswordConfirm') || "New Password and Confirm should same!" }}
                    labelClasses={labelClasses}
                />
                <PasswordFields
                    error={errors.newPasswordConfirm}
                    name='newPasswordConfirm'
                    placeholder="Enter your new password confirm"
                    control={control}
                    label="New Password Confirm"
                    validation={{
                        required: {
                            message: "Confirm Password is required",
                            value: true
                        },
                        validate: (value: string) => value === formData('newPassword') || "New Password and Confirm should same!"
                    }}
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