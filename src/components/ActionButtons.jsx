import { Box } from "@mui/material";
import { branching, copy, deleteicon, edit } from "../assets";

const ActionButtons = () => {
  return (
    <Box className="flex">
      <Box>
        <img src={branching} alt="branching" />
      </Box>
      <Box>
        <img src={copy} alt="copy" />
      </Box>
      <Box>
        <img src={deleteicon} alt="copy" />
      </Box>
      <Box>
        <img src={edit} alt="edit" />
      </Box>
    </Box>
  );
};

export default ActionButtons;
