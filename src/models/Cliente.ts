import { Pessoa } from "./Pessoa";
import fs from "fs";
import { parse } from "fast-csv";
import { writeToPath } from "fast-csv";

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
  }

  /* TODO: dependendo da arquitetura, criar metodo adicionarCliente() 
    se for o caso: passar para csv ANTES
    public adicionarCliente(): void  {}*/

  public get cpf(): string {
    return this._cpf;
  }

  public static saveClientesToCSV(): void {
    const rows = Cliente.clientes.map((cliente) => [
      cliente.nome,
      cliente._cpf,
      cliente._endereco,
      cliente._telefone,
    ]);
    writeToPath("data/clientes.csv", rows, {
      headers: ["nome", "cpf", "endereco", "telefone"],
    }).on("finish", () => console.log("Clientes salvos em CSV!"));
  }

  public static loadClientesFromCSV(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.createReadStream("data/clientes.csv")
        .pipe(parse({ headers: true }))
        .on("data", (row) => {
          const cliente = new Cliente(
            row.nome,
            parseInt(row.idade),
            row.cpf,
            row.endereco,
            row.telefone
          );
          Cliente.clientes.push(cliente);
        })
        .on("end", () => {
          console.log("Clientes carregados do CSV!");
          resolve();
        })
        .on("error", (error) => reject(error));
    });
    }

  public static checarCliente(cpf: string): boolean {
    return Cliente.clientes.some((cliente) => cliente._cpf === cpf);
  }

  public static adicionarCliente(cliente: Cliente): void {
    Cliente.clientes.push(cliente);
    Cliente.saveClientesToCSV();
    console.log(`Cliente ${cliente.nome} adicionado com sucesso.`);
  }

  // TODO: implementar metodo atualizarCadastro(): passar para csv ANTES
  public static atualizarCadastro(
    cpf: string,
    nome?: string,
    endereco?: string,
    telefone?: string
  ): void {
    const cliente = Cliente.clientes.find((cliente) => cliente._cpf === cpf);
    if (cliente) {
      if (nome) cliente._nome = nome;
      if (endereco) cliente._endereco = endereco;
      if (telefone) cliente._telefone = telefone;

      console.log(`Cadastro de ${cliente.nome} atualizado com sucesso.`);
    } else {
      console.log("Cliente não encontrado.");
    }
  }

  // TODO: implementar metodo removerCliente(): passar para csv ANTES
  public static removerCliente(cpf: string): void {
    const index = Cliente.clientes.findIndex((cliente) => cliente._cpf === cpf);
    if (index !== -1) {
      const clienteRemovido = Cliente.clientes.splice(index, 1);
      console.log(`Cliente ${clienteRemovido[0].nome} removido com sucesso.`);
    } else {
      console.log("Cliente não encontrado.");
    }
  }

  // TODO: passar para csv
  public static listarClientes(): void {
    if (Cliente.clientes.length === 0) {
      console.log("Nenhum cliente cadastrado.");
    } else {
      console.log("Listando clientes:");
      Cliente.clientes.forEach((cliente) => {
        console.log(
          `Nome: ${cliente.nome}, CPF: ${cliente._cpf}, Endereço: ${cliente._endereco}, Telefone: ${cliente._telefone}`
        );
      });
    }
  }

  public static buscarCliente(cpf: string): Cliente {
    return Cliente.clientes.find((cliente) => cliente._cpf === cpf)!;
  }
}
