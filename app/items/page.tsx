import { prisma } from "@/prisma/client";
import Table from "../components/tables/table";
import SearchBar from "../components/tables/search-bar";

const columns = ["name", "sku", "qoh", "status", "last_modified"];

export default async function Items({
    params,
    searchParams
  }: { 
    params: { slug: string[] }, 
    searchParams: { [key: string]: string | undefined}
}) {

  const query = searchParams.search || "";
  const skip = Number(searchParams.skip) || 0;
  const take = 50;
  
  const getItems = async (query: string) => {
    const searchTerm = query.length > 3 ? "contains" : "startsWith";
    let itemsData;
    let totalRecords = 0;
      if (query) {
          itemsData = await prisma.item.findMany({
            skip: skip,
            take: take,
            where: {
              OR: [
               {
                  name: {
                    [searchTerm]: query
                  }
                },
                {
                  sku: {
                    [searchTerm]: query
                  }
                }
              ]
            },
            select: {
              id: true,
              name: true,
              sku: true,
              last_modified: true,
              is_active: true,
              locations: {
                select: {
                  quantity: true
                }
              }
            },
            orderBy: {
              _relevance: {
                fields: ['name', 'sku'],
                search: query,
                sort: 'desc'
              }
            }
          });
          totalRecords = await prisma.item.count({
            where: {
              OR: [
                {
                    name: {
                        [searchTerm]: query
                    }
                },
                {
                    sku: {
                        [searchTerm]: query
                    }
                }
              ]
            }
          })
      } else {
          itemsData = await prisma.item.findMany({
              skip: skip,
              take: take,
              select: {
                id: true,
                name: true,
                sku: true,
                last_modified: true,
                is_active: true,
                locations: {
                  select: {
                    quantity: true
                  }
                }
              },
              orderBy: {
                last_modified: 'desc'
              }
            });
      }
    
      return itemsData.map(item => {
        const qoh = item.locations.reduce((prev, curr) => prev + curr.quantity, 0);
        return {
          ...item,
          qoh,
          columns,
          totalRecords
        }
      });
    };

  const items = await getItems(query);

  return (
    <div className="max-w-[1200px]">
      <SearchBar path="items"></SearchBar>
      <Table data={{ body: items, columns }}></Table>
    </div>
  );
}
