const BaseContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="px-2 sm:px-5 lg:px-20 mx-auto">{children}</div>;
};

export default BaseContainer;
