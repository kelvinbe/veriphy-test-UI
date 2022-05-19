import axios from "axios";
import { axiosInstance } from "../config";

const API = axios.create({ baseURL: "http://localhost:5000" });


export const signIn = async (FormData) => {
  const get = await (await axiosInstance.post("/user/signin", FormData)).data
      console.log('gettt', get)
  return get
};
export const signUp = async (FormData) => {
 const get = await (await axiosInstance.post("/user/signup", FormData)).data
 console.log('gettt', get)
  return get
};


export const getUsers = async () => {
  const users = await axiosInstance.get("/user/")
  return users.data
}

export const FilterUserByName = async () => {

  const resp = await axiosInstance.get('/user/')
  console.log('response', resp)
  const sortedResponse= resp.data.sort(function(a, b) {
    return a.name.localeCompare(b.name);
 }); 
 return sortedResponse

}


export const FilterByTimeCreated = async () => {
  const resp = await axiosInstance.get('/user/')
  const sortedResponse= resp.data.sort(function(a, b) {
    return a.createdAt.localeCompare(b.createdAt);
 });
 return sortedResponse

}



