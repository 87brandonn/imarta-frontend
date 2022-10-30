import axios from '../config/axios';
import { compressImage } from './compressImage';

const uploadImage = (
  image: File,
  type: 'image' | 'video' = 'image'
): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const compressedImage =
        type === 'image' ? await compressImage(image) : image;
      const formData = new FormData();
      formData.append('image', compressedImage);
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
