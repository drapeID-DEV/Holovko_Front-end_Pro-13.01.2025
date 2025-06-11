import { Outlet, useNavigate } from "react-router"

function Header() {
    const navigate = useNavigate();

    return <>
    <div className="header-container">
        <button className="control-btn" onClick={() => navigate("/products")}>
            <img className="header-logo" src="https://upload.wikimedia.org/wikipedia/commons/b/be/ROZETKA-Logo-L3-B-RGB.png" alt="" />
        </button>
    </div>
    <Outlet />
    </>
}

export default Header;