import { Pessoa } from "./Pessoa";
import fs from "fs";
import { parse } from "fast-csv";
import { writeToPath } from "fast-csv";

export class Cliente extends Pessoa {
  private _cpf: string;
  private _endereco: string;
  private _telefone: string;

  private static clientes: Cliente[] = [];

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

  // Getters e Setters
  public get cpf(): string {
    return this._cpf;
  }

  // Metodos de instancia

  // Metodos estaticos
  public static salvarClientes(): void {
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

  public static carregarClientes(): Promise<void> {
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

  // Verifica se o cliente já está cadastrado
  public static checarCliente(cpf: string): boolean {
    return Cliente.clientes.some((cliente) => cliente._cpf === cpf);
  }

  public static adicionarCliente(cliente: Cliente): void {
    Cliente.clientes.push(cliente);
    Cliente.salvarClientes();
    console.log(`Cliente ${cliente.nome} adicionado com sucesso.`);
  }

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

  public static removerCliente(cpf: string): void {
    const index = Cliente.clientes.findIndex((cliente) => cliente._cpf === cpf);
    if (index !== -1) {
      const clienteRemovido = Cliente.clientes.splice(index, 1);
      console.log(`Cliente ${clienteRemovido[0].nome} removido com sucesso.`);
    } else {
      console.log("Cliente não encontrado.");
    }
  }

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

  // Busca um cliente (objeto do tipo Cliente) pelo numero do cpf
  public static buscarCliente(cpf: string): Cliente {
    return Cliente.clientes.find((cliente) => cliente._cpf === cpf)!;
  }
}
