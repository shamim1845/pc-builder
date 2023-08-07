const axios = require("axios");
import FormData from "form-data";

// const RemoveBg = async (img_url: string) => {
//   const formData = new FormData();
//   formData.append("size", "auto");
//   formData.append("image_url", img_url);

//   try {
//     const response = await axios({
//       method: "post",
//       url: "https://api.remove.bg/v1.0/removebg",
//       data: formData,
//       responseType: "arraybuffer",
//       headers: {
//         ...formData.getHeaders(),
//         "X-Api-Key": process.env.REMOVE_BG_API_KEY,
//       },
//       encoding: null,
//     });

//     if (response.status != 200) {
//       return console.error("Error:", response.status, response.statusText);
//     }

//     return response.data;
//   } catch (error: any) {
//     return error.response;
//   }
// };

const RemoveBg = async (img_url: string) => {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_url", img_url);

  try {
    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      },
      encoding: null,
    });

    if (response.status != 200) {
      return console.error("Error:", response.status, response.statusText);
    }

    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export default RemoveBg;
