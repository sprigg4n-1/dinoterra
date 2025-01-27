"use client";

import { createDino } from "@/services/DinoService";
import React, { useState } from "react";

enum DinoDiet {
  Herbivores = "Herbivores",
  Carnivores = "Carnivores",
}
enum DinoPeriod {
  Triassic = "Triassic",
  Jurassic = "Jurassic",
  Cretaceous = "Cretaceous",
}

const CreateDinoFormDashboard = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [diet, setDiet] = useState<string>(DinoDiet.Herbivores);
  const [dietDescription, setDietDescription] = useState<string>("");
  const [period, setPeriod] = useState<string>(DinoPeriod.Cretaceous);
  const [periodDescription, setPeriodDescription] = useState<string>("");

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const addDino = async () => {
      await createDino(
        name,
        description,
        diet,
        dietDescription,
        period,
        periodDescription
      );
    };
    addDino();
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDiet(DinoDiet.Herbivores);
    setDietDescription("");
    setPeriod(DinoPeriod.Cretaceous);
    setPeriodDescription("");
  };
  return (
    <div>
      <h2 className="text-[22px] font-semibold mb-2">Створення динозавра</h2>
      <form onSubmit={(e) => onSubmitForm(e)} className="flex flex-col gap-5">
        <label className="flex flex-col">
          <span>Ім'я</span>
          <input
            required
            className="bg-darkGray text-white py-2 px-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span>Опис</span>
          <textarea
            required
            className="bg-darkGray text-white resize-none py-2 px-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-3">
          <span>Опис харчування</span>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="text-white bg-darkGray">
            <option value={DinoDiet.Herbivores}>{DinoDiet.Herbivores}</option>
            <option value={DinoDiet.Carnivores}>{DinoDiet.Carnivores}</option>
          </select>
          <input
            required
            className="bg-darkGray text-white py-2 px-1"
            type="text"
            value={dietDescription}
            onChange={(e) => setDietDescription(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-3">
          <span>Опис періоду</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-white bg-darkGray">
            <option value={DinoPeriod.Cretaceous}>
              {DinoPeriod.Cretaceous}
            </option>
            <option value={DinoPeriod.Triassic}>{DinoPeriod.Triassic}</option>
            <option value={DinoPeriod.Jurassic}>{DinoPeriod.Jurassic}</option>
          </select>
          <input
            required
            className="bg-darkGray text-white py-2 px-1"
            type="text"
            value={periodDescription}
            onChange={(e) => setPeriodDescription(e.target.value)}
          />
        </label>
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-[200px] py-2 border-2 border-transparent bg-brightOrange text-white text-[18px] hover:border-brightOrange hover:bg-white hover:text-brightOrange duration-300">
            Створити
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="w-[200px] py-2 border-2 border-transparent bg-fieryRed text-white text-[18px] hover:border-fieryRed hover:bg-white hover:text-fieryRed duration-300">
            Скидання
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDinoFormDashboard;
