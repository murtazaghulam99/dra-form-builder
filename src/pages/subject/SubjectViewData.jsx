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
import DomainIcon from "@mui/icons-material/Domain";
import InputIcon from "@mui/icons-material/Input";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate, useParams } from "react-router-dom";
import { formattedDateTime } from "../../utils/functions";
import CollapsedBreadcrumbs from "../../components/CollapsedBreadcrumbs";

const items = [
  { url: "/", label: "Home" },
  { url: "/subject", label: "Subject" },
];

const columns = [
  {
    field: "id",
    headerName: "Id",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "value",
    headerName: "Value",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    flex: 1,
  },
];

const SubjectViewData = () => {
  const { formId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`v1/form-responses/${formId}`);
        if (response.data?.values) {
          setData(response.data?.values);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <Box className="subject">
      <CollapsedBreadcrumbs
        maxItems={2}
        items={[...items, { label: formId || "" }]}
        separator="›"
      />
      <Typography as="h2" className="py-2">
        Subject
      </Typography>
      <Box className="data-grid-wrapper" sx={{ height: 500, width: 1150 }}>
        {data ? (
          <DataGrid
            {...data}
            rows={data}
            getRowId={(rows) => (rows.id ? rows.id : Math.random().toString())}
            rowsPerPageOptions={[10, 25, 50, 100]}
            loading={isLoading}
            columns={columns}
            className="custom-data-grid"
            slots={{ toolbar: GridToolbarQuickFilter }}
            slotProps={{
              toolbar: {
                showquickfilter: true,
              },
            }}
          />
        ) : (
          <h2 className="text-center">Please Add Subject Data</h2>
        )}
      </Box>
    </Box>
  );
};

export default SubjectViewData;
