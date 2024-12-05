import { Pessoa } from "./Pessoa";

export class Cliente extends Pessoa {
  private _cpf: string;
  private _endereco: string;
  private _telefone: string;

  // TODO: passar para csv
  private static clientes: Cliente[] = [];

  // TODO: passar para csv
  constructor(
    nome: string,
    idade: number,
    cpf: string,
    endereco: string,
    telefone: string
  ) {
    super(nome, idade);
    this._cpf = cpf;
    this._endereco = endereco;
    this._telefone = telefone;
    Cliente.clientes.push(this);
  }

  /* TODO: dependendo da arquitetura, criar metodo adicionarCliente() 
    se for o caso: passar para csv ANTES
    public adicionarCliente(): void  {}*/

  // TODO: implementar metodo atualizarCadastro(): passar para csv ANTES
  public atualizarCadastro(): void {
    console.log(`atualizando cliente: ${this.nome}`);
  }

  // TODO: implementar metodo removerCliente(): passar para csv ANTES
  public removerCliente(): void {
    console.log(`removendo cliente: ${this.nome}`);
  }

  // TODO: passar para csv
  public static listarClientes(): Cliente[] {
    console.log("Listando clientes...");
    return Cliente.clientes;
  }
}
