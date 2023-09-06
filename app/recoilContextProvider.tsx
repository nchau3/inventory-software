'use client'

import { RecoilRoot, atom } from "recoil";

export default function ({ children } : { children: React.ReactNode}) {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    )
}