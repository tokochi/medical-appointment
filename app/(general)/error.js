'use client'
import { useStore } from "@context/store";
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LoadingComponent from "@components/utils/LoadingComponent";


export default function Error({ error, reset }) {
    const path = usePathname()
    const { handleAddError, isLoading,session }=useStore()
    const router = useRouter()
    useEffect(() => {
        handleAddError({ error: error.stack, path, session:session?._id },router)
        console.error(error)
    }, [error])
    return (
        <div>
            <div className=' fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <LoadingComponent size={100} color='#0891b2' loading={isLoading} />
            </div>
        </div>
    )
}