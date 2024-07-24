export type Result<T, E> =
    { type: "ok", data: T, error: null } |
    { type: "error", data: null, error: E }

export const ok = <T, E extends BaseError>(data: T): Result<T, E> => ({ type: "ok", data, error: null })
export const error = <T, E>(error: E): Result<T, E> => ({ type: "error", data: null, error })

export interface BaseError {
    type: "not_found" | "authentication" | "permission" | "validation" | "database" | "unknown"
    message: string
}

export type NotFoundError = BaseError & { type: "not_found", resource_id: string }
export type AuthError = BaseError & { type: "authentication" }
export type PermissionError = BaseError & { type: "permission" }
export type DatabaseError = BaseError & { type: "database", details: string }
export type UnknownError = BaseError & { type: "unknown" }
export type ValidationError = BaseError & { type: "validation", fields: { [key: string]: string } }