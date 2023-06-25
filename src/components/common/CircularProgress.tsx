import { Typography, Box, CircularProgress } from "@mui/material";

const CircularProgressBar = (
  props: any
) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress color={props.color} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.primary"
          fontSize="14px"
        >
          {props.textnode}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;
