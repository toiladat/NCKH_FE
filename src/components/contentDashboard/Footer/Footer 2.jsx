import { Box, Typography, Link, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.customColors.darkBlue,
                color: "#ffffff",
                py: 4,
                px: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Logo / Tên Dự Án */}
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                HelpMap
            </Typography>

            {/* Các liên kết nhanh */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                <Link href="#" underline="hover" sx={{ color: "#ffffff", fontSize: "14px" }}>
                    Về chúng tôi
                </Link>
                <Link href="#" underline="hover" sx={{ color: "#ffffff", fontSize: "14px" }}>
                    Liên hệ
                </Link>
                <Link href="#" underline="hover" sx={{ color: "#ffffff", fontSize: "14px" }}>
                    Điều khoản
                </Link>
            </Box>

            {/* Social Media */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <IconButton sx={{ color: "#ffffff" }}><FacebookIcon /></IconButton>
                <IconButton sx={{ color: "#ffffff" }}><TwitterIcon /></IconButton>
                <IconButton sx={{ color: "#ffffff" }}><GitHubIcon /></IconButton>
            </Box>

            {/* Copyright */}
            <Typography variant="body2" sx={{ fontSize: "12px", opacity: 0.7 }}>
                © {new Date().getFullYear()} HelpMap. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
