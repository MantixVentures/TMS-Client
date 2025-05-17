import { Avatar, Box, IconButton, Typography } from "@mui/material"
import COLORS from "../../utils/Colors";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserCard = ({profileImg, name, station, batchID, id, contactInfo }) => {

    const navigate = useNavigate();
    const handleColor = (state)=> {
        if(state === 'Active') return COLORS.green1  
        if(state === 'Not Active') return 'red'
    }
    const deletePoliceOfficer = async(id) => {
        try{
            console.log(id);
            const response = await axios.delete(`https://tms-server-rosy.vercel.app/policeOfficers/delete/${id}`)
            console.log("delete responce", response);
            window.location.reload();
        }
        catch(err) {
            console.error(err)
        }
    }
    return(
        <Box sx={{
            width:'100%',
            height:'50px',
            border:`1px solid ${COLORS.bgBlue}`,
            borderRadius:'10px',
            alignItems:'center',
            mt:1,
            display:'flex',
            px:{xs:'auto',md:2},
            justifyContent:"space-between"
        }}>

            <Avatar src={profileImg}/>
            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{name}</Typography>
            </Box>
            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{station}</Typography>
            </Box>
            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{batchID}</Typography>
            </Box>
            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{contactInfo}</Typography>
            </Box>
            
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                borderRadius:'10px'
            }}>
                <IconButton onClick={() => deletePoliceOfficer(id)} >
                    <DeleteIcon/>
                </IconButton>
                <IconButton onClick={()=>navigate(`/editAdmin/${id}`)}>
                    <EditIcon/>
                </IconButton>

            </Box>
        </Box>
    )
}

export default UserCard;