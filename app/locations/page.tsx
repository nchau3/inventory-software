import { prisma } from "../../prisma/client";
import Table from "../components/tables/table";

const path = "locations";
const columns = ["name", "status", "last_modified"];

const getLocations = async () => {
  const locationsData = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
      is_active: true,
      date_created: true,
      last_modified: true,
    },
  });

  const locations = locationsData.map((location) => {
    return {
      ...location,
      columns,
      path
    };
  });

  return { locations, columns };
};

export default async function Locations() {
  const { locations, columns } = await getLocations();

  return (
    <div className="px-10 max-w-[1200px]">
      <Table body={locations} path={path} columns={columns} />;
    </div>
  )
}
