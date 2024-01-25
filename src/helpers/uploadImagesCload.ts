import axios from "axios";
interface FileObject {

    file: FormData; 
  }
  

  export const uploadImgs = async (list: FileObject[]) => {
    const uploadTasks = list.map(async ({ file }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'carsstore');
  
      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dd-com/image/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(response.data.url, "----response----");
        return response.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Re-throw the error to propagate it
      }
    });
    return Promise.all(uploadTasks);
  };
