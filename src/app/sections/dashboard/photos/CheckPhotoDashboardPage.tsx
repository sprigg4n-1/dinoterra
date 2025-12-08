"use client";

import React, { useState } from "react";

const CheckPhotoDashboardPage = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<null | {
    class: string;
    probability: number;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.readAsDataURL(selected);
    reader.onload = () => setImagePreview(reader.result as string);
  };

  const checkImage = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      setResult({
        class: data.class,
        probability: data.probability,
      });
    } catch (err) {
      console.error("Помилка:", err);
    }

    setLoading(false);
  };

  const trainImage = async (correctLabel: 0 | 1) => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("correct_label", String(correctLabel));

    try {
      const response = await fetch("http://localhost:8000/train_single", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Донавчання:", data);
      alert("Модель перенавчена на цьому зображенні!");
    } catch (err) {
      console.error("Помилка при донавчанні:", err);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-2">
        <label className="flex flex-col w-full md:w-1/4">
          <span>Обрати картинку</span>
          <label
            htmlFor="fileUploadForDinoImage"
            className={`${
              imagePreview
                ? "bg-brightOrange hover:border-darkGray"
                : "bg-darkGray hover:border-brightOrange"
            } text-white h-full border-2 py-2 border-transparent cursor-pointer flex items-center justify-center duration-300`}
          >
            <span>{imagePreview ? "Змінити файл" : "Оберіть файл"}</span>
            <input
              id="fileUploadForDinoImage"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </label>
        </label>
      </div>

      {imagePreview && (
        <div>
          <img
            src={imagePreview}
            alt="preview"
            className="max-w-xs border rounded shadow"
          />
        </div>
      )}

      {file && (
        <button
          onClick={checkImage}
          className="bg-green-600 text-white px-4 py-2 rounded w-fit hover:bg-green-700 duration-200"
        >
          Перевірити зображення
        </button>
      )}

      {loading && <p>Обробка...</p>}

      {result && (
        <div className="p-4 border rounded bg-gray-100 w-fit flex flex-col gap-2">
          <p>
            <b>Передбачений клас:</b> {result.class}
          </p>
          <p>
            <b>Ймовірність:</b> {(result.probability * 100).toFixed(2)}%
          </p>

          <div className="flex gap-2">
            <span>Якщо модель помилилась:</span>
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              onClick={() => trainImage(1)}
            >
              Це динозавр
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              onClick={() => trainImage(0)}
            >
              Це не динозавр
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckPhotoDashboardPage;
