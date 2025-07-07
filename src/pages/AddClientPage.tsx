import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import api from "../api/axiosConfig";
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/IconButton';
import MicOffIcon from "@mui/icons-material/MicOff";
import Tooltip from "@mui/material/Tooltip";
import MicButton from "../components/MicButton";


interface AddClientPageProps {
    onClose: () => void;
}

export default function AddClientPage({ onClose }: AddClientPageProps) {
    const [name, setName] = useState("");
    const [dob, setDob] = useState<Date | null>(null);
    const [insuranceType, setInsuranceType] = useState("");
    const [email, setEmail] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [activeField, setActiveField] = useState<null | "name" | "insuranceType" | "email">(null);



    const getSuggestions = async () => {
        if (!name || !dob || !insuranceType || !email) return;

        const formattedDob = format(dob, "yyyy-MM-dd");
        const query = `Suggest best insurance options for a client named ${name}, born on ${formattedDob}, looking for ${insuranceType} insurance.`;

        setLoading(true);
        setSuggestion("");
        setEmailSent(false);

        try {
            const response = await api.post("/ask", { query });
            setSuggestion(response.data.summary);
        } catch (err: any) {
            setSuggestion(`Error: ${err.response?.data?.error || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSpeechToText = (targetField: "name" | "insuranceType" | "email") => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        setIsListening(true);
        setActiveField(targetField);

        recognition.onresult = (event: any) => {
            const spokenText = event.results[0][0].transcript;

            if (targetField === "name") setName(spokenText);
            else if (targetField === "insuranceType") setInsuranceType(spokenText);
            else if (targetField === "email") setEmail(spokenText);

            setIsListening(false);
            setActiveField(null);
        };

        recognition.onerror = (event: any) => {

            alert("Speech recognition failed. Please try again.");
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
            setActiveField(null);

        };

        recognition.onend = () => {
            setIsListening(false);
            setActiveField(null);
        };
    };





    const handleSendEmail = () => {
        // Dummy email send
        setEmailSent(true);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" color="primary" mb={2}>
                Enter Client Details
            </Typography>

            <Box component="form" autoComplete="off" noValidate>
                <Box display="flex" alignItems="center">
                    <TextField
                        label="Client Name"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />

                    <MicButton
                        field="name"
                        isListening={isListening}
                        activeField={activeField}
                        onClick={() => handleSpeechToText("name")}
                    />

                </Box>


                <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(newDate: Date | null) => setDob(newDate)}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            margin: "normal",
                            required: true,
                        },
                    }}
                />


                <Box display="flex" alignItems="center">
                    <TextField
                        label="Insurance Type"
                        fullWidth
                        variant="outlined"
                        value={insuranceType}
                        onChange={(e) => setInsuranceType(e.target.value)}
                        margin="normal"
                        required
                    />

                    <MicButton
                        field="insuranceType"
                        isListening={isListening}
                        activeField={activeField}
                        onClick={() => handleSpeechToText("insuranceType")}
                    />
                </Box>

                <Box display="flex" alignItems="center">
                    <TextField
                        label="Client Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                    />

                    <MicButton
                    field="email"
                    isListening={isListening}
                    activeField={activeField}
                    onClick={() => handleSpeechToText("email")}
                    />

                </Box>


                <Box mt={3}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={getSuggestions}
                        disabled={loading}
                        fullWidth
                        startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    >
                        {loading ? "Loading..." : "Suggest Insurance"}
                    </Button>
                </Box>
            </Box>

            {suggestion && (
                <Box mt={4}>
                    <Typography variant="subtitle1" mb={1}>
                        📋 Suggestion Result
                    </Typography>
                    <Alert severity={suggestion.startsWith("Error") ? "error" : "info"}>
                        <Typography variant="body2" whiteSpace="pre-wrap">
                            {suggestion}
                        </Typography>
                    </Alert>

                    <Box mt={3}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleSendEmail}
                            disabled={!email}
                        >
                            📧 Send Email
                        </Button>

                        {emailSent && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                📬 Email sent successfully!
                            </Alert>
                        )}
                    </Box>
                </Box>
            )}
        </Paper>
    );
}
