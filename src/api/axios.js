import axios from "axios";

export const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

export const getPostPage = async(pageParams =1,options={})=>{
    const response = await api.get(`/posts?_page=${pageParams}`,options)
    return response.data
}