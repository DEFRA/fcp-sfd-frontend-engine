// Allows digits, spaces, brackets, and an optional leading +, but requires at least one digit.
// The (?=...) part checks a digit exists first for efficiency and time complexity.
export const PHONE_NUMBER_PATTERN = /^\+?(?=[\d ()]*\d)[\d ()]*$/

// Rejects ASCII control characters (0x00–0x1f and 0x7f) which have no valid use in text input fields
export const NO_CONTROL_CHARS_PATTERN = /^[^\x00-\x1f\x7f]*$/
