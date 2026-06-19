"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
import { useTranslations } from "next-intl";

import {
  EDinoDiet,
  EDinoPeriod,
  EDinoType,
} from "@/config/types";
import { createDinoV2, uploadDinoImageV2, addFoundLocationV2 } from "@/services/DinoV2Service";

import InputComponent from "@/components/form/InputComponent";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";
import DinoV2ArticleEditor, {
  DinoV2ArticleEditorRef,
} from "@/components/dashboard/dinoV2/DinoV2ArticleEditor";
import DinoMlPredictionModal from "@/components/dashboard/dino/DinoMlPredictionModal";
import Image from "next/image";
import close from "@/images/vectors/close.svg";

type PendingImage = { id: string; file: string; isMain: boolean };
type PendingLocation = { id: string; place: { uk: string; en: string }; latitude: number; longitude: number };

const CreateDinoV2FormDashboard = () => {
  const t = useTranslations("admin.v2.form");
  const tf = useTranslations("encyclopedia.filter");
  const articleRef = useRef<DinoV2ArticleEditorRef>(null);

  // static fields
  const [nameUk, setNameUk] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [latinName, setLatinName] = useState("");
  const [typeOfDino, setTypeOfDino] = useState<string>(EDinoType.Unknown);
  const [period, setPeriod] = useState<string>(EDinoPeriod.Cretaceous);
  const [periodDate, setPeriodDate] = useState("");
  const [diet, setDiet] = useState<string>(EDinoDiet.Herbivores);
  const [length, setLength] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  // pending images
  const [images, setImages] = useState<PendingImage[]>([]);
  const imgFileRef = useRef<HTMLInputElement>(null);
  const [mlPendingFile, setMlPendingFile] = useState<string | null>(null);

  // pending locations
  const [locations, setLocations] = useState<PendingLocation[]>([]);
  const [locPlaceUk, setLocPlaceUk] = useState("");
  const [locPlaceEn, setLocPlaceEn] = useState("");
  const [locLat, setLocLat] = useState<number>(0);
  const [locLng, setLocLng] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // image handlers
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setMlPendingFile(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleMlConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!mlPendingFile) return;
    const fileToAdd = mlPendingFile;
    setMlPendingFile(null);
    setImages((prev) => [
      ...prev,
      { id: v4(), file: fileToAdd, isMain: prev.length === 0 },
    ]);
  };

  const toggleMain = (id: string) => {
    setImages((prev) => prev.map((img) => ({ ...img, isMain: img.id === id })));
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const next = prev.filter((img) => img.id !== id);
      if (next.length > 0 && !next.some((img) => img.isMain)) {
        next[0].isMain = true;
      }
      return next;
    });
  };

  // location handlers
  const addLocation = () => {
    if (!locPlaceUk.trim() && !locPlaceEn.trim()) return;
    setLocations((prev) => [
      ...prev,
      { id: v4(), place: { uk: locPlaceUk, en: locPlaceEn }, latitude: locLat, longitude: locLng },
    ]);
    setLocPlaceUk("");
    setLocPlaceEn("");
    setLocLat(0);
    setLocLng(0);
  };

  const removeLocation = (id: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const article = articleRef.current?.getArticle();

      const res = await createDinoV2({
        name: { uk: nameUk, en: nameEn },
        latinName,
        typeOfDino,
        period,
        periodDate,
        diet,
        length,
        weight,
        article: article ?? { uk: null, en: null },
      });

      if (!res?.success) throw new Error(res?.message ?? "Помилка створення");

      const dinoId = res.data.dino._id;

      await Promise.all([
        ...images.map((img) => uploadDinoImageV2(dinoId, img.file, img.isMain)),
        ...locations.map((loc) =>
          addFoundLocationV2(dinoId, loc.place, loc.latitude, loc.longitude)
        ),
      ]);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message ?? "Невідома помилка");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setNameUk(""); setNameEn(""); setLatinName("");
    setTypeOfDino(EDinoType.Unknown); setPeriod(EDinoPeriod.Cretaceous);
    setPeriodDate(""); setDiet(EDinoDiet.Herbivores);
    setLength(0); setWeight(0);
    setImages([]); setLocations([]);
    setLocPlaceUk(""); setLocPlaceEn(""); setLocLat(0); setLocLng(0);
    setSuccess(false); setError("");
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <p className="text-[20px] font-semibold text-brightOrange">{t("createdSuccess")}</p>
        <button type="button" onClick={reset} className="py-2 px-8 bg-darkGray text-white hover:bg-slateGray duration-200">
          {t("addMore")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-[14px] sm:text-[16px]">
      <DashboardTitleComponent text={t("newDino")} />

      {/* ── Статичні поля ── */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">{t("basicData")}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <InputComponent text={t("nameUk")} value={nameUk} valueOnChange={(e) => setNameUk(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
          <InputComponent text={t("nameEn")} value={nameEn} valueOnChange={(e) => setNameEn(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
        </div>

        <InputComponent text={t("latinName")} value={latinName} valueOnChange={(e) => setLatinName(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <InputComponent text={t("lengthM")} value={length} valueOnChange={(e) => setLength(+e.target.value)} type="number" isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
          <InputComponent text={t("weightKg")} value={weight} valueOnChange={(e) => setWeight(+e.target.value)} type="number" isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
        </div>

        <label className="flex flex-col gap-1">
          <span>{t("type")}</span>
          <select value={typeOfDino} onChange={(e) => setTypeOfDino(e.target.value)} className="bg-darkGray text-white py-2 px-2 border-2 border-transparent focus:outline-none focus:border-brightOrange">
            {Object.values(EDinoType).map((k) => (
              <option key={k} value={k}>{tf(`type.${k}`)}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span>{t("diet")}</span>
          <select value={diet} onChange={(e) => setDiet(e.target.value)} className="bg-darkGray text-white py-2 px-2 border-2 border-transparent focus:outline-none focus:border-brightOrange">
            {Object.values(EDinoDiet).map((k) => (
              <option key={k} value={k}>{tf(`diet.${k}`)}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span>{t("geoperiod")}</span>
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="bg-darkGray text-white py-2 px-2 border-2 border-transparent focus:outline-none focus:border-brightOrange">
            {Object.values(EDinoPeriod).map((k) => (
              <option key={k} value={k}>{tf(`period.${k}`)}</option>
            ))}
          </select>
        </label>

        <InputComponent text={t("periodDate")} value={periodDate} valueOnChange={(e) => setPeriodDate(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
      </section>

      {/* ── Стаття (TipTap) ── */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">{t("article")}</h3>
        <DinoV2ArticleEditor ref={articleRef} />
      </section>

      {/* ── Зображення ── */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">{t("images")}</h3>
        <p className="text-[12px] text-slateGray">{t("imagesHint")}</p>

        <button
          type="button"
          onClick={() => imgFileRef.current?.click()}
          className="w-full sm:w-48 py-2 bg-darkGray text-white hover:bg-slateGray duration-200 border-2 border-transparent hover:border-brightOrange"
        >
          {t("addPhoto")}
        </button>
        <input ref={imgFileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />

        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <button type="button" onClick={() => toggleMain(img.id)} className="block w-full">
                  <Image src={img.file} alt="" width={200} height={200} className={`w-full aspect-square object-cover border-2 duration-200 ${img.isMain ? "border-brightOrange" : "border-transparent group-hover:border-slateGray"}`} />
                  {img.isMain && (
                    <span className="absolute top-0 left-0 bg-brightOrange text-white text-[10px] px-1">{t("coverBadge")}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-0 right-0 bg-fieryRed text-white w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200"
                >
                  <Image src={close} alt="x" width={12} height={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Локації ── */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">{t("locations")}</h3>

        <div className="flex flex-col sm:flex-row gap-2 items-end">
          <InputComponent text={t("latitude")} value={locLat} valueOnChange={(e) => setLocLat(+e.target.value)} type="number" colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="w-full sm:w-32" />
          <InputComponent text={t("longitude")} value={locLng} valueOnChange={(e) => setLocLng(+e.target.value)} type="number" colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="w-full sm:w-32" />
          <InputComponent text={t("nameUk")} value={locPlaceUk} valueOnChange={(e) => setLocPlaceUk(e.target.value)} placeholder={t("locPlaceholderUk")} colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="flex-1 w-full" />
          <InputComponent text={t("nameEn")} value={locPlaceEn} valueOnChange={(e) => setLocPlaceEn(e.target.value)} placeholder={t("locPlaceholderEn")} colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="flex-1 w-full" />
          <button type="button" onClick={addLocation} className="py-2 px-6 bg-green-600 text-white hover:bg-green-700 duration-200 h-10">
            {t("addLocation")}
          </button>
        </div>

        {locations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <div key={loc.id} className="flex items-center gap-2 bg-darkGray text-white py-1 px-3">
                <span className="text-[13px]">{loc.place.uk} / {loc.place.en} ({loc.latitude}, {loc.longitude})</span>
                <button type="button" onClick={() => removeLocation(loc.id)} className="hover:text-fieryRed duration-200">
                  <Image src={close} alt="x" width={12} height={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {error && <p className="text-fieryRed text-[14px]">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 sm:flex-none sm:w-48 py-3 bg-brightOrange text-white font-semibold hover:bg-opacity-90 duration-200 disabled:opacity-50"
        >
          {loading ? t("creating") : t("createDino")}
        </button>
      </div>

      {mlPendingFile &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <DinoMlPredictionModal
              file={mlPendingFile}
              onClose={() => setMlPendingFile(null)}
              addImages={handleMlConfirm}
            />
          </div>,
          document.body
        )}
    </form>
  );
};

export default CreateDinoV2FormDashboard;
