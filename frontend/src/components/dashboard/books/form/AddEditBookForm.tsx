import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TextFields} from "@/components/formElements/TextFields";
import {FormPropsType} from './types'
import {useAddEdit} from './useAddEdit'
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

export function AddEditBookForm(props:FormPropsType){
    const {
        errors,
        control,
        handleSubmit,
        onSubmit,
    } = useAddEdit(props)

    const handleClose = () => {
        props.setOpen(false);
    };

    return <Dialog
        open={props.open}
        onClose={handleClose}
    >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
            <DialogTitle>{props.editMode ? 'Modify Book' : 'Add Book'}</DialogTitle>
            <DialogContent>
                    <TextFields
                        error={errors.bookTitle}
                        name='bookTitle'
                        placeholder="Enter your Book Title"
                        control={control}
                        validation={{required: true}}
                        validationMessage="Book Title is required"
                        labelClasses={labelClasses}
                    />
                    <TextFields
                        error={errors.ISBN}
                        name='ISBN'
                        placeholder="Enter ISBN"
                        control={control}
                        validation={{required: true}}
                        validationMessage="ISBN is required"
                        labelClasses={labelClasses}
                    />
                    <TextFields
                        error={errors.publisher}
                        name='publisher'
                        placeholder="Publisher"
                        control={control}
                        validation={{required: true}}
                        validationMessage="Publisher is required"
                        labelClasses={labelClasses}
                    />
                    <TextFields
                        error={errors.yearOfPublication}
                        name='yearOfPublication'
                        type='number'
                        placeholder="Year Of Publication"
                        control={control}
                        validation={{required: true}}
                        validationMessage="Year Of Publication is required"
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