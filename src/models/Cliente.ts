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

    public static adicionarCliente(cliente: Cliente): void {
      Cliente.clientes.push(cliente);
      console.log(`Cliente ${cliente.nome} adicionado com sucesso.`);
    }


  // TODO: implementar metodo atualizarCadastro(): passar para csv ANTES
  public atualizarCadastro(nome?: string, endereco?: string, telefone?: string): void {
    if (nome) this._nome = nome;
    if (endereco) this._endereco = endereco;
    if (telefone) this._telefone = telefone;
    
    console.log(`Cadastro de ${this.nome} atualizado com sucesso.`);
  }

  // TODO: implementar metodo removerCliente(): passar para csv ANTES
  public static removerCliente(cpf: string): void {
    const index = Cliente.clientes.findIndex(cliente => cliente._cpf === cpf);
    if (index !== -1) {
      const clienteRemovido = Cliente.clientes.splice(index, 1);
      console.log(`Cliente ${clienteRemovido[0].nome} removido com sucesso.`);
    } else {
      console.log("Cliente não encontrado.");
    }}

  // TODO: passar para csv
  public static listarClientes(): void {
    if (Cliente.clientes.length === 0) {
      console.log("Nenhum cliente cadastrado.");
    } else {
      console.log("Listando clientes:");
      Cliente.clientes.forEach(cliente => {
        console.log(`Nome: ${cliente.nome}, CPF: ${cliente._cpf}, Endereço: ${cliente._endereco}, Telefone: ${cliente._telefone}`);
      });
    }
}}
