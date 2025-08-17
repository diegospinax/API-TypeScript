interface RegexOperationList {
    createRegex: RegExp,
    updateRegex: RegExp
}

export const nameRegexList: RegexOperationList = {
    createRegex: /^[A-za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-za-zÁÉÍÓÚáéíóúÑñ]+)?$/,
    updateRegex: /^[a-zA-Z\s]{3,}$/
}

export const emailRegexList: RegexOperationList = {
    createRegex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    updateRegex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
}

export const passwordRegexList: RegexOperationList = {
    createRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/,
    updateRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
}