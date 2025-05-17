import {  Box, IconButton, Typography } from "@mui/material"
import COLORS from "../../utils/Colors";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const FinesCard = ({ offence, nature, type, fineamount, fineid}) => {

    const navigate = useNavigate();

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

            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{offence}</Typography>
            </Box>
            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{nature}</Typography>
            </Box>
            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{type}</Typography>
            </Box>
            <Box sx={{width:'15%'}}>
            <Typography sx={{textAlign:'left'}}>{fineamount}</Typography>
            </Box>
            
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                borderRadius:'10px'
            }}>
                <IconButton sx={{ color: "white" }}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton sx={{ color: "white" }} onClick={()=>navigate(`/editFines/${fineid}`)}>
                    <EditIcon/>
                </IconButton>

            </Box>
        </Box>
    )
}

export default FinesCard;