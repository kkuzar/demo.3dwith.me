import React, {ReactNode} from "react";
import {Container, Link, makeStyles, Typography, CssBaseline, Box, Grid} from '@material-ui/core';
export interface LayoutChild {
    children: ReactNode,
    title: string
}

function Copyright() {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://demo.3dwith.me/">
                demo.3dwith.me
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CenterLayout = (props: LayoutChild) => {
    const classes = useStyles();
    const {children , title} = props;
    return(
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    {title}
                </Typography>

                <Grid container
                      className={classes.form}
                      justify="center"
                >
                    {children}
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default CenterLayout;
