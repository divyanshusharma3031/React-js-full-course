import React from "react";
import { Link } from "react-router-dom";
import SearcOrder from "../features/order/SearcOrder";

function Header() {
  return <header>
    <Link to="/">
        Fast React Pizza Co.
    </Link>
    <SearcOrder/>
    <p>
        Divyanshu
    </p>
  </header>;
}

export default Header;
