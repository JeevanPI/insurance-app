// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Modal,
    Box,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import DashboardPage from "./pages/DashboardPage";
import AddClientPage from "./pages/AddClientPage";
import QuoteComparisonPage from "./pages/QuoteComparisonPage";


const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    width: "90%",
    maxWidth: 600,
    maxHeight: "90vh",
    overflowY: "auto",
};

export default function App() {
    const [openModal, setOpenModal] = useState<"upload" | "addClient" | null>(null);
    const handleClose = () => setOpenModal(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [showCompareModal, setShowCompareModal] = useState(false);


    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {/* Header */}
                <AppBar position="static" color="primary" elevation={3}>
                    <Toolbar className="justify-between">

                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={() => setOpenModal("upload")}
                            sx={{
                                bgcolor: "white",
                                color: "primary.main",
                                borderColor: "white",
                                "&:hover": { bgcolor: "grey.100" },
                            }}
                        >
                            📤 Upload PDF
                        </Button>

                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            sx={{ textAlign: "center", flexGrow: 1, color: "white", fontWeight: 600 }}
                        >
                            Insurance Suggestion
                        </Typography>

                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={() => setOpenModal("addClient")}
                            sx={{
                                bgcolor: "white",
                                color: "primary.main",
                                borderColor: "white",
                                "&:hover": { bgcolor: "grey.100" },
                            }}
                        >
                            👤 Add Client
                        </Button>

                        {/* Compare Quotes Modal - 👇 this one */}
                        <Modal open={showCompareModal} onClose={() => setShowCompareModal(false)}>
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    p: 4,
                                    maxWidth: 900,
                                    mx: "auto",
                                    my: 6,
                                    borderRadius: 2,
                                    boxShadow: 24,
                                    maxHeight: "90vh",
                                    overflow: "auto",
                                }}
                            >
                                <QuoteComparisonPage />
                                <Box textAlign="right" mt={2}>
                                    <Button variant="contained" onClick={() => setShowCompareModal(false)}>
                                        Close
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>

                    </Toolbar>
                </AppBar>

                {/* Body content placeholder */}
                <Box className="text-center p-10">
                    <Typography variant="body1" color="text.secondary">
                        Welcome! Click a button above to get started.
                    </Typography>
                </Box>

                {/* Modal (Shared for both actions) */}
                <Modal open={!!openModal} onClose={handleClose}>
                    <Box sx={modalStyle} position="relative">
                        <IconButton
                            onClick={handleClose}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {openModal === "upload" && (
                            <>
                                <Typography variant="h6" mb={2}>Upload PDF</Typography>
                                <DashboardPage />
                            </>
                        )}
                        {openModal === "addClient" && (
                            <>
                                <Typography variant="h6" mb={2}>Add Client</Typography>
                                <AddClientPage onClose={handleClose} />
                            </>
                        )}
                    </Box>
                </Modal>

                <Box className="text-center mt-16 px-4 max-w-3xl mx-auto">
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                        Welcome to the Insurance Suggestion Portal
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Effortlessly upload insurance PDFs and receive tailored insurance advice for your clients.
                        Use the buttons above to start uploading files or generate suggestions instantly.
                    </Typography>

                    <Box
                        sx={{
                            bgcolor: "grey.100",
                            borderRadius: 2,
                            p: 3,
                            mt: 4,
                            boxShadow: 1,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            🔐 Your uploaded files are securely processed and only used to generate insights — we do not store any client data permanently.
                        </Typography>
                    </Box>
                </Box>


                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setShowCompareModal(true)}
                >
                    Compare Quotes
                </Button>

            </div>
        </Router>
    );
}
