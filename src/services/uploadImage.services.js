import { cloudinary } from "@/services/api.services";

function uploadFile({ file }) {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "images-upload");

  return cloudinary.post("", data);
}

function uploadFiles({ files }) {
  const promises = [];

  for (let index = 0; index < files.length; index++) {
    promises.push(uploadFile({ file: files[index] }));
  }

  return Promise.allSettled(promises).then((responses) =>
    responses.map((res) => res.value.data.secure_url)
  );
}

export { uploadFiles };
