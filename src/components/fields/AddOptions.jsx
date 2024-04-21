import * as React from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { TransitionGroup } from "react-transition-group";
import { cross } from "../../assets";

export default function AddOptions(props) {
  const { addOptions, setAddOptions } = props;

  const handleRemoveItem = (itemToRemove) => {
    setAddOptions(addOptions.filter((item) => item !== itemToRemove));
  };

  return (
    <div>
      <List sx={{ mt: 1 }}>
        <TransitionGroup className="add-tags">
          {Array.isArray(addOptions) &&
            addOptions.map((item, index) => {
              return (
                item && (
                  <Collapse key={index} className="add-tags">
                    <span>{item}</span>
                    <span
                      className="remove-tag bg-black"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <img src={cross} />
                    </span>
                  </Collapse>
                )
              );
            })}
        </TransitionGroup>
      </List>
    </div>
  );
}
