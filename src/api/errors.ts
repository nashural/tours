import { APIError } from './types'

export const PASSWORD_MISMATCH = 'password-mismatch';
export const USER_NOT_FOUND = 'user-not-found';
export const EMAIL_IN_USE = 'email-in-use';
export const TOKEN_MISMATCH = 'token-mismatch';
export const TOKEN_EXPIRED = 'token-expired';
export const NOT_EQUAL_PASSWORDS = 'not-equal-passwords';

export const issetError = (errors: APIError[], errorCode: string): boolean => {
  for (let { code } of errors) {
    if (code === errorCode) {
      return true
    }
  }
  return false
}

export const findError = (errors: APIError[], errorCode: string): APIError | null => {
  for (let error of errors) {
    if (error.code === errorCode) {
      return error
    }
  }
  return null
}
