import Image from "next/image";
import { TDinoFoundLocation } from "./DinoForm";

import InputComponent from "@/components/form/InputComponent";

import close from "@/images/vectors/close.svg";
import { v4 } from "uuid";

interface Props {
  latitudeLoc: number;
  longitudeLoc: number;
  placeLoc: string;
  foundLocations: TDinoFoundLocation[];
  setLatitudeLoc: React.Dispatch<React.SetStateAction<number>>;
  setLongitudeLoc: React.Dispatch<React.SetStateAction<number>>;
  setPlaceLoc: React.Dispatch<React.SetStateAction<string>>;
  setFoundLocations: React.Dispatch<React.SetStateAction<TDinoFoundLocation[]>>;
}

const DinoAddLocations = ({
  latitudeLoc,
  longitudeLoc,
  placeLoc,
  foundLocations,
  setLatitudeLoc,
  setLongitudeLoc,
  setPlaceLoc,
  setFoundLocations,
}: Props) => {
  const onHandleAddLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newFoundLoc: TDinoFoundLocation = {
      id: v4(),
      latitude: latitudeLoc.toString(),
      longitude: longitudeLoc.toString(),
      place: placeLoc,
    };

    setFoundLocations((foundLocations) => [...foundLocations, newFoundLoc]);

    setLatitudeLoc(0);
    setLongitudeLoc(0);
    setPlaceLoc("");
  };

  const onHandleDeleteLocation = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    setFoundLocations((foundLocations) => [
      ...foundLocations.filter((loc) => loc.id !== id),
    ]);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[16px] font-medium sm:text-[20px]">Місця:</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex w-full sm:w-fit justify-between gap-2">
          <InputComponent
            text="Широта"
            value={latitudeLoc}
            valueOnChange={(e) => setLatitudeLoc(+e.target.value)}
            textStyle="small"
            type="number"
            isRequired
            colorStyle="black"
            borderColor="transparent"
            customLabelStyles="flex-1"
          />

          <InputComponent
            text="Довгота"
            value={longitudeLoc}
            valueOnChange={(e) => setLongitudeLoc(+e.target.value)}
            textStyle="small"
            type="number"
            isRequired
            colorStyle="black"
            borderColor="transparent"
            customLabelStyles="flex-1"
          />
        </div>

        <InputComponent
          text="Місце"
          value={placeLoc}
          valueOnChange={(e) => setPlaceLoc(e.target.value)}
          textStyle="small"
          type="text"
          isRequired
          placeholder="Вкажіть місце розташування"
          colorStyle="black"
          borderColor="transparent"
          customLabelStyles="flex-1"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
        <button
          className="bg-green-300 block hover:bg-green-500 px-10 h-10 w-full sm:w-auto"
          type="button"
          onClick={(e) => onHandleAddLocation(e)}
        >
          Додати
        </button>
        <div className="flex-1 flex gap-4 flex-wrap bg-slateGray w-full p-2 text-white">
          {foundLocations.length > 0
            ? foundLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-brightOrange text-white flex items-center gap-2 py-1 px-2 rounded-xl"
                >
                  <span>{loc.place}</span>
                  <button
                    className="hover:rotate-90 duration-300"
                    onClick={(e) => onHandleDeleteLocation(e, loc.id)}
                  >
                    <Image
                      src={close}
                      alt="close"
                      width={20}
                      height={20}
                      className="object-fit"
                    />
                  </button>
                </div>
              ))
            : "Ще не додано локації"}
        </div>
      </div>
    </div>
  );
};

export default DinoAddLocations;
