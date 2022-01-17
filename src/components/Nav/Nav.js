import React from "react";

const Nav = ({ setLogout }) => {
  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="pa3 black pointer link dim underline f4" onClick={setLogout}>Sign Out</p>
      </nav>
    </div>
  );
};

export default Nav;
