export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";

export enum INVALID {
  TOO_SHORT = "너무 짧습니다.",
  TOO_LONG = "너무 깁니다.",
  EMAIL = "잘못된 이메일 형식입니다.",
  STRING = "문자여야 합니다.",
  INPUT = "입력해주세요.",
}

export const CONTENT_PER_PAGE = 1;
