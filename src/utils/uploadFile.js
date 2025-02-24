import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const uploadFile = async (file) => {
  if (!file) return null;

  const useCloudinary = getEnvVar('ENABLE_CLOUDINARY', 'false') === 'true';
  return useCloudinary
    ? await saveFileToCloudinary(file)
    : await saveFileToUploadDir(file);
};
