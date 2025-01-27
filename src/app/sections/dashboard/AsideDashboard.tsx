const AsideDashboard = ({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (value: string) => void;
}) => {
  return (
    <div className="h-screen bg-darkPurple w-[350px] py-3 px-5 text-white flex flex-col gap-10">
      <h2 className="font-bold text-[26px] text-center">Адмін панель</h2>
      <ul className="flex flex-col gap-5">
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              setActivePage("dinos");
            }}
            className={`w-full p-2 text-[18px] ${
              activePage === "dinos"
                ? "text-right bg-brightOrange font-semibold text-white"
                : "text-black bg-softGray text-left"
            }`}>
            Динозаври
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              setActivePage("users");
            }}
            className={`w-full p-2 text-[18px] ${
              activePage === "users"
                ? "text-right bg-brightOrange font-semibold text-white"
                : "text-black bg-softGray text-left"
            }`}>
            Користувачі
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AsideDashboard;
