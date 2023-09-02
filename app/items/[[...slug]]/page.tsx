import { prisma } from "@/prisma/client";
import Table from "../../components/tables/table";
import SearchBar from "../../components/tables/search-bar";

const columns = ["name", "sku", "qoh", "status", "last_modified"];
const approvedSlugs = ['search'];

export default async function Items({
    params,
    searchParams
  }: { 
    params: { slug: string[] }, 
    searchParams: { [key: string]: string | undefined}
}) {
  if (params.slug) {
    const slugs = params.slug;
    slugs.forEach(slug => {
      if (!approvedSlugs.includes(slug)) {
        throw new Error("Page not found.");
      }
    });
  }
  const query = searchParams.q || "";
  const skip = Number(searchParams.skip) || 0;
  const take = 50;
  const searchTerm = query.length > 3 ? "contains" : "startsWith";
  
  const getItems = async (query: string) => {
    let itemsData;
    let totalRecords = 0;
      if (query && params.slug[0] === "search") {
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
          });
          totalRecords = await prisma.item.count({
            where: {
              OR: [
                {
                    name: {
                        contains: query
                    }
                },
                {
                    sku: {
                        contains: query
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
              }
            });
      }
    
      return itemsData.map(item => {
        const qoh = item.locations.reduce((prev, curr) => prev + curr.quantity, 0);
        return {
          ...item,
          qoh,
          columns,
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
