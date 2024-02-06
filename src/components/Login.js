import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import report_icon2 from '../assets/bar-chart.gif';

import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from "react-redux";
import {Alert, Stack} from "@mui/material";
import bg_image from '../assets/knjaro.jpg';
import { signInUser } from '../store/actions/users_actions';



// TODO remove, this demo shouldn't need to reset the theme.

const Schema = Yup.object({
   username : Yup
       .string()
       .required()
       .email()
       .trim(),
  password : Yup
      .string()
      .required()
      .trim()
})

const defaultTheme = createTheme();

export default function Login() {

  const {control, handleSubmit,reset, formState,setError,isSubmitSuccesful} =  useForm({
    resolver :yupResolver(Schema)
  });


  const dispatch = useDispatch();
    const [succeed, setSucceed]  =  useState(false);
    const [failed, setFailed] = useState(false);

    const onSubmit = async (data) => {

            try {
                // Clear existing token
                sessionStorage.removeItem('mripoti-token');

                // Dispatch the signInUser action
                const response = await dispatch(signInUser(data));

                setTimeout(() =>{
                    reset({
                        username : "",
                        password : ""
                    })
                },500)

                const newToken = response.payload;
                // console.log(newToken);
                if (newToken?.data?.token) {
                    setSucceed(true)
                    setFailed(false)

                    setTimeout(() => {
                         navigate('/dashboard');
                         setSucceed(false);
                    },3000)

                } else {
                    setFailed(true)
                    setSucceed(false);

                    setTimeout(() => {
                        setFailed(false)
                    },4000)
                }
        } catch (error){
            console.log(error)
        }



    };

  const navigate =  useNavigate();

  // console.log( "Succeeded :",succeed);
  // console.log( "Failed :",failed);

  return (
    <ThemeProvider theme={defaultTheme}  >
        <div
            style={{
                width: '100vw',
                height: '100vh',
                background: `url(${bg_image}) center/cover no-repeat`, // Replace with your image path
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 10,
                position: 'relative', // Needed for absolute positioning of children
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0 0.7)', // Adjust the alpha value for transparency
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: 4,
                            padding: 4,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            width: '120%'

                        }}
                    >
                        <Stack>
                            {
                                succeed ? <Alert severity="success">login Successful.</Alert> : <></>
                            }
                            {
                                failed ? <Alert severity="error">login failed please try again.</Alert> : <></>
                            }

                        </Stack>
                        <Avatar sx={{m: 1, width: 64, height: 64, bg: 'gray'}}>
                            <img src={report_icon2} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{color: '#0766AD', fontWeight: 'bold'}}>
                            PPIS
                        </Typography>


                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState}) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        autoComplete="email"
                                        autoFocus
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState}) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />

                                )}
                            />


                            <Grid container>
                                {/* <Grid item>
            <FormControlLabel sx={{mt:1}} variant="body2"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
              </Grid> */}

                                {/* <Grid item xs  sx={{mt:2, ml:14}} >
                <Link   href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}

                            </Grid>

                            <Button
                                // disabled={!isValid || !isDirty}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, backgroundColor: '#1769aa'}}

                                // onClick={() => navigate('/dashboard')}
                            >
                                Sign In
                            </Button>

                        </Box>
                    </Box>
                  
                </Container>
            </div>
        </div>
    </ThemeProvider>
);
}
