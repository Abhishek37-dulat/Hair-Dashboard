import axios from "axios";
import * as actionType from "../Constants/BannerTypes";
import { toast, ToastContainer } from "react-toastify";

const url = process.env.REACT_APP_URL;

export const getAllBanner = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("admintoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = await axios.get(`${url}/banner`, { headers });
    console.log(data.data.data);
    dispatch({ type: actionType.GET_ALL_BANNER, payload: data.data.data });
  } catch (error) {
    dispatch({ type: actionType.ERROR_GET_ALL_BANNER, error: error });
  }
};

export const addNewBanner = (newData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("admintoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formData = new FormData();
    formData.append("title", newData?.title);
    formData.append("description", newData?.description);
    formData.append(`categories[name]`, newData.categories.name);

    newData?.categories?.subCategories?.map((data, index) => {
      formData.append(`categories[subCategories][${index}][name]`, data.name);
    });
    formData.append("banner_image", newData.image);
    const data = await axios.post(`${url}/banner`, formData, { headers });
    console.log(data);
    dispatch({ type: actionType.POST_BANNER, payload: data.data.data });
  } catch (error) {
    dispatch({ type: actionType.ERROR_POST_BANNER, error: error });
  }
};

export const deleteBanner = (newData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("admintoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = await axios.delete(`${url}/banner/${newData}`, { headers });

    dispatch({ type: actionType.DELETE_BANNER, payload: data.data.data });
  } catch (error) {
    dispatch({ type: actionType.ERROR_DELETE_BANNER, error: error });
  }
};

{
  /* 


*/
}