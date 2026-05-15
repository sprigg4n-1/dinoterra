"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import { classifyImage, giveFeedback } from "@/services/MlService";
import { IDino, TFeedbackBody, TPrediction } from "@/config/types";
import { getDinoByLatinName } from "@/services/DinoService";

import LoaderComponent from "../LoaderComponent";
import DinoCard from "../dino/DinoCard";
import Image from "next/image";

import close from "@/images/vectors/close.svg";
import FeedbackForm from "./FeedbackForm";

interface Props {
  onClose: () => void;
  file: string;
}

const PredictionTopThreeModal = ({ onClose, file }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [prediction, setPrediction] = useState<TPrediction | null>(null);
  const [dinoData, setDinoData] = useState<(IDino | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [isOpenFeedbackForm, setIsOpenFeedbackForm] = useState<boolean>(false);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const handleFeedbackSubmit = async (body: TFeedbackBody) => {
    if (!prediction) return;
    await giveFeedback(prediction._id, body);
    setFeedbackSent(true);
    setIsOpenFeedbackForm(false);
  };

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
      <div className="h-fit w-[90%] md:w-fit bg-slateGray rounded-2xl relative pt-9 md:pt-13 p-4">
        <button className="hover:rotate-90 duration-300 absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6">
          <Image
            src={close}
            width={255}
            height={255}
            alt="close"
            onClick={onClose}
          />
        </button>

        {loading ? (
          <div className="flex items-center justify-center">
            <LoaderComponent />
          </div>
        ) : prediction ? (
          <div className="flex flex-col gap-4">
            <p className="text-white text-sm md:text-lg font-semibold text-center">
              Модель визначила що це -{" "}
              {prediction.isDinosaur ? "Динозавр" : "Не динозавр"}
            </p>

            {prediction.isDinosaur ? (
              <>
                <Swiper
                  modules={[EffectCoverflow]}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: -15,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  style={{ width: "100%" }}
                  spaceBetween={60}
                  className="w-full"
                >
                  {prediction.top3.map((item, i) => (
                    <SwiperSlide key={item.rank} className="w-56">
                      <div className="flex flex-col items-center gap-1">
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
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="px-4 py-2 bg-white text-black rounded-full hover:bg-opacity-80 transition"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="px-4 py-2 bg-white text-black rounded-full hover:bg-opacity-80 transition"
                  >
                    →
                  </button>
                </div>
              </>
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

            <div className="flex flex-col items-center justify-center">
              {feedbackSent ? (
                <p className="text-brightOrange text-sm">Дякуємо за фідбек!</p>
              ) : isOpenFeedbackForm ? (
                <FeedbackForm
                  predictionId={prediction._id}
                  isDinosaur={prediction.isDinosaur}
                  onSubmit={handleFeedbackSubmit}
                  onCancel={() => setIsOpenFeedbackForm(false)}
                />
              ) : (
                <button
                  onClick={() => setIsOpenFeedbackForm(true)}
                  className="py-1 md:py-2 px-5 bg-fieryRed rounded-md text-sm md:text-md text-white"
                >
                  Надати фідбек
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-white">Помилка класифікації</p>
        )}
      </div>
    </div>
  );
};

export default PredictionTopThreeModal;
