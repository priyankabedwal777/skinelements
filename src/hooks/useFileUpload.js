import { useState, useCallback } from "react";
import { processUploadedFile } from "../utils/fileProcessing";

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(async (file, onSuccess, onError) => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const processedData = await processUploadedFile(file);

      clearInterval(progressInterval);
      setProgress(100);

      if (onSuccess) {
        onSuccess(processedData);
      }

      return processedData;
    } catch (error) {
      setError(error.message);
      if (onError) {
        onError(error);
      }
      throw error;
    } finally {
      setUploading(false);
      // Reset progress after a delay
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  const resetUpload = useCallback(() => {
    setUploading(false);
    setError(null);
    setProgress(0);
  }, []);

  return {
    uploading,
    error,
    progress,
    uploadFile,
    resetUpload,
    setError,
  };
};
