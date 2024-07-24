jest.mock("../../supabase/client", () => {
    const getUser = jest.fn()
    const auth = { getUser }
    const client = { auth }
    return { client }
})

import { getCurrentUser } from "./users"
import { client } from "../../supabase/client"

describe("getCurrentUser", () => {
    it("returns the current user", async () => {
        const user = { id: "123" };

        (client.auth.getUser as jest.Mock).mockResolvedValue({ data: { user } })

        const result = await getCurrentUser()

        expect(result.error).toBeNull()
        expect(result.data).toEqual(user)
    })

    it("handles authentication errors", async () => {
        const error = new Error("Authentication error");

        (client.auth.getUser as jest.Mock).mockResolvedValue({ error })

        const result = await getCurrentUser()

        expect(result.error).not.toBeNull()
        expect(result.data).toBeNull()
        expect(result.error?.type).toBe("authentication")
        expect(result.error?.message).toBe("Could not authenticate the current user. Please log in to continue.")
    })

    it("handles missing user data", async () => {
        (client.auth.getUser as jest.Mock).mockResolvedValue({ data: {} })

        const result = await getCurrentUser()

        expect(result.error).not.toBeNull()
        expect(result.data).toBeNull()
        expect(result.error?.type).toBe("authentication")
        expect(result.error?.message).toBe("Could not authenticate the current user. Please log in to continue.")
    })

    it("handles anonymous users", async () => {
        const user = { id: "123", is_anonymous: true };

        (client.auth.getUser as jest.Mock).mockResolvedValue({ data: { user } })

        const result = await getCurrentUser()

        expect(result.error).not.toBeNull()
        expect(result.data).toBeNull()
        expect(result.error?.type).toBe("authentication")
        expect(result.error?.message).toBe("Could not authenticate the current user. Please log in to continue.")
    })
})
