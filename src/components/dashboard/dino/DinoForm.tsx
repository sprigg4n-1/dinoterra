"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { createDino, changeDino } from "@/services/DinoService";

import {
  EDinoPeriod,
  EDinoDiet,
  EDinoType,
  dinoTypeLabels,
  dinoDietLabels,
  dinoPeriodLabels,
  IDino,
} from "@/config/types";

import InputComponent from "@/components/form/InputComponent";
import { addFoundLocation } from "@/services/FoundLocationService";
import { addImage } from "@/services/ImageService";

export type TDinoFoundLocation = {
  id: string;
  latitude: string;
  longitude: string;
  place: string;
};

export type TDinoImages = {
  id: string;
  imagePath: string;
};

interface Props {
  onChangeCreatedDino?: (value: any) => void;
  additionalFunctionForCreation?: () => void;

  images?: TDinoImages[];
  locations?: TDinoFoundLocation[];

  dinoToChange?: IDino;
  onChangeDino?: (value: IDino) => void;
  onChangeLoading?: (value: boolean) => void;

  isChangeForm?: boolean;
}

const DinoForm = ({
  onChangeCreatedDino,
  additionalFunctionForCreation,

  images,
  locations,

  dinoToChange,
  onChangeLoading,
  onChangeDino,

  isChangeForm = false,
}: Props) => {
  const t = useTranslations("admin.form");
  const tFilter = useTranslations("encyclopedia.filter");
  const [name, setName] = useState<string>("");
  const [latinName, setLatinName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [typeOfDino, setTypeOfDino] = useState<string>(EDinoType.Unknown);
  const [dinoLength, setDinoLength] = useState<number>(0);
  const [dinoWeight, setDinoWeight] = useState<number>(0);
  const [diet, setDiet] = useState<string>(EDinoDiet.Herbivores);
  const [dietDescription, setDietDescription] = useState<string>("");
  const [period, setPeriod] = useState<string>(EDinoPeriod.Cretaceous);
  const [periodDate, setPeriodDate] = useState<string>("");
  const [periodDescription, setPeriodDescription] = useState<string>("");

  useEffect(() => {
    if (isChangeForm && dinoToChange) {
      setName(dinoToChange.name);
      setLatinName(dinoToChange.latinName);
      setDescription(dinoToChange.description);
      setTypeOfDino(dinoToChange.typeOfDino);
      setDinoLength(dinoToChange.length);
      setDinoWeight(dinoToChange.weight);
      setDiet(dinoToChange.diet);
      setDietDescription(dinoToChange.dietDescription);
      setPeriod(dinoToChange.period);
      setPeriodDate(dinoToChange.periodDate);
      setPeriodDescription(dinoToChange.periodDescription);
    }
  }, [isChangeForm, dinoToChange]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChangeForm) {
      const addDino = async () => {
        const dino = await createDino(
          name,
          latinName,
          description,
          typeOfDino,
          dinoLength,
          dinoWeight,
          diet,
          dietDescription,
          period,
          periodDate,
          periodDescription,
        );

        if (images) {
          console.log(images);
          await Promise.all(
            images.map((img) => addImage(img.imagePath, dino.data.dino._id)),
          );
        }

        if (locations) {
          console.log(locations);
          await Promise.all(
            locations.map((loc) =>
              addFoundLocation(
                loc.place,
                loc.latitude,
                loc.longitude,
                dino.data.dino._id,
              ),
            ),
          );
        }

        additionalFunctionForCreation?.();
        onChangeCreatedDino?.(dino.data.dino);
      };

      addDino();
      resetForm();
    } else {
      onChangeLoading?.(true);

      const changeDinoById = async () => {
        const changedDino = await changeDino(
          dinoToChange?._id || "random",
          name,
          latinName,
          description,
          typeOfDino,
          dinoLength,
          dinoWeight,
          diet,
          dietDescription,
          period,
          periodDate,
          periodDescription,
        );

        onChangeDino?.(changedDino?.data.dino);
      };

      setTimeout(() => {
        changeDinoById();
        onChangeLoading?.(false);
      }, 1000);
    }
  };

  const resetForm = () => {
    if (isChangeForm && dinoToChange) {
      setName(dinoToChange.name);
      setLatinName(dinoToChange.latinName);
      setDescription(dinoToChange.description);
      setTypeOfDino(dinoToChange.typeOfDino);
      setDinoWeight(dinoToChange.weight);
      setDinoLength(dinoToChange.length);
      setDiet(dinoToChange.diet);
      setDietDescription(dinoToChange.dietDescription);
      setPeriod(dinoToChange.period);
      setPeriodDate(dinoToChange.periodDate);
      setPeriodDescription(dinoToChange.periodDescription);
    } else {
      setName("");
      setLatinName("");
      setDescription("");
      setTypeOfDino(EDinoType.Unknown);
      setDinoWeight(0);
      setDinoLength(0);
      setDiet(EDinoDiet.Herbivores);
      setDietDescription("");
      setPeriod(EDinoPeriod.Cretaceous);
      setPeriodDate("");
      setPeriodDescription("");
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmitForm(e)}
      className="flex flex-col gap-2 text-[14px] sm:text-[16px]"
    >
      {/* name */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <InputComponent
          text={t("name")}
          value={name}
          valueOnChange={(e) => setName(e.target.value)}
          textStyle="small"
          placeholder={t("namePlaceholder")}
          isRequired
          colorStyle="black"
          borderColor="transparent"
          customLabelStyles="flex-1"
        />
        <InputComponent
          text={t("latinName")}
          value={latinName}
          valueOnChange={(e) => setLatinName(e.target.value)}
          textStyle="small"
          placeholder={t("latinNamePlaceholder")}
          isRequired
          colorStyle="black"
          borderColor="transparent"
          customLabelStyles="flex-1"
        />
      </div>

      {/* sizes */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <InputComponent
          text={t("weight")}
          value={dinoWeight}
          valueOnChange={(e) => setDinoWeight(+e.target.value)}
          textStyle="small"
          type="number"
          isRequired
          colorStyle="black"
          borderColor="transparent"
          customLabelStyles="flex-1"
        />
        <InputComponent
          text={t("length")}
          value={dinoLength}
          valueOnChange={(e) => setDinoLength(+e.target.value)}
          textStyle="small"
          type="number"
          isRequired
          colorStyle="black"
          borderColor="transparent"
          customLabelStyles="flex-1"
        />
      </div>

      {/* description */}
      <label className="flex flex-col">
        <span>{t("description")}</span>
        <textarea
          required
          className="bg-darkGray text-white resize-none py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange h-[150px]"
          value={description}
          placeholder={t("descriptionPlaceholder")}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {/* type of dino */}
      <label className="flex flex-col gap-1">
        <span>{t("type")}</span>
        <select
          value={typeOfDino}
          onChange={(e) => setTypeOfDino(e.target.value as EDinoType)}
          className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
        >
          {Object.keys(dinoTypeLabels).map((key) => (
            <option key={key} value={key}>
              {tFilter(`type.${key}`)}
            </option>
          ))}
        </select>
      </label>

      {/* diet */}
      <label className="flex flex-col gap-1">
        <span>{t("dietLabel")}</span>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value as EDinoDiet)}
          className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
        >
          {Object.keys(dinoDietLabels).map((key) => (
            <option key={key} value={key}>
              {tFilter(`diet.${key}`)}
            </option>
          ))}
        </select>
        <textarea
          required
          className="bg-darkGray text-white py-2 px-1 resize-none border-2 border-transparent focus:outline-none focus:border-brightOrange h-[100px]"
          value={dietDescription}
          placeholder={t("dietPlaceholder")}
          onChange={(e) => setDietDescription(e.target.value)}
        />
      </label>

      {/* period */}
      <label className="flex flex-col gap-1">
        <span>{t("periodLabel")}</span>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as EDinoPeriod)}
          className="text-white bg-darkGray py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange"
        >
          {Object.keys(dinoPeriodLabels).map((key) => (
            <option key={key} value={key}>
              {tFilter(`period.${key}`)}
            </option>
          ))}
        </select>

        <InputComponent
          value={periodDate}
          valueOnChange={(e) => setPeriodDate(e.target.value)}
          textStyle="small"
          type="text"
          isRequired
          placeholder={t("periodDatePlaceholder")}
          colorStyle="black"
          borderColor="transparent"
        />
        <textarea
          required
          className="bg-darkGray text-white py-2 px-1 resize-none border-2 border-transparent focus:outline-none focus:border-brightOrange h-[100px]"
          value={periodDescription}
          placeholder={t("periodDescPlaceholder")}
          onChange={(e) => setPeriodDescription(e.target.value)}
        />
      </label>

      {/* buttons */}
      <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={resetForm}
          className="w-[150px] sm:w-[200px] py-2 border-2 border-transparent bg-fieryRed text-white text-[16px] sm:text-[18px] hover:border-fieryRed hover:bg-white hover:text-fieryRed duration-300"
        >
          {t("reset")}
        </button>

        <button
          type="submit"
          className="w-[150px] sm:w-[200px] py-2 border-2 border-transparent bg-brightOrange text-white text-[16px] sm:text-[18px] hover:border-brightOrange hover:bg-white hover:text-brightOrange duration-300"
        >
          {isChangeForm ? t("edit") : t("create")}
        </button>
      </div>
    </form>
  );
};

export default DinoForm;
