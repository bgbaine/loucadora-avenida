export class Pessoa {
  protected _nome: string;
  protected _idade: number;

  constructor(nome: string, idade: number) {
    this._nome = nome;
    this._idade = idade;
  }

  public get nome(): string {
    return this._nome;
  }

  /* TODO: dependendo da arquitetura, criar metodo adicionarPessoa()
    se for o caso: passar para csv ANTES
    public adicionarPessoa(): void  {}*/

  // TODO: implementar metodo atualizarCadastro(): passar para csv ANTES
  public atualizarCadastro(): void {
    console.log(`atualizando pessoa: ${this.nome}`);
  }
}
