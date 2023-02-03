import React from "react";
import { useCartContext } from "../context/cart.Context";
import { useFilterContext } from "../context/filter_Context";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";

const NavBar = () => {
  const {
    filters: { text },
    updateProductbyFilter,
  } = useFilterContext();
  const { total_item } = useCartContext();

  return (
    <>
      {/* NavBar Button Start */}
      <nav className="navbar bg-body-tertiary" style={{ marginBottom: "10px" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              style={{ width: "80px" }}
              src="data:image/png;base64,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"
              alt="tshirt logo"
            />
            TEEREX STORE
          </Link>
          <Link className="navbar-brand" to="/products">
            PRODUCTS
          </Link>
          {/* NavBar Button End */}

          {/* Navbar Search Form Start */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="text"
              name="text"
              value={text}
              onChange={updateProductbyFilter}
              placeholder="Search"
              aria-label="Search"
            />
            <p className="btn btn-outline-success" type="submit">
              Search
            </p>
            {/* Cart Icon Start   */}
            <Link to="/cart">
              <i className="fa-solid fa-2x fa-cart-shopping">
                {total_item > 0 ? total_item : null}
              </i>
            </Link>
            {/* Cart Icon End */}
          </form>
          {/* Navbar Search Form End */}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
