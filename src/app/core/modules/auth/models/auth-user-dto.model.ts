export class AuthUserDto {
  public rol: string | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public token: string | undefined;

  constructor() {
    this.rol = undefined;
    this.username = undefined;
    this.password = undefined;
  }

  public getRol(): string | undefined {
    return this.rol;
  }

  public getName(): string | undefined {
    return this.username;
  }

  public getToken(): string | undefined {
    return this.token;
  }

  public setRol(value: string): this {
    this.rol = value;
    return this;
  }

  public setName(value: string): this {
    this.username = value;
    return this;
  }

  public setToken(value: string): this {
    this.token = value;
    return this;
  }
}
