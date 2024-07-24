import { AuthUser } from "@supabase/supabase-js"
import { Result, AuthError, error, ok } from "../lib/result"
import { client } from "../../supabase/client"

export type User = AuthUser

export const getCurrentUser = async (): Promise<Result<AuthUser, AuthError>> => {
    const { data, error: supabaseAuthError } = await client.auth.getUser()

    if (supabaseAuthError || !data?.user || data.user.is_anonymous) {
        return error({ type: "authentication", message: "Could not authenticate the current user. Please log in to continue." })
    }

    return ok(data.user)
}