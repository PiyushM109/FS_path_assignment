import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { browserHistory } from 'react-router'

function Appbar() {

    return (
        <div style={{ display:"flex", justifyContent:"space-between"}} >
            <div>
                <Typography variant="h4" >
                    PathShala📚
                </Typography>
            </div>
            <div >
                <Button style={{marginRight:"1rem"}} variant="contained" 
                onClick={()=>{
                    window.location="/signup"
                    // browserHistory.push('/signup')
                }}>SignUp</Button>
                <Button variant="contained"
                onClick={()=>{
                    window.location="/signin"
                    // browserHistory.push('/signin')
                }}>SignIn</Button>
            </div>
        </div>

    );
}

export default Appbar;