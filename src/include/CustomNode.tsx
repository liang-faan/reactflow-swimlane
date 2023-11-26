import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";

export default memo((props: any) => {
  const { data } = props;
  return (
    <Box>
      <Typography variant="h5" component="h5">
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Right} id="right" />
    </Box>
  );
});
