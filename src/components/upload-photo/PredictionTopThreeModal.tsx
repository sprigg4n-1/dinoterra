"use client";

import Image from "next/image";
import close from "@/images/vectors/close.svg";
import { useEffect, useState } from "react";
import { classifyImage } from "@/services/MlService";
import { IDino, TPrediction } from "@/config/types";
import { getDinoByLatinName } from "@/services/DinoService";
import LoaderComponent from "../LoaderComponent";
import DinoCard from "../dino/DinoCard";

interface Props {
  onClose: () => void;
  file: string;
}

const PredictionTopThreeModal = ({ onClose, file }: Props) => {
  const [prediction, setPrediction] = useState<TPrediction | null>(null);
  const [dinoData, setDinoData] = useState<(IDino | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      const result = await classifyImage(file);
      if (result) {
        setPrediction(result);
      }
      setLoading(false);
    };

    fetchPrediction();
  }, [file]);

  useEffect(() => {
    if (prediction && prediction.isDinosaur) {
      const fetchDinos = async () => {
        const dinoRequests = prediction.top3.map((item) =>
          getDinoByLatinName(item.species),
        );
        const dinoResults = await Promise.all(dinoRequests);
        setDinoData(dinoResults.map((r) => r?.[0] || null));
      };

      fetchDinos();
    }
  }, [prediction]);

  return (
    <div className="fixed h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="h-fit w-2/3 bg-slateGray rounded-2xl relative p-4 pb-12">
        <button className="hover:rotate-90 duration-300 absolute top-4 right-4">
          <Image
            src={close}
            width={30}
            height={30}
            alt="close"
            onClick={onClose}
          />
        </button>

        {loading ? (
          <div className="flex items-center justify-center">
            <LoaderComponent />
          </div>
        ) : prediction ? (
          <div className="flex flex-col gap-12 h-full">
            <p className="text-white text-lg font-semibold">
              Модель визначила що це -{" "}
              {prediction.isDinosaur ? "Динозавр" : "Не динозавр"}
            </p>

            {prediction.isDinosaur ? (
              <div className="flex items-center justify-center gap-4">
                {prediction.top3.map((item, i) => (
                  <div
                    key={item.rank}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-white text-sm">
                      #{item.rank} — {(item.confidence * 100).toFixed(1)}%
                    </span>
                    {dinoData[i] ? (
                      <DinoCard
                        link={`/encyclopedia/${dinoData[i]!._id}`}
                        dino={dinoData[i]!}
                        textColor="white"
                        bgColor="black"
                      />
                    ) : (
                      <div className="w-56 h-60 bg-darkGray flex items-center justify-center rounded">
                        <p className="text-white text-center px-2">
                          {item.species}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-white">Схоже на:</p>
                {prediction.top3.map((item) => (
                  <div key={item.rank} className="text-white">
                    {item.rank}. {item.species} —{" "}
                    {(item.confidence * 100).toFixed(1)}%
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-white">Помилка класифікації</p>
        )}
      </div>
    </div>
  );
};

export default PredictionTopThreeModal;
