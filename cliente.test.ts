
import { Cliente } from "./src/models/Cliente";

describe("Cliente", () => {
  it("should add a new cliente", () => {
    const cliente = new Cliente("Nome", 30, "CPF123", "Endereco", "Telefone");
    Cliente.adicionarCliente(cliente);
    expect(Cliente.checarCliente("CPF123")).toBe(true);
  });

  it("should update an existing cliente", () => {
    Cliente.atualizarCadastro("CPF123", "Novo Nome");
    const cliente = Cliente.buscarCliente("CPF123");
    expect(cliente.nome).toBe("Novo Nome");
  });

  it("should remove a cliente", () => {
    Cliente.removerCliente("CPF123");
    expect(Cliente.checarCliente("CPF123")).toBe(false);
  });
});