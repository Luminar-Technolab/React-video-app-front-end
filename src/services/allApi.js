import { BASE_URL } from "./base_url";
import { commonRequest } from "./commonRequest";

//uploadvideo
export const uploadvideo = async (body)=>{
    return await commonRequest("POST",`${BASE_URL}/videos`,body)
  }

//get videos
export const getvideos = async ()=>{
    return await commonRequest("GET",`${BASE_URL}/videos`,"")
}

//get avideo
export const getsinglevideo = async (id)=>{
    return await commonRequest("GET",`${BASE_URL}/videos/${id}`,"")
}

//deletevideo
export const deleteVideo = async (id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}
//add category
export const addCategoryData = async (body)=>{
    return await commonRequest("POST",`${BASE_URL}/categories`,body)
}
//get category
export const getallcategories = async ()=>{
    return await commonRequest("GET",`${BASE_URL}/categories`,"")
}

//deletecategory
export const deleteCategory = async (id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/categories/${id}`,{})
}

//updatecategory
export const updatecategory = async (id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/categories/${id}`,body)
}