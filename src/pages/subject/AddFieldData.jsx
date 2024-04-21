import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import CollapsedBreadcrumbs from "../../components/CollapsedBreadcrumbs";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import CustomTextField from "../../components/fields/TextFields";

const items = [
  { url: "/", label: "home" },
  { url: "/subject", label: "subject" },
];

function useQuery(paginationModel) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [subjectData, setSubjectData] = React.useState([]);
  const [viewData, setViewData] = React.useState([]);

  React.useEffect(() => {
    const fetchFormData = async () => {
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

    const fetchRespponseData = async () => {
      try {
        const response = await API.get(
          `v1/form-responses/${paginationModel.subjectId}`
        );

        setSubjectData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    setIsLoading(true);
    fetchFormData();
    fetchRespponseData();
  }, [paginationModel]);

  useEffect(() => {
    if (rows && subjectData) {
      const combinedFields = rows?.form_fields?.map((field) => {
        const matchedField =
          subjectData?.values.length > 0
            ? subjectData?.values?.find(
                (subjectField) => subjectField.field === field.id
              )
            : null;

        if (matchedField) {
          return {
            ...field,
            value: matchedField.value,
          };
        } else {
          return field;
        }
      });

      const newFormData = {};
      combinedFields?.forEach((field) => {
        newFormData[field.id] = field.value || "";
      });
      setViewData(combinedFields);
    }
  }, [rows, subjectData]);

  return { isLoading, rows, viewData };
}

const AddFieldData = () => {
  const { formId } = useParams();
  const siteId = formId.split("-")[0];
  const subjectId = formId.split("-")[1];
  const [paginationModel, setPaginationModel] = useState({
    form: siteId || "",
    subjectId,
  });

  const { isLoading, rows, viewData } = useQuery(paginationModel);

  const [formData, setFormData] = useState({});

  const handleFieldChange = async (event, fieldType) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const dataPush = async () => {
      try {
        const res = await API.post("v1/form-values/", {
          value: value,
          field: name,
          form_submission: subjectId,
        });
        console.log(res);
        setPaginationModel({ ...paginationModel });
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    if (
      (event.key === "Enter" && fieldType === "text") ||
      fieldType === "radio" ||
      fieldType === "date"
    ) {
      dataPush();
    }
  };

  return (
    <Box className="form-build">
      <CollapsedBreadcrumbs
        maxItems={2}
        items={[...items, { label: rows?.title || "" }]}
        separator="›"
      />
      <Box className="flex-box">
        <Typography as="h2" className="">
          {rows?.title}
        </Typography>
      </Box>
      <Box className="form-build-wrapper">
        <Box className="form-build-section">
          <div>
            <span className="badge text-[#0F172A] font-semibold text-[14px]">
              Subject ID: {subjectId}
            </span>
          </div>
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <div className="py-5">
                <LinearProgress />
              </div>
            </Box>
          ) : (
            viewData?.map(
              (field, index) =>
                (field?.type === "text" ||
                  field?.type === "date" ||
                  field?.type === "radio") && (
                  <div key={index} className="py-3">
                    <CustomTextField
                      index={index}
                      actionButton={false}
                      label={field?.label}
                      variable={field?.variable}
                      tooltip={field?.tooltip}
                      disabled={field?.value}
                      value={
                        field.value
                          ? field.type === "date"
                            ? new Date(field.value).toISOString().split("T")[0]
                            : field.value
                          : formData[field.id] || ""
                      }
                      name={field?.id}
                      type={field?.type}
                      placeholder={field?.placeholder_text}
                      options={field?.options}
                      helpText={field?.help_text}
                      handleFieldChange={handleFieldChange}
                    />
                  </div>
                )
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddFieldData;
