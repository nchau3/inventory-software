import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

const columns = ["name", "sku", "qoh", "status", "last_modified"];

const getItems = async (query: string, skip: number, take: number) => {
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

    return { items, columns, totalRecords };
  };

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const query = searchParams.get("q") || "";
    const skip = Number(searchParams.get("skip"));
    const take = Number(searchParams.get("take"));


    const data = await getItems(query, skip, take);
    return NextResponse.json(data);
}
