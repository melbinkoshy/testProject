import { createAuthClient } from "better-auth/react"

if (!process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    throw new Error(
        "NEXT_PUBLIC_BETTER_AUTH_URL is not defined. Please set this environment variable."
    )
}

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
})