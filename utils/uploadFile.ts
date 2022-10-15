import axios from '../config/axios';

const uploadImage = (image: File): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      const {
        data: { url }
      } = await axios.post<{ message: string; url: string }>(
        '/media',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      resolve(url);
    } catch (err) {
      reject(err);
    }
  });

export default uploadImage;
