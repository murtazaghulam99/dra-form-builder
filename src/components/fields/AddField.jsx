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
  CircularProgress,
  TextareaAutosize,
} from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log({ error });

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
    setLoading(true);
    try {
      const response = await API.post("v1/form-fields/", {
        form: formID,
        label: label,
        type: chooseField,
        position: customAlign,
        validataion_rules: variable,
        tooltip: toolTip,
        placeholder_text: placeholder,
        help_text: helpText,
        required: required,
        options: addOptions,
      });
      console.log(response);
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
      setValue("general");
    } catch (error) {
      if (error?.response?.data) {
        const errorVal = Object.values(error?.response?.data)[0];
        setError(errorVal);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="add-field" onClick={() => setShow((e) => !e)}>
        <Typography>Add Field</Typography>
      </Box>

      {show && (
        <Modal
          aria-labelledby=""
          aria-describedby=""
          open={true}
          onClose={() => setShow(null)}
          closeAfterTransition
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          className="flex justify-center items-center"
        >
          <Fade in={!!show} className="outline-none border-0">
            <Box className="">
              <Box className=" bg-white mx-auto container w-full max-w-[700px] rounded-2xl p-5">
                <div
                  onClick={() => setShow(null)}
                  className="close-btn float-right bg-[#F1F5F9] rounded-lg p-1 w-fit"
                >
                  <CloseIcon className="icon" />
                </div>
                <h1 className="font-semibold pb-3 text-[14px] text-[#475569]">
                  Add a Field
                </h1>

                <Box sx={{ width: "100%" }}>
                  <Box className="btn-group flex gap-x-3">
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
                      <Grid item xs={12} className="">
                        <Box className="form-group flex flex-col">
                          <label
                            htmlFor="name"
                            className="form-label text-[14px] text-[#0F172A] pt-4 pb-2 font-semibold"
                          >
                            Choose a Field
                          </label>
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
                        <Box className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="text-[14px] text-[#0F172A] pt-4 pb-2 font-semibold"
                          >
                            Field Label
                          </label>
                          <TextareaAutosize
                            rows={12}
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="textarea border rounded-md px-3 pb-10 pt-3"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <div className="flex flex-col pt-3">
                            <label
                              htmlFor="name"
                              className="text-[14px]  font-semibold pb-2"
                            >
                              Variable Name
                              <span className="text-red-500">*</span>
                            </label>
                            <TextField
                              type={"text"}
                              value={variable}
                              onChange={(e) => setVariable(e.target.value)}
                              className="form-control border-[#94A3B8] border-4 rounded-2xl"
                            />
                          </div>
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className="form-group pt-3">
                          <label
                            htmlFor="name"
                            className="font-semibold text-[14px]"
                          >
                            Required
                          </label>
                          <Switch
                            checked={required}
                            onChange={(e) => setRequired(e.target.checked)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className="pt-3">
                          <label
                            htmlFor="name"
                            className="font-semibold text-[14px]"
                          >
                            Identity
                          </label>
                          <Switch
                            checked={identity}
                            onChange={(e) => setIdentity(e.target.checked)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <div className="flex flex-col pt-3">
                            <label
                              htmlFor="name"
                              className="font-semibold text-[14px] pb-2"
                            >
                              Tool Tip
                            </label>
                            <TextField
                              type={"text"}
                              className="form-control"
                              value={toolTip}
                              onChange={(e) => setToolTip(e.target.value)}
                            />
                          </div>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <div className="flex flex-col pt-3">
                            <label
                              htmlFor="name"
                              className="font-semibold text-[14px] pb-2"
                            >
                              Help Text
                            </label>
                            <TextField
                              type={"text"}
                              value={helpText}
                              onChange={(e) => setHelpText(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group pt-2">
                          <div className="flex flex-col pt-3">
                            <label
                              htmlFor="name"
                              className="font-semibold text-[14px] pb-2"
                            >
                              Placeholder Text
                            </label>
                            <TextField
                              type={"text"}
                              className="form-control"
                              value={placeholder}
                              onChange={(e) => setPlaceholder(e.target.value)}
                            />
                          </div>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group pt-2">
                          <div className="flex flex-col pt-3">
                            <label
                              htmlFor="name"
                              className="font-semibold text-[14px] pb-2"
                            >
                              Custom Alignment
                            </label>
                            <TextField
                              type={"number"}
                              className="form-control"
                              value={customAlign}
                              onChange={(e) => setCustomAlign(e.target.value)}
                            />
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  ) : value === "advanced" && chooseField === "radio" ? (
                    <Box>
                      <Grid item xs={12}>
                        <Box className="form-group flex mt-5 flex-col">
                          <label
                            className="text-[14px] pb-2 font-semibold"
                            htmlFor="name"
                          >
                            Add Options<span className="text-red-600">*</span>
                          </label>
                          <TextField
                            type={"text"}
                            className="form-control"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                        </Box>
                        {console.log({ addOptions })}
                        <AddOptions
                          addOptions={addOptions}
                          setAddOptions={setAddOptions}
                        />
                      </Grid>
                    </Box>
                  ) : (
                    value === "validation" &&
                    chooseField === "date" && (
                      <Box className="">
                        <Box className="form-group flex mt-4 flex-col pb-3">
                          <label
                            htmlFor="name"
                            className="text-[14px] pb-2 font-semibold"
                          >
                            Choose Date Format
                            <span className="text-red-600">*</span>
                          </label>
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
                <Box className="pb-3 pt-7 gap-x-4 flex">
                  <Button variant="light" onClick={() => setShow(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit()}
                    disabled={
                      (!label &&
                        !customAlign &&
                        !chooseField &&
                        chooseField === "radio" &&
                        addOptions) ||
                      loading
                    }
                  >
                    Save
                    {loading && (
                      <CircularProgress className="h-[15px] w-[15px]" />
                    )}
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
