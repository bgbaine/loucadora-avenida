import { Cliente } from "./src/models/Cliente";
import { Filme } from "./src/models/Filme";
import { Locacao } from "./src/models/Locacao";

describe("Filme", () => {
  it("should add a new filme", () => {
    const filme = new Filme("Titulo", "Autor", "IMDB123", 2021, "Pais");
    Filme.adicionarFilme(filme);
    expect(Filme.checarFilme("IMDB123")).toBe(true);
  });

  it("should update an existing filme", () => {
    Filme.atualizarFilme("IMDB123", "Novo Titulo");
    const filme = Filme.buscarFilme("IMDB123");
    expect(filme.titulo).toBe("Novo Titulo");
  });

  it("should remove a filme", () => {
    Filme.removerFilme("IMDB123");
    expect(Filme.checarFilme("IMDB123")).toBe(false);
  });
});

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

describe("Locacao", () => {
  it("should add a new locacao", () => {
    const cliente = new Cliente("Nome", 30, "CPF123", "Endereco", "Telefone");
    const filme = new Filme("Titulo", "Autor", "IMDB123", 2021, "Pais");
    const locacao = new Locacao(cliente, filme, new Date().getTime());
    Locacao.realizarLocacao(locacao);
    expect(Locacao.locacoesAtivas.length).toBeGreaterThan(0);
  });

  it("should end a locacao", () => {
    const locacaoId = Locacao.locacoesAtivas[0].id;
    Locacao.encerrarLocacao(locacaoId);
    expect(
      Locacao.locacoesAtivas.find((locacao) => locacao.id === locacaoId)
    ).toBeUndefined();
  });
});
