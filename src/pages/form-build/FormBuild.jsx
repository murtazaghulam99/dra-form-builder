import React, { useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CollapsedBreadcrumbs from "../../components/CollapsedBreadcrumbs";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import ActionButtons from "../../components/ActionButtons";
import CustomTextField from "../../components/fields/TextFields";
import AddField from "../../components/fields/AddField";
import { view } from "../../assets";

const items = [{ url: "/", label: "Home" }];

function useQuery(paginationModel) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`v1/forms/${paginationModel.form}`);

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

const FormBuild = () => {
  const { formId } = useParams();
  const [paginationModel, setPaginationModel] = useState({
    form: formId || "",
  });

  const { isLoading, rows } = useQuery(paginationModel);

  return (
    <Box className="form-build">
      <CollapsedBreadcrumbs
        maxItems={2}
        items={[...items, { label: rows?.title || "" }]}
        separator="›"
      />
      <Box className="flex justify-between mb-2">
        <Typography as="h2" className="">
          {rows?.title}
        </Typography>
        <Button>
          <img src={view} alt="view" />
        </Button>
      </Box>
      <Box className="form-build-wrapper bg-[#F1F5F9] rounded-lg p-5">
        <Box className="form-build-section">
          <div className="mb-4">
            <ActionButtons />
          </div>
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            rows?.form_fields?.map((field, index) => (
              <div key={index} className="bg-[#E2E8F0] rounded-md p-5 my-4">
                <CustomTextField
                  index={index}
                  tooltip={field.tooltip}
                  type={field.type}
                  placeholder={field.placeholder_text}
                  name={field.id}
                  id={field.id}
                  label={field.label}
                  options={field.options}
                  helpText={field.help_text}
                />
              </div>
            ))
          )}
          <div className="text-center border-2 border-dashed py-3 mt-5 text-[16px] font-medium rounded-md text-[#0E6ACE] border-[#0E6ACE]">
            <AddField
              className="text-center"
              formID={formId}
              isLoading={isLoading}
              setPaginationModel={setPaginationModel}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default FormBuild;
