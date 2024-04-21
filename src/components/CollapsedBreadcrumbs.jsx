import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
}

export default function CollapsedBreadcrumbs(props) {
  const { items, maxItems, separator } = props;

  const itemsWithoutLast = items && items.slice(0, -1);

  const lastItem = items && items[items.length - 1];

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        separator={separator}
        maxItems={maxItems}
        aria-label="breadcrumb"
        className="pb-8"
      >
        {itemsWithoutLast &&
          itemsWithoutLast.map((item, index) => (
            <Link
              to={item.url}
              key={index}
              className="text-[#0F172A] bg-[#F1F5F9] py-3 px-3 rounded-md text-[14px] font-semibold"
            >
              {item.label}
            </Link>
          ))}
        {lastItem && (
          <p className="text-[14px] text-[#64748B] font-semibold">
            {lastItem.label}
          </p>
        )}
      </Breadcrumbs>
    </div>
  );
}
