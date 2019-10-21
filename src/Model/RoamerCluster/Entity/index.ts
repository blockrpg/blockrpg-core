
class RoamerCluster {
  private id: string;
  private accounts: string[];

  public get Id(): string {
    return this.id;
  }

  public get Accounts(): string[] {
    return this.accounts;
  }

  public constructor(
    id: string,
    accounts: string[],
  ) {
    this.id = id;
    this.accounts = accounts;
  }
}