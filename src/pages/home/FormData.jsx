import { formattedDateTime } from "../../utils/functions";
import { IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import DomainIcon from "@mui/icons-material/Domain";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 10,
    flex: 1,
  },
  {
    field: "title",
    headerName: "Title",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "form_fields",
    headerName: "Form Fields",
    minWidth: 10,
    flex: 1,
    renderCell: (params) => {
      return params?.row?.form_fields ? (
        <span>{params?.row?.form_fields?.length}</span>
      ) : (
        <></>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Created Date",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      return formattedDateTime(params.row.created_at);
    },
  },
  {
    field: "updated_at",
    headerName: "Updated Date",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      return formattedDateTime(params.row.updated_at);
    },
  },
];

const FormData = ({ data, isLoading }) => {
  const navigate = useNavigate();

  const actionColumn = [
    {
      field: "action",
      headerName: "Action Column",
      minWidth: 10,
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
            <Tooltip title="Build Form">
              <IconButton onClick={() => navigate(`/${params.row.id}`)}>
                <DomainIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    data && (
      <DataGrid
        {...data}
        rows={data}
        getRowId={(rows) => rows?.id}
        rowsPerPageOptions={[10, 25, 50, 100]}
        loading={isLoading}
        columns={[...columns, ...actionColumn]}
        className="custom-data-grid"
        slots={{ toolbar: GridToolbarQuickFilter }}
      />
    )
  );
};

export default FormData;
