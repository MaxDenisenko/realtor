import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { AuthRegistrationAction } from '../redux/actions/auth.action';
import ErrorMsg from '../ext/error';
import { REGISTRATION } from '../redux/const';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://maxdenisenko.ru/">
        https://MaxDenisenko.ru
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Registration() {
  const dispatch = useDispatch()


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email').toLowerCase()
    let password = data.get('password')
    let name = data.get('name')
    let lastname = data.get('lastname')
    dispatch(AuthRegistrationAction(email, password, name, lastname))
    dispatch({type: REGISTRATION})
  };

  const handleSignIn = () => {
    dispatch({type: REGISTRATION})
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black'}}>
            <NightShelterOutlinedIcon/>
          </Avatar>
          <Typography component="h3" variant="h3">
            Realtor App
          </Typography>
          <Typography component="h5" variant="h5">
            (Черный список арендаторов)
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Имя пользователя"
              id="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="Фамилия пользователя"
              id="lastname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Пароль"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Регистрация
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={handleSignIn}>
                  {"Войти"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}