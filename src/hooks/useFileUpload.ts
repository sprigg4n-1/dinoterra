import { useState } from "react";

type UseFileUploadOptions = {
  onUpload?: (base64: string) => void;
};

export const useFileUpload = (options?: UseFileUploadOptions) => {
  const [imagePath, setImagePath] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePath(base64);
      options?.onUpload?.(base64);
    };
    reader.onerror = (error) => {
      console.error("Помилка при читанні файлу:", error);
    };
  };

  const resetImagePath = () => setImagePath("");

  return { imagePath, handleFileUpload, resetImagePath };
};
