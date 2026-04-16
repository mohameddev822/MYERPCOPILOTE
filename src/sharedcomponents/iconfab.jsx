
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
export default function CustomIcon({ type }) {
    
    switch(type) {
        case "add": 
            return <AddIcon />;
        case "send":
            return <SendIcon />;
        default:
            return null;
    }
}