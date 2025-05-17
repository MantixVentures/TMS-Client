import { Box, Button, TextField, Typography } from "@mui/material";
import COLORS from "../../utils/Colors";

const EditFines = () => {
    return(
        <Box sx={{
            width:'100%',
            height:'80vh',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',

        }}>
            <Box sx={{
                width:'100%',
                mb:5
            }}>
            <Typography sx={{
                color:COLORS.black,
                fontSize:{xs:'auto',md:'20px'},
                textAlign:'left'
            }}>Edit Fines Details</Typography>
            </Box>
           <Box sx={{
            display:'flex',
            flexDirection:'column',
            width:{xs:'100%',md:'70%'},
            mt:5,
            gap:2
           }}>
           <TextField fineid="outlined-basic" label="Offence" variant="outlined" />
           <TextField fineid="outlined-basic" label="Nature" variant="outlined" />
           <TextField fineid="outlined-basic" label="Type" variant="outlined" />
           <TextField fineid="outlined-basic" label="Fine Amount" variant="outlined" />
           <Box sx={{
            display:'flex',
            justifyContent:'end',
            width:'100%',
            mt:2
           }}>
            <Button sx={{
                bgcolor:COLORS.lightBlue2,
                color:COLORS.white,
                borderRadius:'20px',
                px:2,
                fontWeight:500
            }}>Submit</Button>
           </Box>
           </Box>
        </Box>
    )
}

export default EditFines;