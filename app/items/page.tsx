import { prisma } from "@/prisma/client";
import Table from "../components/tables/table";
import SearchBar from "../components/tables/search-bar";
import PaginationBar from "../components/tables/pagination-bar";
import TableClient from "../components/tables/table-client";

const columns = ["name", "sku", "qoh", "status", "last_modified"];

export default async function Items({
    params,
    searchParams
  }: { 
    params: { slug: string[] }, 
    searchParams: { [key: string]: string | undefined}
}) {

  const query = searchParams.search || "";
  const currentPage = Number(searchParams.page) || 1;
  const take = 50;
  const skip = searchParams.page  && searchParams.page !== "1" ? ((Number(searchParams.page) - 1) * take) : 0;

  const urlPath = `/items?search=${query}`;
  
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
                    [searchTerm]: query,
                    mode: 'insensitive'
                  }
                },
                {
                  sku: {
                    [searchTerm]: query,
                    mode: 'insensitive'
                  }
                },
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
                    [searchTerm]: query,
                    mode: 'insensitive'
                  }
                },
                {
                  sku: {
                    [searchTerm]: query,
                    mode: 'insensitive'
                  }
                },
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
          
          totalRecords = await prisma.item.count();
      }
    
      const items = itemsData.map(item => {
        const qoh = item.locations.reduce((prev, curr) => prev + curr.quantity, 0);
        return {
          ...item,
          qoh,
          columns
        }
      });

      return { items, totalRecords };
    };

  const { items, totalRecords } = await getItems(query);
  const lastPage = items.length < take;

  return (
    <div className="max-w-[1200px]">
      <TableClient searchProps={{path: "items"}} filterProps={{
        currentPage: currentPage,
        lastPage: lastPage,
        recordsDisplayed: items.length,
        totalRecords: totalRecords
      }}></TableClient>
      <Table data={{ body: items, columns }}></Table>
    </div>
  );
}