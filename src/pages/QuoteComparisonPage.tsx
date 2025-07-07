import React from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

// Define strict keys
type CoverageKey = "Public Liability" | "Employers’ Liability" | "Excess" | "Premium";

// Use these as rows
const coverages: CoverageKey[] = [
    "Public Liability",
    "Employers’ Liability",
    "Excess",
    "Premium",
];

// Define a shared type
type CoverageData = Record<CoverageKey, string>;

const expiring: CoverageData = {
    "Public Liability": "£2M",
    "Employers’ Liability": "£10M",
    "Excess": "£500",
    "Premium": "£1,200",
};

const quoteA: CoverageData = {
    "Public Liability": "£5M",
    "Employers’ Liability": "£10M",
    "Excess": "£1,000",
    "Premium": "£1,450",
};

const quoteB: CoverageData = {
    "Public Liability": "£5M",
    "Employers’ Liability": "£5M",
    "Excess": "£250",
    "Premium": "£990",
};

export default function QuoteComparisonPage() {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Coverage Comparison Table
            </Typography>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Coverage</TableCell>
                            <TableCell>Expiring</TableCell>
                            <TableCell>Quote A</TableCell>
                            <TableCell>Quote B</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coverages.map((coverage) => (
                            <TableRow key={coverage}>
                                <TableCell>{coverage}</TableCell>
                                <TableCell>{expiring[coverage]}</TableCell>
                                <TableCell>{quoteA[coverage]}</TableCell>
                                <TableCell>{quoteB[coverage]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}
