"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { getDinosV2 } from "@/services/DinoV2Service";
import { IDino, IDinoV2 } from "@/config/types";

import DinoCard from "@/components/dino/DinoCard";
import DashboardTitleComponent from "@/components/dashboard/DashboardTitleComponent";

const adaptV2ToCard = (dino: IDinoV2): IDino =>
  ({ ...dino, image: dino.mainImage ?? undefined } as unknown as IDino);

const DinosV2ListDashboard = () => {
  const t = useTranslations("admin.v2.list");
  const router = useRouter();
  const [dinos, setDinos] = useState<IDinoV2[]>([]);
  const [filtered, setFiltered] = useState<IDinoV2[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getDinosV2(0, 1000);
      setDinos(data?.dinos ?? []);
      setFiltered(data?.dinos ?? []);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      dinos.filter(
        (d) =>
          d.latinName.toLowerCase().includes(q) ||
          d.name.uk.toLowerCase().includes(q) ||
          d.name.en.toLowerCase().includes(q)
      )
    );
  }, [search, dinos]);

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <DashboardTitleComponent text={t("title")} />
        <input
          className="bg-darkGray text-white py-2 px-1 border-2 border-transparent focus:outline-none focus:border-brightOrange w-1/2"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-slateGray">{t("loading")}</p>
      ) : filtered.length === 0 ? (
        <span className="text-center">{t("notFound")}</span>
      ) : (
        <div className="flex flex-wrap items-center justify-around gap-5">
          {filtered
            .sort((a, b) => (a.latinName < b.latinName ? -1 : 1))
            .map((dino) => (
              <DinoCard
                border
                bgColor="black"
                textColor="white"
                key={dino._id}
                link={`/admin/new/dashboard/dinos/${dino._id}`}
                dino={adaptV2ToCard(dino)}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default DinosV2ListDashboard;
