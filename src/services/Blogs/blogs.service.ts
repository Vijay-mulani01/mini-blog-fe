import { deleteMethod, get, post } from "../fetcher"
import { BlogsEndpoints } from "./Blogs.endpoints"

export const fetchAllBlogs = async() => {
    const result = await get(BlogsEndpoints.BLOGS);
    return result.data;
}

export const createPost = async(data: any) => {
    const result = await post(BlogsEndpoints.BLOGS, data);
    return result.data;
}

export const deletePost = async(Id: string) => {
    const result = await deleteMethod(`${BlogsEndpoints.BLOGS}/${Id}`);
    return result.data;
}