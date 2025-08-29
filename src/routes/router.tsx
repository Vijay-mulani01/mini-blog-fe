import { Route, Routes } from "react-router-dom";
import Blogs from "../pages/Blogs/Blogs";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Blogs></Blogs>}></Route>
                <Route path="/blogs" element={<Blogs></Blogs>}></Route>
            </Routes>
        </>
    )
}

export default Router;