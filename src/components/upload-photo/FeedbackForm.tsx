"use client";

import { useState } from "react";
import { TFeedbackBody } from "@/config/types";

interface Props {
  predictionId: string;
  isDinosaur: boolean;
  onSubmit: (body: TFeedbackBody) => void;
  onCancel: () => void;
}

const FeedbackForm = ({
  predictionId,
  isDinosaur,
  onSubmit,
  onCancel,
}: Props) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctRank, setCorrectRank] = useState<1 | 2 | 3 | null>(null);
  const [errorType, setErrorType] = useState<TFeedbackBody["errorType"] | null>(
    null,
  );
  const [correctClass, setCorrectClass] = useState<string>("");

  const handleSubmit = () => {
    if (isCorrect === null) return;

    const body: TFeedbackBody = { isCorrect, givenBy: "USER" };

    if (isCorrect) {
      // Правильно — для динозавра вказуємо rank
      if (isDinosaur && correctRank) {
        body.correctRank = correctRank;
      }
    } else {
      // Неправильно — вказуємо errorType
      if (errorType) body.errorType = errorType;
      if (correctClass) body.correctClass = correctClass;
    }

    onSubmit(body);
  };

  return (
    <div className="flex flex-col gap-4 bg-darkPurple p-4 rounded-xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      {/* Крок 1 — правильно чи ні */}
      <p className="font-semibold text-center">Модель визначила правильно?</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => {
            setIsCorrect(true);
            setErrorType(null);
          }}
          className={`px-6 py-2 rounded-md ${isCorrect === true ? "bg-green-500" : "bg-slate-600"}`}
        >
          ✅ Так
        </button>
        <button
          onClick={() => {
            setIsCorrect(false);
            setCorrectRank(null);
          }}
          className={`px-6 py-2 rounded-md ${isCorrect === false ? "bg-red-500" : "bg-slate-600"}`}
        >
          ❌ Ні
        </button>
      </div>

      {/* Крок 2А — якщо правильно і динозавр — який rank */}
      {isCorrect === true && isDinosaur && (
        <div className="flex flex-col gap-2">
          <p className="text-center text-sm">Який варіант був правильним?</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((rank) => (
              <button
                key={rank}
                onClick={() => setCorrectRank(rank as 1 | 2 | 3)}
                className={`px-4 py-2 rounded-md ${correctRank === rank ? "bg-green-500" : "bg-slate-600"}`}
              >
                #{rank}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Крок 2Б — якщо неправильно — який тип помилки */}
      {isCorrect === false && (
        <div className="flex flex-col gap-2">
          <p className="text-center text-sm">Що саме неправильно?</p>
          <div className="flex flex-col gap-2">
            {isDinosaur && (
              <button
                onClick={() => setErrorType("WRONG_SPECIES")}
                className={`py-2 px-4 rounded-md text-sm ${errorType === "WRONG_SPECIES" ? "bg-orange-500" : "bg-slate-600"}`}
              >
                🦕 Динозавр правильно, але вид неправильний
              </button>
            )}

            {isDinosaur && (
              <button
                onClick={() => setErrorType("FALSE_POSITIVE")}
                className={`py-2 px-4 rounded-md text-sm ${errorType === "FALSE_POSITIVE" ? "bg-orange-500" : "bg-slate-600"}`}
              >
                ❌ Це не динозавр взагалі
              </button>
            )}

            {!isDinosaur && (
              <button
                onClick={() => setErrorType("FALSE_NEGATIVE")}
                className={`py-2 px-4 rounded-md text-sm ${errorType === "FALSE_NEGATIVE" ? "bg-orange-500" : "bg-slate-600"}`}
              >
                🦕 Це динозавр, але модель не визначила
              </button>
            )}

            <button
              onClick={() => setErrorType("NEW_SPECIES")}
              className={`py-2 px-4 rounded-md text-sm ${errorType === "NEW_SPECIES" ? "bg-orange-500" : "bg-slate-600"}`}
            >
              🆕 Це новий вид якого немає в моделі
            </button>
          </div>
        </div>
      )}

      {/* Крок 3 — якщо потрібен correctClass */}
      {isCorrect === false &&
        (errorType === "WRONG_SPECIES" ||
          errorType === "FALSE_NEGATIVE" ||
          errorType === "NEW_SPECIES") && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center">
              Знаєш правильний вид? (необов'язково)
            </p>
            <input
              type="text"
              value={correctClass}
              onChange={(e) => setCorrectClass(e.target.value)}
              placeholder="Наприклад: Velociraptor"
              className="bg-slate-600 text-white px-3 py-2 rounded-md text-sm outline-none"
            />
          </div>
        )}

      {/* Кнопки */}
      <div className="flex gap-3 justify-center mt-2">
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-slate-600 rounded-md text-sm"
        >
          Скасувати
        </button>
        <button
          onClick={handleSubmit}
          disabled={
            isCorrect === null ||
            (isCorrect === false && !errorType) ||
            (isCorrect === true && isDinosaur && !correctRank)
          }
          className="px-5 py-2 bg-fieryRed rounded-md text-sm disabled:opacity-50"
        >
          Надіслати
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
