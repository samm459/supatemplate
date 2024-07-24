import { object, string } from "yup"
import { validate } from "./validate"

describe("validate", () => {
    it("validates the input data", async () => {
        const schema = object({
            firstName: string().required(),
            lastName: string().required(),
        })
        const inputData = {
            firstName: "John",
            lastName: "Doe",
        }
        const result = await validate(schema, inputData)
        expect(result).toEqual({ type: "ok", data: inputData, error: null })
    })

    it("returns a validation error for invalid input data", async () => {
        const schema = object({
            firstName: string().required(),
            lastName: string().required(),
        })
        const inputData = {
            firstName: "John",
        }
        const result = await validate(schema, inputData)
        expect(result).toEqual({
            type: "error",
            data: null,
            error: {
                type: "validation",
                fields: { lastName: "lastName is a required field" },
                message: "Input validation failed",
            },
        })
    })

    it("returns an unknown error for an unknown error", async () => {
        const inputData = {
            firstName: "John",
            lastName: "Doe",
        }

        // Mock the console.error function to prevent the error from being logged in the test output
        jest.spyOn(console, "error").mockImplementationOnce(() => { })

        // This will throw a "Cannot read properties of null" error, which is an unknown error to the function
        const result = await validate(null as unknown as any, inputData)

        expect(result).toEqual({
            type: "error",
            data: null,
            error: { type: "unknown", message: "An unknown error occurred" },
        })
    })
})