import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignIn() {

    return (
        <div >
            <div style={{
                display: "flex",
                justifyContent: "center",
                margin: "80px"

            }}>
                <Card
                    style={{
                        width: "500px",
                        padding: "0 2rem 2rem 2rem"
                    }}>
                    <div style={{ textAlign: "center" }}>
                        <h3>Welcome back SignIn below</h3>
                    </div>
                    <div>
                        <TextField fullWidth={true} id="outlined-basic" label="Email" variant="outlined" />
                        <br /><br />
                        <TextField fullWidth={true} id="outlined-basic" label="Password" type={'password'} variant="outlined" />
                    </div>
                    <br /><br />
                    <div>
                        <Button size='large' variant="contained">SignIn</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SignIn;