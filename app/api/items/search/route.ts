import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

const columns = ["name", "sku", "qoh", "status", "last_modified"];

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q")!;

    const getItems = async (query: string) => {
        let itemsData;
        if (query) {
            itemsData = await prisma.item.findMany({
              where: {
                OR: [
                  {
                      name: {
                          startsWith: query
                      }
                  },
                  {
                      sku: {
                          contains: query
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
              }
            });
        } else {
            itemsData = await prisma.item.findMany({
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
            columns
          }
        });
      };

    const data = await getItems(query);
    return NextResponse.json(data);
}
