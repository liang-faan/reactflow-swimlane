import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "reactflow/dist/style.css";
import {
  Autocomplete,
  Box,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ReactFlowProvider } from "reactflow";
import { SAMPLE_FLOW } from "./examples/sample-flow-data";
import { SwimlaneFlowInput } from "./include/swimlane-flow-types";
import SwimlaneFlow from "./layout/SwimlaneFlow";

function App() {
  const [selectedFlow, setSelectedFlow] = useState<
    SwimlaneFlowInput | null | undefined
  >(SAMPLE_FLOW[0]);
  const handleSampleChange = (e: any, item: SwimlaneFlowInput | null) => {
    if (!item || item == null) setSelectedFlow(SAMPLE_FLOW[0]);
    setSelectedFlow(item);
  };
  return (
    <Box sx={{ height: "100vh", position: "obsolete" }}>
      <Grid key={"main_board"} container>
        <Grid key={"main_header"} item xs={12} className="App-header">
          <Autocomplete
            options={SAMPLE_FLOW}
            value={selectedFlow}
            onChange={handleSampleChange}
            getOptionLabel={(option) => option.id}
            sx={{
              width: 600,
              backgroundColor: "#d2f6f6",
              // color: "white",
              borderRadius: 2,
            }}
            renderInput={(params) => (
              <TextField color="primary" {...params} label="" />
            )}
          />
          {/* <Typography>Choose your sample flow.</Typography> */}
        </Grid>
        <Grid key={"main_body"} className="App-ViewPoint" item xs={12}>
          <ReactFlowProvider>
            <SwimlaneFlow selectedFlow={selectedFlow} rankDirection="LR" />
          </ReactFlowProvider>
        </Grid>
        <Grid key={"main_foot"} item xs={12} className="App-Footer">
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{
                display: "grid",
                justifyContent: "start",
              }}
            >
              <img src={logo} className="App-logo" alt="logo" />
            </Grid>
            <Grid item xs={6} sx={{ justifyContent: "end", display: "grid" }}>
              <Typography>
                Contributed by{" "}
                <Link href="https://github.com/liang-faan" about="_blank">
                  <u>Liang Faan</u>
                </Link>
                .
              </Typography>
              <br />
              <Link
                about="_blank"
                href="mailto:liang.faan@gmail.com?subject:Swimlane Workflow"
              >
                {"Contact: liang.faan@gmail.com"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
