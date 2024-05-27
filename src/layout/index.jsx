import { useState } from "react";
import { Outlet } from "react-router-dom";
import SiderBar from "../components/SiderBar";
import "./index.css";

function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <SiderBar open={open} setOpen={setOpen} />
      <div id="detail" className={open ? "narrow" : "wide"}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
