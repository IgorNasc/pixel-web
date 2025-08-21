export class DuplicateEmailError extends Error {
  constructor() {
    super("Este email já está cadastrado.")
    this.name = "DuplicateEmailError"
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Credenciais inválidas.")
    this.name = "InvalidCredentialsError"
  }
}

