"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Map, Marker } from "@vis.gl/react-maplibre";

import {
  EDinoDiet,
  EDinoPeriod,
  EDinoType,
  IDinoV2,
  IDinoV2FoundLocation,
  IDinoV2Image,
  dinoDietLabels,
  dinoPeriodLabels,
  dinoTypeLabels,
} from "@/config/types";

import {
  getDinoV2ById,
  updateDinoV2,
  deleteDinoV2,
  uploadDinoImageV2,
  deleteDinoImageV2,
  addFoundLocationV2,
  deleteFoundLocationV2,
} from "@/services/DinoV2Service";

import InputComponent from "@/components/form/InputComponent";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";
import DinoV2ArticleEditor, {
  DinoV2ArticleEditorRef,
} from "@/components/dashboard/dinoV2/DinoV2ArticleEditor";
import DinoMlPredictionModal from "@/components/dashboard/dino/DinoMlPredictionModal";
import LoaderComponent from "@/components/LoaderComponent";
import imageNotFound from "@/images/not-found/image-not-found.webp";
import close from "@/images/vectors/close.svg";

interface Props {
  id: string;
}

const DinoV2DetailDashboard = ({ id }: Props) => {
  const router = useRouter();
  const articleRef = useRef<DinoV2ArticleEditorRef>(null);
  const imgFileRef = useRef<HTMLInputElement>(null);

  const [dino, setDino] = useState<IDinoV2 | null>(null);
  const [images, setImages] = useState<IDinoV2Image[]>([]);
  const [locations, setLocations] = useState<IDinoV2FoundLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

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

  // ML modal
  const [mlPendingFile, setMlPendingFile] = useState<string | null>(null);

  // location inputs
  const [locPlaceUk, setLocPlaceUk] = useState("");
  const [locPlaceEn, setLocPlaceEn] = useState("");
  const [locLat, setLocLat] = useState<number>(0);
  const [locLng, setLocLng] = useState<number>(0);

  // embla carousel for images
  const [emblaRef] = useEmblaCarousel({ loop: false, dragFree: true });

  const load = async () => {
    const data = await getDinoV2ById(id);
    if (!data) return;
    const d: IDinoV2 = data.dino;
    setDino(d);
    setImages(data.images ?? []);
    setLocations(data.foundLocations ?? []);
    setNameUk(d.name.uk);
    setNameEn(d.name.en);
    setLatinName(d.latinName);
    setTypeOfDino(d.typeOfDino);
    setPeriod(d.period);
    setPeriodDate(d.periodDate);
    setDiet(d.diet);
    setLength(d.length);
    setWeight(d.weight);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [id]);

  const refresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const showSaved = (msg = "Збережено!") => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2500);
  };

  // Save fields + article
  const handleSaveFields = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const article = articleRef.current?.getArticle();
    await updateDinoV2(id, {
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
    setSaving(false);
    showSaved();
  };

  // Images — open ML modal on select
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setMlPendingFile(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleMlConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!mlPendingFile) return;
    const fileToUpload = mlPendingFile;
    setMlPendingFile(null);
    await uploadDinoImageV2(id, fileToUpload, false);
    await refresh();
  };

  const handleSetMain = async (imageId: string) => {
    const img = images.find((i) => i._id === imageId);
    if (!img) return;
    await uploadDinoImageV2(id, img.file, true);
    await deleteDinoImageV2(imageId);
    await refresh();
  };

  const handleDeleteImage = async (imageId: string) => {
    await deleteDinoImageV2(imageId);
    await refresh();
  };

  // Locations
  const handleAddLocation = async () => {
    if (!locPlaceUk.trim() && !locPlaceEn.trim()) return;
    await addFoundLocationV2(id, { uk: locPlaceUk, en: locPlaceEn }, locLat, locLng);
    setLocPlaceUk(""); setLocPlaceEn(""); setLocLat(0); setLocLng(0);
    await refresh();
  };

  const handleDeleteLocation = async (locId: string) => {
    await deleteFoundLocationV2(locId);
    await refresh();
  };

  // Delete dino
  const handleDelete = async () => {
    if (!confirm(`Видалити ${dino?.latinName}? Це незворотня дія.`)) return;
    await deleteDinoV2(id);
    router.push("/admin/new/dashboard/dinos");
  };

  if (loading) return <div className="flex justify-center py-20"><LoaderComponent /></div>;
  if (!dino) return <p className="text-fieryRed">Динозавра не знайдено</p>;

  return (
    <div className="flex flex-col gap-6 text-[14px] sm:text-[16px]">
      <div className="flex items-center justify-between">
        <DashboardTitleComponent text={dino.latinName} />
        <button type="button" onClick={() => router.back()} className="text-slateGray hover:text-white duration-200 text-[14px]">← Назад</button>
      </div>

      {savedMsg && (
        <p className="text-green-400 font-semibold text-[14px]">{savedMsg}</p>
      )}

      {/* ── Основні поля + стаття ── */}
      <form onSubmit={handleSaveFields} className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">Основні дані</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <InputComponent text="Назва (УКР)" value={nameUk} valueOnChange={(e) => setNameUk(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
            <InputComponent text="Назва (ENG)" value={nameEn} valueOnChange={(e) => setNameEn(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
          </div>

          <InputComponent text="Латинська назва" value={latinName} valueOnChange={(e) => setLatinName(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <InputComponent text="Довжина (м)" value={length} valueOnChange={(e) => setLength(+e.target.value)} type="number" isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
            <InputComponent text="Вага (кг)" value={weight} valueOnChange={(e) => setWeight(+e.target.value)} type="number" isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
          </div>

          <label className="flex flex-col gap-1">
            <span>Тип</span>
            <select value={typeOfDino} onChange={(e) => setTypeOfDino(e.target.value)} className="bg-darkGray text-white py-2 px-2 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              {Object.entries(dinoTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span>Харчування</span>
            <select value={diet} onChange={(e) => setDiet(e.target.value)} className="bg-darkGray text-white py-2 px-2 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              {Object.entries(dinoDietLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span>Геологічний період</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="bg-darkGray text-white py-2 px-2 border-2 border-transparent focus:outline-none focus:border-brightOrange">
              {Object.entries(dinoPeriodLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>

          <InputComponent text="Дата періоду" value={periodDate} valueOnChange={(e) => setPeriodDate(e.target.value)} isRequired colorStyle="black" borderColor="transparent" textStyle="small" />
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">Стаття</h3>
          <DinoV2ArticleEditor
            ref={articleRef}
            initialUk={dino.article?.uk}
            initialEn={dino.article?.en}
          />
        </section>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-56 py-3 bg-brightOrange text-white font-semibold hover:bg-opacity-90 duration-200 disabled:opacity-50"
        >
          {saving ? "Збереження..." : "Зберегти зміни"}
        </button>
      </form>

      {/* ── Зображення ── */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">Зображення</h3>
        <p className="text-[12px] text-slateGray">Помаранчева рамка — обкладинка. Наведіть на фото щоб керувати.</p>

        {refreshing ? (
          <LoaderComponent />
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {/* Add button as first slide */}
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => imgFileRef.current?.click()}
                  className="border-4 border-dashed border-slateGray text-slateGray hover:border-brightOrange hover:text-brightOrange duration-200 flex items-center justify-center text-[32px] h-[200px] sm:h-[300px] w-[140px] sm:w-[200px]"
                >
                  +
                </button>
              </div>

              {images.map((img) => (
                <div key={img._id} className="relative group flex-shrink-0">
                  <div className={`border-4 ${img.isMain ? "border-brightOrange" : "border-slateGray"}`}>
                    {img.isMain && (
                      <span className="absolute top-0 left-0 bg-brightOrange text-white text-[10px] px-1 z-10">
                        Обкладинка
                      </span>
                    )}
                    <Image
                      src={img.file || imageNotFound}
                      alt=""
                      width={400}
                      height={300}
                      className="w-auto h-[200px] sm:h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 duration-200 flex flex-col items-center justify-center gap-2 p-2">
                      {!img.isMain && (
                        <button
                          type="button"
                          onClick={() => handleSetMain(img._id)}
                          className="bg-brightOrange text-white text-[12px] px-3 py-1 hover:bg-opacity-90 w-full text-center"
                        >
                          Обкладинка
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img._id)}
                        className="bg-fieryRed text-white text-[12px] px-3 py-1 hover:bg-opacity-90 w-full text-center"
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}
        <input ref={imgFileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
      </section>

      {/* ── Місця розкопок ── */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[16px] sm:text-[18px] font-semibold border-b-2 border-brightOrange pb-1">Місця розкопок</h3>

        {/* Map */}
        {locations.length > 0 && (
          <div className="h-[250px] sm:h-[450px] w-full">
            <Map
              initialViewState={{
                longitude: locations[0]?.longitude || 0,
                latitude: locations[0]?.latitude || 0,
                zoom: 1.5,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            >
              {locations.map((loc) => (
                <Marker
                  key={loc._id}
                  longitude={loc.longitude}
                  latitude={loc.latitude}
                  color="red"
                />
              ))}
            </Map>
          </div>
        )}

        {/* Add location form */}
        <div className="flex flex-col sm:flex-row gap-2 items-end flex-wrap">
          <InputComponent text="Широта" value={locLat} valueOnChange={(e) => setLocLat(+e.target.value)} type="number" colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="w-full sm:w-32" />
          <InputComponent text="Довгота" value={locLng} valueOnChange={(e) => setLocLng(+e.target.value)} type="number" colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="w-full sm:w-32" />
          <InputComponent text="Місце (УКР)" value={locPlaceUk} valueOnChange={(e) => setLocPlaceUk(e.target.value)} placeholder="напр. Монголія" colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="flex-1 w-full" />
          <InputComponent text="Місце (ENG)" value={locPlaceEn} valueOnChange={(e) => setLocPlaceEn(e.target.value)} placeholder="e.g. Mongolia" colorStyle="black" borderColor="transparent" textStyle="small" customLabelStyles="flex-1 w-full" />
          <button type="button" onClick={handleAddLocation} className="py-2 px-6 bg-green-600 text-white hover:bg-green-700 duration-200 h-10">
            Додати
          </button>
        </div>

        {/* Locations list */}
        {locations.length === 0 ? (
          <p className="text-slateGray text-[13px]">Локацій немає</p>
        ) : (
          <div className="flex flex-col gap-1">
            {locations.map((loc) => (
              <div key={loc._id} className="flex items-center justify-between bg-darkGray text-white py-2 px-4">
                <span className="text-[13px]">
                  {loc.place.uk} / {loc.place.en} — {loc.latitude.toFixed(2)}, {loc.longitude.toFixed(2)}
                </span>
                <button type="button" onClick={() => handleDeleteLocation(loc._id)} className="text-fieryRed hover:text-red-300 duration-200 ml-3">
                  <Image src={close} alt="видалити" width={14} height={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Видалення ── */}
      <section className="border-t-2 border-fieryRed pt-4">
        <button
          type="button"
          onClick={handleDelete}
          className="py-2 px-8 bg-fieryRed text-white font-semibold hover:bg-opacity-80 duration-200"
        >
          Видалити динозавра
        </button>
      </section>

      {/* ── ML modal ── */}
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
    </div>
  );
};

export default DinoV2DetailDashboard;
