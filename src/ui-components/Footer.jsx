// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const Footer = () => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="xl" sx={{display:{xs:'none',sm:'none',md:'block'}}}>
            <Stack
                direction={matchDownSM ? 'column' : 'row'}
                justifyContent={matchDownSM ? 'center' : 'space-between'}
                spacing={2}
                textAlign={matchDownSM ? 'center' : 'inherit'}
            >
                <Typography variant="subtitle2" color="secondary" component="span">
                    &copy; 2022 SG - SKILLGLOW By &nbsp;
                    <Typography component={Link} variant="subtitle2" href="#" target="_blank" underline="hover" color='inherit'>
                    BEYONDEX SOLUTIONS
                    </Typography>
                </Typography>

                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={matchDownSM ? 1 : 3}
                    textAlign={matchDownSM ? 'center' : 'inherit'}
                >
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href=""
                        target="_blank"
                        underline="hover"
                    >
                        {/* MUI Templates */}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href=""
                        target="_blank"
                        underline="hover"
                    >
                        {/* Privacy Policy */}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href=""
                        target="_blank"
                        underline="hover"
                    >
                        {/* Support */}
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Footer;
