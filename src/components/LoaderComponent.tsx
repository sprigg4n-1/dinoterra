const LoaderComponent = ({
  pathColor = "#607D8B",
  loaderColor = "#FF9800",
}: {
  pathColor?: string;
  loaderColor?: string;
}) => {
  return (
    <div
      className="w-10 h-10 rounded-full border-[6px] animate-spin"
      style={{
        borderColor: pathColor,
        borderRightColor: loaderColor,
        borderTopColor: loaderColor,
      }}
    ></div>
  );
};

export default LoaderComponent;
