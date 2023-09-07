import { prisma } from "@/prisma/client"
import { formatRelative } from "date-fns";
import { revalidatePath } from "next/cache";

const getItemDetails = async (id: string) => {
    const data = await prisma.item.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            name: true,
            sku: true,
            date_created: true,
            last_modified: true,
            is_active: true,
            locations: {
                include: {
                    location: true
                }
            }
        }
    });

    if (!data) {
        throw new Error("Item not found");
    }

    const qoh = data.locations.reduce((prev, curr) => prev + curr.quantity, 0);

    return {
        ...data,
        qoh
    };
}

export default async function ItemDetails({ params }: { params: { id: string }}) {

    const { name, sku, id, qoh, is_active, date_created, last_modified, locations } = await getItemDetails(params.id);
    
    const locationList = locations.map(location => {
        const locationName = location.location.name;
        return (
        <span className="mb-2">
            <label htmlFor={`${locationName}-quantity`}>{`${locationName}: `}</label>
            <input 
                id={`${locationName}-quantity`} 
                name={location.locationId.toString()} 
                type="number" className="w-1/3" 
                defaultValue={location.quantity}></input>
        </span>
        )
    });

    const updateItem = async (formData: FormData) => {
        'use server'
        
        const entries = Array.from(formData.entries());

        for (let entry of entries) {
            if (entry[1]) {
                if (entry[0] === 'name' || entry[0] === 'sku') {
                    await prisma.item.update({
                        where: {
                            id: id
                        },
                        data: {
                            [entry[0]]: entry[1].toString()
                        }
                    })
                } else {
                    await prisma.item.update({
                        where: {
                            id: id
                        },
                        data: {
                            locations: {
                                update: {
                                    where: {
                                        itemId_locationId: {
                                            itemId: id,
                                            locationId: Number(entry[0])
                                        }
                                    },
                                    data: {
                                        quantity: Number(entry[1])
                                    }
                                }
                            }
                        }
                    })
                }
            }
        }

        revalidatePath(`/items/${id}`);
    }

    return (
        <div className="w-2/3">
            <h1 className="text-xl font-bold">{name}</h1>
            <br></br>
            <form className="flex flex-col text-xl" action={updateItem}>
                <span className="mb-2">
                    <label htmlFor="name">Name: </label>
                    <input id="name" name="name" type="name" placeholder={name}></input>
                </span>
                <span className="mb-2">
                    <label htmlFor="sku">SKU: </label>
                    <input id="sku" name="sku" type="name" placeholder={sku}></input>
                </span>
                <p>{`QOH: ${qoh}`}</p>
                <div className="ml-3">
                    <h4 className="mb-2">Locations:</h4>
                    <div className="flex flex-col">
                        {locationList}
                    </div>
                </div>
                <button type="submit" className="bg-slate-500 text-white w-1/3">SUBMIT</button>
                <p className="text-sm">{`Last modified: ${formatRelative(last_modified, new Date())}`}</p>
            </form>
        </div>
    )
}