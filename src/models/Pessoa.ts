export class Pessoa {
  protected _nome: string;
  protected _idade: number;

  constructor(nome: string, idade: number) {
    this._nome = nome;
    this._idade = idade;
  }

  // Getters e Setters
  public get nome(): string {
    return this._nome;
  }

  // Metodos de instancia
  public adicionarPessoa(): void {
    console.log(`adicionando pessoa: ${this.nome}`);
  }

  public listarPessoas(): Pessoa[] {
    console.log("Listando pessoas...");
    return [];
  }

  public atualizarCadastro(): void {
    console.log(`atualizando pessoa: ${this.nome}`);
  }

  public removerPessoa(): void {
    console.log(`removendo pessoa: ${this.nome}`);
  }

  // Metodos estaticos
}
