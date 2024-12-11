
import { Filme } from "./src/models/Filme";

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