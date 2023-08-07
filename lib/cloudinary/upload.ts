import RemoveBg from "../bg-remover";

let cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");

export const uploadFromBuffer = (req: Buffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "pc_builder",
      },
      (error: any, result: any) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req).pipe(cld_upload_stream);
  });
};

export const uploadImage = (img_url: string) => {
  return new Promise((resolve, reject) => {
    RemoveBg(img_url)
      .then((response) => {
        console.log("RemoveBg response : => ", response);
        if (response.status !== 200) {
          return new Error(response.statusText + " (from removeBG.com)");
        }
        // return uploadFromBuffer(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
