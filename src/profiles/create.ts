import { object, string } from "yup"
import { Profile } from "."
import { client } from "../db/client"
import { Result, error, AuthError, DatabaseError, UnknownError, ValidationError, ok } from "../lib/result"
import { Database } from "../db/types"
import { validate } from "../lib/validate"
import { getCurrentUser } from "../auth/users"

export interface CreateProfileOptions {
    firstName: Database["public"]["Tables"]["profiles"]["Row"]["first_name"],
    lastName: Database["public"]["Tables"]["profiles"]["Row"]["last_name"],
}

export type CreateProfileError =
    | AuthError
    | ValidationError
    | DatabaseError
    | UnknownError

/**
 * Create a new profile for the current user
 * 
 * @param options Data for the new profile
 */
export const createProfile = async (options: CreateProfileOptions): Promise<Result<Profile, CreateProfileError>> => {
    try {
        // Authenticate the user
        const { error: authenticationError } = await getCurrentUser()
        if (authenticationError) return error(authenticationError)

        // Validate the options
        const { data, error: validationError } = await validate(object({
            firstName: string().required(),
            lastName: string().required(),
        }), options)
        if (validationError) return error(validationError)

        // Insert the new profile
        const { data: profile, error: databaseError } = await client.from("profiles").insert({
            first_name: data.firstName,
            last_name: data.lastName,
        }).select("*").single()
        if (databaseError) return error({ type: "database", ...databaseError })

        return ok(profile)
    } catch (err) {
        console.error(err)
        return error({ type: "unknown", message: "An unknown error occurred" })
    }
}