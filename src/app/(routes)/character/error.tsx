'use client'

import SpaceContainer from "@/app/components/space-container/SpaceContainer"

interface ErrorPageProps {
    error: Error & { digest?: string}
    reset: () => void
}

const ErrorPage = ({error, reset}: ErrorPageProps) => {
    return (
        <SpaceContainer>
            <h1 className="text-2xl mb-4">Error</h1>
            <p className="mb-4">{error.message}</p>
            <button className="bg-primary text-white rounded-xl px-4 py-2 w-full" onClick={reset}>Try Again</button>
        </SpaceContainer>
    )
}

export default ErrorPage