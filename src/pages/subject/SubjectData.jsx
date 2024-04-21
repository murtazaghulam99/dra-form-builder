import { useEffect, useRef, useState } from "react";
import API from "../../api/api";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormLabel,
  Grid,
  Modal,
  TextField,
  Typography,
  Backdrop,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";
import { formattedDateTime } from "../../utils/functions";

const columns = [
  {
    field: "id",
    headerName: "Subject Id",
    minWidth: 50,
    flex: 1,
  },
  {
    field: "form",
    headerName: "Site Id",
    minWidth: 50,
    flex: 1,
  },
  {
    field: "values",
    headerName: "Field Length",
    minWidth: 50,
    flex: 1,
    renderCell: (params) => {
      return params?.row?.values ? (
        <span>{params?.row?.values?.length}</span>
      ) : (
        <></>
      );
    },
  },
  {
    field: "submitted_at",
    headerName: "Submitted Date",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      return formattedDateTime(params?.row?.submitted_at);
    },
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    flex: 1,
  },
];

const SubjectData = ({ data }) => {
  const { rows, isLoading, setPaginationModel } = data;
  const navigate = useNavigate();

  const boolRef = useRef(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addSubject, setAddSubject] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await API.post("v1/form-responses/", {
        form: addSubject,
      });
      setPaginationModel({
        bool: boolRef.current,
      });
      boolRef.current = !boolRef.current;
      setShow(false);
      setAddSubject("");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            <Tooltip title="Add Data">
              <IconButton
                onClick={() =>
                  navigate(`/subject/${params.row.form}-${params.row.id}`)
                }
              >
                <PostAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View">
              <IconButton
                onClick={() => navigate(`/subject/view/${params.row.id}`)}
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <Box className="data-grid-wrapper" sx={{ height: 550, width: 1 }}>
      <div className="w-full text-right pb-5">
        <Button
          className="custom-btn border border-red-500"
          variant="contained"
          onClick={() => setShow((e) => !e)}
        >
          Add Subject
        </Button>
      </div>
      {rows ? (
        <DataGrid
          {...rows}
          rows={rows}
          getRowId={(rows) => (rows.id ? rows.id : Math.random().toString())}
          rowsPerPageOptions={[10, 25, 50, 100]}
          loading={isLoading}
          columns={[...columns, ...actionColumn]}
          className="custom-data-grid"
          slots={{ toolbar: GridToolbarQuickFilter }}
          slotProps={{
            toolbar: {
              showquickfilter: true,
            },
          }}
        />
      ) : (
        <h2 className="text-center">Please Create Subject</h2>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={show}
        onClose={() => setShow((e) => !e)}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="mx-auto flex justify-center items-center"
      >
        <Fade in={!!show}>
          <Box>
            <Box className="w-[600px] h-[500px] bg-white rounded-2xl p-6">
              <div
                onClick={() => setShow((e) => !e)}
                className="close-btn float-right cursor-pointer bg-[#f8f8f8] rounded-lg p-1"
              >
                <CloseIcon className="icon" />
              </div>
              <h1 className="text-[#475569] text-[14px] font-semibold">
                Add a Form
              </h1>

              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 5 }}
                >
                  <Grid item xs={12}>
                    <Box className="form-group flex flex-col">
                      <label
                        htmlFor="name"
                        className="form-label text-[#0F172A] pb-2 font-semibold text-[14px]"
                      >
                        Form Name<span className="text-red-500">*</span>
                      </label>
                      <TextField
                        type={"text"}
                        value={addSubject}
                        onChange={(e) => setAddSubject(e.target.value)}
                        className="form-control"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="pt-5 flex gap-4">
                <Button variant="light" onClick={() => setShow((e) => !e)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSubmit()}
                  disabled={!addSubject || loading}
                >
                  Submit{" "}
                  {loading && (
                    <CircularProgress className="h-[15px] w-[15px]" />
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default SubjectData;
