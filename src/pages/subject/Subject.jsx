import { Box, Typography } from "@mui/material";
import CollapsedBreadcrumbs from "../../components/CollapsedBreadcrumbs";
import SubjectData from "./SubjectData";
import API from "../../api/api";
import { useEffect, useRef, useState } from "react";

const items = [
  { url: "/", label: "Home" },
  { url: "Subject", label: "Subject" },
];

function useQuery(paginationModel) {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`v1/form-responses/`);

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

const Subject = () => {
  const [paginationModel, setPaginationModel] = useState({});
  const { isLoading, rows } = useQuery(paginationModel);

  return (
    <Box className="subject">
      <CollapsedBreadcrumbs maxItems={2} items={items} separator="›" />
      <h1 className="mb-8 font-bold text-[24px] text-[#0F172A]">Subject</h1>
      <SubjectData data={{ rows, isLoading, setPaginationModel }} />
    </Box>
  );
};

export default Subject;
