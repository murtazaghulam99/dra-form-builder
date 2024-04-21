import {
  Box,
  Modal,
  Typography,
  Backdrop,
  Fade,
  Button,
  Grid,
  FormLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import CollapsedBreadcrumbs from "../../components/CollapsedBreadcrumbs";
import FormData from "./FormData";
import { useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const items = [
  { url: "/", label: "Home" },
  { url: "ecrf", label: "eCRF" },
];

function useQuery(paginationModel) {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`v1/forms/`);

        setIsLoading(false);
        setRows(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, [paginationModel]);

  return { isLoading, rows };
}

const Home = () => {
  const boolRef = useRef(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addFrom, setAddForm] = useState("");
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({});
  const navigate = useNavigate();
  const { isLoading, rows } = useQuery(paginationModel);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await API.post("v1/forms/", {
        title: addFrom,
      });
      setPaginationModel({
        bool: boolRef.current,
      });
      boolRef.current = !boolRef.current;
      setShow(false);
      setAddForm("");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="home">
      <CollapsedBreadcrumbs maxItems={2} items={items} separator="›" />
      <h1 className="text-[24px] text-[#0F172A] font-bold mb-5">eCRF</h1>
      <Box className="data-grid-wrapper" sx={{ height: 500, width: 1150 }}>
        <div className="gap-x-5 pb-[-10rem] flex justify-end">
          <Button variant="contained" onClick={() => navigate("/subject")}>
            Subject
          </Button>
          <Button variant="contained" onClick={() => setShow((e) => !e)}>
            New Form
          </Button>
        </div>
        <FormData data={rows} isLoading={isLoading} />
      </Box>

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
        className="mx-auto flex justify-center items-center rounded-3xl"
      >
        <Fade in={!!show}>
          <div classNa="">
            <Box className=" bg-white w-[500px] h-[500px] rounded-2xl p-6">
              <div
                onClick={() => setShow((e) => !e)}
                className="close-btn bg-[#f8f8f8] rounded-lg cursor-pointer p-1 float-right"
              >
                <CloseIcon className="icon" />
              </div>
              <h1 className="text-[14px] text-[#475569] font-semibold">
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
                        className="form-label text-[#0F172A] text-[14px] font-semibold pb-2"
                      >
                        Form Name<span className="text-red-500">*</span>
                      </label>
                      <TextField
                        type={"text"}
                        value={addFrom}
                        onChange={(e) => setAddForm(e.target.value)}
                        className="form-control"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="pt-5">
                <Button variant="light" onClick={() => setShow((e) => !e)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSubmit()}
                  disabled={!addFrom || loading}
                >
                  Submit
                  {loading && (
                    <CircularProgress className="h-[15px] w-[15px]" />
                  )}
                </Button>
              </Box>
            </Box>
          </div>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Home;
