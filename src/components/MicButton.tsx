import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface MicButtonProps {
    field: "name" | "insuranceType" | "email";
    isListening: boolean;
    activeField: string | null;
    onClick: () => void;
}

const MicButton: React.FC<MicButtonProps> = ({ field, isListening, activeField, onClick }) => (
    <Tooltip title={isListening && activeField === field ? "Listening..." : "Speak"}>
        <IconButton
            onClick={onClick}
            color={isListening && activeField === field ? "error" : "primary"}
            sx={{ ml: 1, mt: "8px", height: "fit-content" }}
            aria-label={`Mic for ${field}`}
        >
            {isListening && activeField === field ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
    </Tooltip>
);

export default MicButton;
