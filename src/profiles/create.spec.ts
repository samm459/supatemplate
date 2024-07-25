jest.mock("../../supabase/client", () => {
    const single = jest.fn(() => ({ data: { id: "123", first_name: "John", last_name: "Doe" } }))
    const select = jest.fn(() => ({ single }))
    const insert = jest.fn(() => ({ select }))
    const from = jest.fn(() => ({ insert }))
    const client = { from }

    return { client }
})

jest.mock("../auth/users", () => ({ getCurrentUser: jest.fn() }))

import { createProfile } from "./create"
import { getCurrentUser } from "../auth/users"
import { AuthError, ValidationError } from "../lib/result"
import { client } from "../db/client"

describe("createProfile", () => {
    it("handles unauthenticated users", async () => {
        (getCurrentUser as jest.Mock).mockResolvedValue({ type: "error", data: null, error: { type: "authentication", message: "User could not be authenticated" } as AuthError })

        const result = await createProfile({ firstName: "John", lastName: "Doe" })

        expect(result.error).not.toBeNull()
        expect(result.data).toBeNull()
        expect(result.error?.type).toBe("authentication")
        expect(result.error?.message).toBe("User could not be authenticated")
    })

    it("handles invalid input", async () => {
        (getCurrentUser as jest.Mock).mockResolvedValue({ type: "ok", data: { id: "123" } })

        const result = await createProfile({ firstName: "", lastName: "" })

        expect(result.error).not.toBeNull()
        expect(result.data).toBeNull()
        expect(result.error?.type).toBe("validation")
        expect((result.error as ValidationError)?.fields).toEqual({ firstName: "firstName is a required field", lastName: "lastName is a required field" })
    })

    it("inserts the new profile", async () => {
        (getCurrentUser as jest.Mock).mockResolvedValue({ type: "ok", data: { id: "123" } })

        await createProfile({ firstName: "John", lastName: "Doe" })

        expect(client.from("profiles").insert).toHaveBeenCalledWith({
            first_name: "John",
            last_name: "Doe",
        })
    })

    it("returns the new profile", async () => {
        (getCurrentUser as jest.Mock).mockResolvedValue({ type: "ok", data: { id: "123" } })

        const result = await createProfile({ firstName: "John", lastName: "Doe" })

        expect(result.error).toBeNull()
        expect(result.data).toEqual({ id: "123", first_name: "John", last_name: "Doe" })
    })
})