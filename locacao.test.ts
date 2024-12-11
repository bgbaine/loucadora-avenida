
import { Cliente } from "./src/models/Cliente";
import { Filme } from "./src/models/Filme";
import { Locacao } from "./src/models/Locacao";

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