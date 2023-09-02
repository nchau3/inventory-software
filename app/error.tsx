'use client'

import { useEffect } from "react"

export default function Error({
    error,
    reset
}: {
    error: Error,
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h2>Oh no!</h2>
            <p>{error.message}</p>
        </div>
    )
}