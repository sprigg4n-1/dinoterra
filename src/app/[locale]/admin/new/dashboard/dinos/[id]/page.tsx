import DinoV2DetailDashboard from "@/app/sections/dashboard/dinosV2/DinoV2DetailDashboard";

export default async function DinoV2DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DinoV2DetailDashboard id={id} />;
}
