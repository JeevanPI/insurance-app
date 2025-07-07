// src/pages/DashboardPage.tsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Paper,
    LinearProgress,
    Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import api from "../api/axiosConfig";


export default function DashboardPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);


    const handleUpload = async () => {
        if (!file) {
            setStatus("❗ Please choose a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setStatus("Uploading...");
            const response = await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setStatus(`✅ Uploaded: ${response.data.insertedCount} chunks`);
        } catch (err: any) {
            setStatus(`❌ Upload failed: ${err.response?.data?.error || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" mb={2} color="primary">
                Upload Insurance PDF
            </Typography>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                >
                    Choose PDF File
                    <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </Button>
            </Box>

            {file && (
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Selected file: <strong>{file.name}</strong>
                </Typography>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={loading}
                fullWidth
            >
                {loading ? "Uploading..." : "Upload PDF"}
            </Button>

            {loading && (
                <Box mt={2}>
                    <LinearProgress />
                </Box>
            )}

            {status && (
                <Box mt={3}>
                    <Alert severity={status.startsWith("✅") ? "success" : "error"}>
                        {status}
                    </Alert>
                </Box>
            )}
        </Paper>
    );
}
