import { useEffect, useState } from "react";
import { createPost, deletePost, fetchAllBlogs } from "../../services/Blogs/blogs.service";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    const fetchPosts = async () => {
        const result = await fetchAllBlogs();
        setBlogs(result.data)
        console.log("BLogs: ", result);
    }

    const handleDeletePost = async (Id: string) => {
        await deletePost(Id);
        fetchPosts();
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            username: '',
            tags: ''
        },
        onSubmit: async (values: any) => {
            console.log(values);
            await createPost(values);
            fetchPosts();
        },
        validate: (values: any) => {
            const errors = {};
            if (!values.title) {
                errors.title = 'Required';
            }
            if (!values.content) {
                errors.content = 'Required';
            }
            if (!values.username) {
                errors.username = 'Required';
            }
            if (!values.tags) {
                errors.tags = 'Required';
            }
            return errors;
        },
    });


    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'content', headerName: 'Content', width: 200 },
        { field: 'Created Date', headerName: 'createdAt', width: 200 },
        {
            field: 'username',
            headerName: 'User Name',
            width: 200,
        },
        {
            field: 'tags',
            headerName: 'Tags',
            sortable: false,
            width: 200,
            valueGetter: (value, row) => `${row?.tags?.join(',')}`,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeletePost(params.row._id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <input
                            id="content"
                            name="content"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.content}
                        />
                        {formik.touched.content && formik.errors.content ? (
                            <div>{formik.errors.content}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="username">User Name</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div>{formik.errors.username}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="tags">Tags</label>
                        <input
                            id="tags"
                            name="tags"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tags}
                        />
                        {formik.touched.tags && formik.errors.tags ? (
                            <div>{formik.errors.tags}</div>
                        ) : null}
                    </div>
                    {/* <button type="submit">Create</button> */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        type="submit"
                    >Create Post</Button>
                </form>
            </div>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={blogs}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                    getRowId={(row) => row._id}
                />
            </Paper>
        </>
    )
}

export default Blogs;