import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useLogin} from './useLogin';
import {PasswordFields} from "@/components/formElements/PasswordFields";
import {TextFields} from "@/components/formElements/TextFields";
import {emailValidation} from "@/utils/customValidations";

const labelClasses: any =  {
    label: `hidden`,
    root: `
        !mx-0
        mb-4
        flex-none w-full
        text-11 xl:text-14 lg:text-11
    `
};



export function LoginForm() {

    const {control, errors, handleSubmit, onSubmit} = useLogin()

    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box className="mt-8 flex flex-col items-center rounded-2xl border !p-4">
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
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
                    placeholder="Enter your password"
                    control={control}
                    label="Password"
                    validation={{required: true}}
                    validationMessage="Password Is Required"
                    labelClasses={labelClasses}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
}