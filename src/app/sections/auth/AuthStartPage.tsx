import Link from "next/link";

const AuthStartPage = () => {
  return (
    <div className="h-screen text-white flex flex-col items-center justify-center gap-10 bg-auth-bg bg-bottom bg-cover bg-no-repeat relative after:absolute after:w-full after:h-full after:bg-black after:bg-opacity-85 after:backdrop-blur-[2px]">
      <div className="flex flex-col gap-5 md:flex-row md:justify-evenly justify-center items-center w-full relative z-10">
        <Link
          className="py-2 w-[250px] text-center rounded-md text-[18px] bg-brightOrange hover:text-brightOrange hover:bg-white duration-300"
          href="/auth/login"
        >
          Вхід
        </Link>
        <Link
          className="py-2 w-[250px] text-center rounded-md text-[18px] bg-brightOrange hover:text-brightOrange hover:bg-white duration-300"
          href="/auth/registration"
        >
          Реєстрація
        </Link>
      </div>

      <Link
        className="relative z-10 py-2 text-center text-[16px] underline hover:text-brightOrange duration-300"
        href="/"
      >
        Вхід без реєстрації
      </Link>
    </div>
  );
};

export default AuthStartPage;
