import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

const columns = ["name", "sku", "qoh", "status", "last_modified"];

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = url.searchParams;
    const query = params.get("query") || "";
    const skip = Number(params.get("skip"));
    const take = Number(params.get("take"));
    const searchTerm = query.length > 3 ? "contains" : "startsWith";
    
    const getItems = async (query: string) => {
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
              totalRecords = await prisma.item.count();
        }
      
        if (!itemsData) {
          return [{totalRecords}]
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

    const data = await getItems(query);
    return NextResponse.json(data);
}
