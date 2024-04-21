import {
  Box,
  Modal,
  Typography,
  Backdrop,
  Fade,
  Button,
  Tabs,
  Tab,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  TextField,
  Switch,
  ButtonGroup,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import API from "../../api/api";
import AddOptions from "./AddOptions";

const AddField = ({ formID, setPaginationModel }) => {
  const boolRef = useRef(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("general");
  const [chooseField, setChooseField] = useState("text");
  const [label, setLabel] = useState("");
  const [variable, setVariable] = useState("");
  const [required, setRequired] = useState(false);
  const [identity, setIdentity] = useState(false);
  const [toolTip, setToolTip] = useState("");
  const [helpText, setHelpText] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [customAlign, setCustomAlign] = useState(1);
  const [addOptions, setAddOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dateFormat, setDateFormat] = useState("");
  const [error, setError] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const valueToAdd = inputValue.trim();
      if (valueToAdd) {
        setAddOptions([...addOptions, valueToAdd]);
        setInputValue("");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post("v1/form-fields/", {
        form: formID,
        label: label,
        type: chooseField,
        position: customAlign,
        required: required,
        options: addOptions,
      });
      setPaginationModel({
        bool: boolRef.current,
        form: formID,
      });
      boolRef.current = !boolRef.current;
      setShow(false);
      setAddOptions([]);
      setChooseField("text");
      setLabel("");
      setVariable("");
      setRequired(false);
      setIdentity(false);
      setToolTip("");
      setPlaceholder("");
      setCustomAlign(1);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.label);
    }
  };

  return (
    <>
      <Box className="add-field" onClick={() => setShow((e) => !e)}>
        <Typography>Add Field</Typography>
      </Box>

      {show && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={true}
          onClose={() => setShow(null)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          className=""
        >
          <Fade in={!!show}>
            <Box>
              <Box className="">
                <div onClick={() => setShow(null)} className="close-btn">
                  <CloseIcon className="icon" />
                </div>
                <Typography className="" component="h2">
                  Add a Field
                </Typography>

                <Box sx={{ width: "100%" }}>
                  <Box className="btn-group">
                    <Button
                      onClick={() => setValue("general")}
                      variant={value === "general" ? "contained" : "light"}
                    >
                      General
                    </Button>
                    <Button
                      onClick={() => setValue("advanced")}
                      disabled={chooseField !== "radio"}
                      variant={value === "advanced" ? "contained" : "light"}
                    >
                      Advanced
                    </Button>
                    <Button
                      onClick={() => setValue("validation")}
                      disabled={chooseField !== "date"}
                      variant={value === "validation" ? "contained" : "light"}
                    >
                      Validation
                    </Button>
                  </Box>

                  {value === "general" ? (
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 5 }}
                    >
                      <Grid item xs={12}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Choose a Field
                          </FormLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Choose a Field"
                            value={chooseField}
                            onChange={(e) => setChooseField(e.target.value)}
                          >
                            <MenuItem value={"text"}>Text Box</MenuItem>
                            <MenuItem value={"date"}>Date/Time</MenuItem>
                            <MenuItem value={"radio"}>
                              Radio Buttons (Single Answer)
                            </MenuItem>
                          </Select>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className="form-group">
                          <FormLabel
                            htmlFor="name"
                            className="form-label border border-red-400"
                          >
                            Field Label
                          </FormLabel>
                          <textarea
                            rows={5}
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="textarea"
                          ></textarea>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Variable Name<span className="text-red-500">*</span>
                          </FormLabel>
                          <TextField
                            type={"text"}
                            value={variable}
                            onChange={(e) => setVariable(e.target.value)}
                            className="form-control"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Required
                          </FormLabel>
                          <Switch
                            checked={required}
                            onChange={(e) => setRequired(e.target.checked)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Identity
                          </FormLabel>
                          <Switch
                            checked={identity}
                            onChange={(e) => setIdentity(e.target.checked)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Tool Tip
                          </FormLabel>
                          <TextField
                            type={"text"}
                            className="form-control"
                            value={toolTip}
                            onChange={(e) => setToolTip(e.target.value)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Help Text
                          </FormLabel>
                          <TextField
                            type={"text"}
                            value={helpText}
                            onChange={(e) => setHelpText(e.target.value)}
                            className="form-control"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Placeholder Text
                          </FormLabel>
                          <TextField
                            type={"text"}
                            className="form-control"
                            value={placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Choose a Field
                          </FormLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Choose a Field"
                            value={customAlign}
                            onChange={(e) => setCustomAlign(e.target.value)}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                          </Select>
                        </Box>
                      </Grid>
                    </Grid>
                  ) : value === "advanced" && chooseField === "radio" ? (
                    <Box>
                      <Grid item xs={12}>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Add Options<span className="text-red-500">*</span>
                          </FormLabel>
                          <TextField
                            type={"text"}
                            className="form-control"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                        </Box>
                        <AddOptions
                          addOptions={addOptions}
                          setAddOptions={setAddOptions}
                        />
                      </Grid>
                    </Box>
                  ) : (
                    value === "validation" &&
                    chooseField === "date" && (
                      <Box>
                        <Box className="form-group">
                          <FormLabel htmlFor="name" className="form-label">
                            Choose Date Format
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Choose Date Format"
                            value={dateFormat}
                            onChange={(e) => setDateFormat(e.target.value)}
                          >
                            <MenuItem value={"D-M-Y"}>Date (D-M-Y)</MenuItem>
                          </Select>
                        </Box>
                      </Box>
                    )
                  )}
                </Box>
                {error && <Typography>{error}</Typography>}
                <Box className="">
                  <Button variant="light" onClick={() => setShow(null)}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={() => handleSubmit()}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default AddField;
