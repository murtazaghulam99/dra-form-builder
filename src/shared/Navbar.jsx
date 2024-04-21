import { Container, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link, NavLink, BrowserRouter as Router } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logo, notification } from "../assets";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  return (
    <Router>
      <section className="navbar bg-[#2A4376] py-4 px-2">
        <div className="mx-auto container flex justify-between">
          <div className="cursor-pointer">
            <img src={logo} alt="" className="w-full max-w-[130px]" />
          </div>
          <div className="flex items-center justify-between w-[200px]">
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-full hover:bg-[#2f4a7c] focus:outline-none"
            >
              <img src={notification} alt="" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-red-500 rounded-full top-1 right-1 dark:border-gray-900">
                20
              </div>
            </button>

            <div className="flex items-center gap-x-3">
              <div>
                <span className="font-normal text-lg text-white">
                  Hi, {capitalizeFirstLetter("Juzer")}
                </span>
              </div>
              <div className="">
                <button
                  id="dropdownUserAvatarButton"
                  data-dropdown-toggle="dropdownAvatar"
                  className="cursor-pointer text-md bg-[#FFF507] hover:bg-[#FFF507]/90 transition-colors flex rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  type="button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <p className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    JS
                  </p>
                </button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  className="logout-select-field"
                >
                  <MenuItem className="select-field-item">
                    <Link to="/logout" style={{ textDecoration: "none" }}>
                      <ExitToAppIcon className="icon" /> Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Router>
  );
};

export default Navbar;
