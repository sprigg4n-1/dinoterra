"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { classifyAdmin, giveFeedback } from "@/services/MlService";
import { TFeedbackBody } from "@/config/types";

import close from "@/images/vectors/close.svg";

interface Props {
  onClose: () => void;
  addImages: (e: React.MouseEvent<HTMLButtonElement>) => void;
  file: string;
}

const DinoMlPredictionModal = ({ onClose, addImages, file }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDinosaur, setIsDinosaur] = useState<boolean | null>(null);
  const [predictionId, setPredictionId] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);

  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<TFeedbackBody["errorType"]>(null);
  const [correctClass, setCorrectClass] = useState<string>("");

  // true = можна додати фото, false = не можна
  const [canAddPhoto, setCanAddPhoto] = useState<boolean>(false);

  useEffect(() => {
    const classify = async () => {
      setIsLoading(true);
      const result = await classifyAdmin(file);
      if (result) {
        setIsDinosaur(result.is_dinosaur);
        setPredictionId(result._id || "");
        setConfidence(result.stage1_probability || 0);
        // Якщо модель каже динозавр — дозволяємо додати одразу
        setCanAddPhoto(result.is_dinosaur);
      }
      setIsLoading(false);
    };

    classify();
  }, [file]);

  const sendFeedback = async (
    isCorrect: boolean,
    type?: TFeedbackBody["errorType"],
  ) => {
    const body: TFeedbackBody = {
      isCorrect,
      givenBy: "ADMIN",
      errorType: type || null,
      correctClass: correctClass || null,
    };
    await giveFeedback(predictionId, body);
    setFeedbackSent(true);
    setShowFeedback(false);

    // Після фідбеку оновлюємо можливість додати фото
    if (isCorrect) {
      // Модель права — залишаємо як є
      setCanAddPhoto(isDinosaur === true);
    } else {
      if (type === "FALSE_POSITIVE") {
        // Модель сказала динозавр, але це не динозавр → забороняємо
        setCanAddPhoto(false);
      } else if (type === "FALSE_NEGATIVE") {
        // Модель сказала не динозавр, але це динозавр → дозволяємо
        setCanAddPhoto(true);
      }
    }
  };

  return (
    <div className="h-fit w-[90%] md:w-[400px] bg-slateGray rounded-2xl relative pt-9 md:pt-13 p-4">
      <button className="hover:rotate-90 duration-300 absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6">
        <Image
          src={close}
          width={255}
          height={255}
          alt="close"
          onClick={onClose}
        />
      </button>

      <h2 className="text-white text-xl font-bold mb-4 text-center">
        Перевірка фото
      </h2>

      {isLoading ? (
        <div className="text-white text-center py-6">Аналізуємо фото...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <div
            className={`text-center py-3 rounded-xl font-bold text-lg ${isDinosaur ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {isDinosaur ? "Це динозавр!" : "Це не динозавр"}
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-300">
              Впевненість:{" "}
              <span className="text-white font-bold">
                {Math.round(confidence * 100)}%
              </span>
            </span>
          </div>

          <div className="flex gap-2">
            {canAddPhoto && (
              <button
                onClick={addImages}
                className="flex-1 bg-brightOrange hover:bg-opacity-80 duration-200 text-white py-2 rounded-xl font-bold"
              >
                Додати фото
              </button>
            )}
            {!feedbackSent && (
              <button
                onClick={() => setShowFeedback(!showFeedback)}
                className="flex-1 bg-darkPurple hover:bg-opacity-80 duration-200 text-white py-2 rounded-xl"
              >
                {showFeedback ? "Сховати" : "Фідбек"}
              </button>
            )}
          </div>

          {showFeedback && !feedbackSent && (
            <div className="flex flex-col gap-2 border border-gray-600 rounded-xl p-3">
              <p className="text-white text-sm font-bold text-center">
                Що скажеш про результат?
              </p>

              {isDinosaur ? (
                <>
                  <button
                    onClick={() => sendFeedback(true)}
                    className="py-2 rounded-xl text-sm text-white bg-green-700 hover:bg-opacity-80"
                  >
                    Модель права
                  </button>
                  <button
                    onClick={() => sendFeedback(false, "FALSE_POSITIVE")}
                    className="py-2 rounded-xl text-sm text-white bg-red-700 hover:bg-opacity-80"
                  >
                    Це не динозавр взагалі
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => sendFeedback(true)}
                    className="py-2 rounded-xl text-sm text-white bg-green-700 hover:bg-opacity-80"
                  >
                    Модель права
                  </button>
                  <button
                    onClick={() => setErrorType("FALSE_NEGATIVE")}
                    className={`py-2 rounded-xl text-sm text-white ${errorType === "FALSE_NEGATIVE" ? "bg-orange-500" : "bg-slate-600 hover:bg-opacity-80"}`}
                  >
                    Це насправді динозавр
                  </button>
                </>
              )}

              {errorType === "FALSE_NEGATIVE" && (
                <div className="flex flex-col gap-2 mt-1">
                  <input
                    type="text"
                    value={correctClass}
                    onChange={(e) => setCorrectClass(e.target.value)}
                    placeholder="Правильний вид (необов'язково)"
                    className="bg-slate-600 text-white px-3 py-2 rounded-md text-sm outline-none"
                  />
                  <button
                    onClick={() => sendFeedback(false, "FALSE_NEGATIVE")}
                    className="py-2 rounded-xl text-sm text-white bg-brightOrange hover:bg-opacity-80"
                  >
                    Надіслати фідбек
                  </button>
                </div>
              )}
            </div>
          )}

          {feedbackSent && (
            <div className="text-center text-green-400 text-sm py-2">
              Фідбек надіслано, дякуємо!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DinoMlPredictionModal;
