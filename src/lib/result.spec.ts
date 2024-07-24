import { error, ok } from "./result"

describe("ok", () => {
    it("creates an ok result", () => {
        const result = ok("data")
        expect(result).toEqual({ type: "ok", data: "data", error: null })
    })
})

describe("error", () => {
    it("creates an error result", () => {
        const result = error({ type: "unknown", message: "An unknown error occurred" })
        expect(result).toEqual({ type: "error", data: null, error: { type: "unknown", message: "An unknown error occurred" } })
    })
})