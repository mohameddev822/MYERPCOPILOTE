import { Fab  } from '@mui/material';
import CustomIcon from './iconfab'

export default function Chatbotpoint({ size, color, ariaLabel, type , className , onClick }) {
    return (
        <div>
            <div className={className}>
                <Fab onClick={onClick} size={size} color={color} aria-label={ariaLabel}>
                    <CustomIcon type = {type} />
                </Fab>
            </div>        
        </div>
    );
}