/* eslint-disable no-await-in-loop */
import { useUploadFile } from 'react-firebase-hooks/storage';
import { storage } from '@/config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { nanoid } from 'nanoid';

/**
 * @returns [upload, uploading, error]
 */

export const useUpload = () => {
  // eslint-disable-next-line no-unused-vars
  const [uploadFile, uploading, _, error] = useUploadFile();

  const upload = async (storagePath: string, files: File[]) => {
    if (files.length > 0) {
      const imgUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const img = await uploadFile(
          ref(storage, `${storagePath}/${nanoid()}-${files[i].name}`),
          files[i]
        );

        const imgUrl = await getDownloadURL(ref(storage, img?.ref.fullPath));

        if (img?.ref.fullPath) imgUrls.push(imgUrl);
      }

      return imgUrls;
    }

    return [];
  };

  return [upload, uploading, error] as const;
};
