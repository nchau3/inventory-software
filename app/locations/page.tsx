import { prisma } from "../../prisma/client";
import Table from "../components/tables/table";

const columns = ["name", "status", "last_modified"];

const getLocations = async () => {
  const locationsData = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
      is_active: true,
      date_created: true,
      last_modified: true,
      items: {
        select: {
          item: true
        }
      }
    }
  });


  return locationsData.map(location => {
    return {
      ...location,
      columns
    }
  });
};

export default async function Locations() {
  const locations = await getLocations();

  return <Table data={{body: locations, columns: columns}} />;
}
