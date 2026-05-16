import FindProperties from '@/components/web-pages/FindProperties'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FindProperties />
        </Suspense>
    )
}

export default page
