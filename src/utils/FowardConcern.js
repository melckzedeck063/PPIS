import React, {useEffect, useState} from 'react';

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
import {useNavigate} from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Stack} from "@mui/material";
import {assignMinister, createMinistry, getAllMinstries} from "../store/actions/ministry_actions";
import {getAllStaffs} from "../store/actions/users_actions";
import {fowardConcern} from "../store/actions/concern_actions";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                www.ega.go.tz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Schema = Yup.object({
    concernUuid: Yup.string().required().trim(),
    ministerUuid : Yup.string().required()
    // Uncomment the following lines if you want to include password and confirm password fields
    // password: Yup.string().required().min(6),
    // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function AssignMinister({uuid,category}) {

    const navigate =  useNavigate();
    const dispatch = useDispatch();

    const [succeed, setSucceed]  =  useState(false);
    const [failed, setFailed] = useState(false);
    const [reload, setReload] = useState(0);


    const all_ministries = useSelector(state => state.ministries);

    useEffect(() => {
        if (all_ministries && all_ministries.ministries && all_ministries.ministries.length < 1 && reload <= 2) {
            dispatch(getAllMinstries());
            setReload(prevReload => prevReload + 1);
        }
    }, [dispatch, reload]);
    const rows = all_ministries?.ministries?.content || [];

    const {control, handleSubmit,reset, formState,setError,isSubmitSuccesful} =  useForm({
        resolver :yupResolver(Schema)
    });
    const onSubmit = async (data) => {

        try {

            const response = await dispatch(fowardConcern(data));

            console.log(data);
            setTimeout(() =>{
                reset({
                    name : "",
                    shortCode : "",

                })
            },500)

            const newToken = response.payload;
            // console.log(newToken);
            if (newToken?.data?.active) {
                setSucceed(true)
                setFailed(false)

                setTimeout(() => {
                    setSucceed(false);
                    dispatch(getAllMinstries())
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

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Stack>
                        {
                            succeed ? <Alert severity="success">Concern Fowarded Successful.</Alert> : <></>
                        }
                        {
                            failed ? <Alert severity="error">Request failed please try again.</Alert>  : <></>
                        }

                    </Stack>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        {/*<img src={report_icon} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>*/}
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Foward Concern
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                        {/*<Grid container spacing={2}>*/}

                        {/*{*/}
                        {/*    all_ministries && all_ministries.ministries &&  all_ministries.ministries.data && (*/}
                        {/*        all_ministries.ministries.data?(*/}
                                        <>
                                            <Controller
                                                name="concernUuid"
                                                control={control}
                                                defaultValue={uuid}
                                                render={({field,fieldState})=>(
                                                    <TextField
                                                        {...field}
                                                        autoComplete="given-name"
                                                        name="name"
                                                        required
                                                        fullWidth
                                                        id="name"
                                                        label="Ministry name"
                                                        autoFocus
                                                        error={Boolean(fieldState.error)}
                                                        helperText={fieldState.error?.message}
                                                        sx={{mt : 1, display : 'none'}}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="category"
                                                control={control}
                                                defaultValue={category}
                                                render={({field,fieldState})=>(
                                                    <TextField
                                                        {...field}
                                                        autoComplete="given-name"
                                                        name="category"
                                                        required
                                                        fullWidth
                                                        id="category"
                                                        label="Concern Category"
                                                        autoFocus
                                                        error={Boolean(fieldState.error)}
                                                        helperText={fieldState.error?.message}
                                                        sx={{mt : 1}}
                                                    />
                                                )}
                                            />



                                            <Controller
                                                name="ministerUuid"
                                                control={control}
                                                defaultValue=""
                                                render={({ field,fieldState }) =>(
                                                    <TextField
                                                        {...field}
                                                        required
                                                        fullWidth
                                                        id="minister"
                                                        label="Select Ministry"
                                                        select  // Add select prop to indicate it's a select input
                                                        autoFocus
                                                        autoComplete="family-name"
                                                        error={Boolean(fieldState.error)}
                                                        helperText={fieldState.error?.message}
                                                        sx={{mt:3}}
                                                    >
                                                        <MenuItem >SELECT MINISTRY</MenuItem>
                                                        {Array.isArray(rows) && (
                                                            rows.map((item,index) => (
                                                                <MenuItem value={item.uuid}> {item.name} </MenuItem>
                                                            ))
                                                        )}

                                                    </TextField>
                                                )}
                                            />

                                            <Grid item xs={12}>

                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Foward
                                            </Button>


                                        </>

                        <Grid container justifyContent="flex-end">

                        </Grid>
                        {/*</Grid>*/}

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
