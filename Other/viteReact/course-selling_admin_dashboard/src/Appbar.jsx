import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
                }}>SignUp</Button>
                <Button variant="contained"
                onClick={()=>{
                    window.location="/signin"
                }}>SignIn</Button>
            </div>
        </div>

    );
}

export default Appbar;