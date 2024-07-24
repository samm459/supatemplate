import { Schema } from "yup"
import { error, ok, Result, UnknownError, ValidationError } from "./result"
import { ValidationError as YupError } from "yup"

export const validate = async <T>(schema: Schema<T>, inputData: any): Promise<Result<T, ValidationError | UnknownError>> => {
    try {
        const data = await schema.validate(inputData, { abortEarly: false })
        return ok(data)
    } catch (e) {
        if (!(e instanceof YupError)) {
            console.error(e)
            return error({ type: "unknown", message: "An unknown error occurred" })
        }
        const fields = e.inner.reduce((acc, err) => ({ ...acc, [err.path]: err.message }), {})
        return error({ type: "validation", fields, message: "Input validation failed" })
    }
}