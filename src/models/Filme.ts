import fs from "fs";
import { parse } from "fast-csv";
import { writeToPath } from "fast-csv";

export class Filme {
  private _titulo: string;
  private _autor: string;
  private _imdb: string;
  private _ano: number;
  private _pais: string;

  // TODO: passar para csv
  private static filmes: Filme[] = [];

  // TODO: passar para csv
  constructor(
    titulo: string,
    autor: string,
    imdb: string,
    ano: number,
    pais: string
  ) {
    this._titulo = titulo;
    this._autor = autor;
    this._imdb = imdb;
    this._ano = ano;
    this._pais = pais;
  }

  public get titulo(): string {
    return this._titulo;
  }

  public get imdb(): string {
    return this._imdb;
  }

  public static saveFilmesToCSV(): void {
    const rows = Filme.filmes.map((filme) => [
      filme._titulo,
      filme._autor,
      filme._imdb,
      filme._ano,
      filme._pais,
    ]);
    writeToPath("filmes.csv", rows, {
      headers: ["Titulo", "Autor", "IMDB", "Ano", "Pais"],
    }).on("finish", () => console.log("Filmes salvos em CSV!"));
  }

  public static loadFilmesFromCSV(): void {
    fs.createReadStream("filmes.csv")
      .pipe(parse({ headers: true }))
      .on("data", (row) => {
        const filme = new Filme(
          row.Titulo,
          row.Autor,
          row.IMDB,
          parseInt(row.Ano),
          row.Pais
        );
        Filme.filmes.push(filme);
      })
      .on("end", () => console.log("Filmes carregados do CSV!"));
  }

  public static checarFilme(imdb: string): boolean {
    return Filme.filmes.some((filme) => filme._imdb === imdb);
  }

  /* TODO: dependendo da arquitetura, criar metodo adicionarFilme() */
  public static adicionarFilme(filme: Filme): void {
    Filme.filmes.push(filme);
    Filme.saveFilmesToCSV();
    console.log(`Filme ${filme.titulo} adicionado com sucesso.`);
  }

  // TODO: implementar metodo atualizarFilme(): passar para csv ANTES
  public static atualizarFilme(
    imdb: string,
    titulo?: string,
    autor?: string,
    ano?: number,
    pais?: string
  ): void {
    const filme = Filme.filmes.find((filme) => filme._imdb === imdb);
    if (filme) {
      if (titulo) filme._titulo = titulo;
      if (autor) filme._autor = autor;
      if (ano) filme._ano = ano;
      if (pais) filme._pais = pais;

      console.log(`Filme ${filme.titulo} atualizado com sucesso.`);
    } else {
      console.log("Filme não encontrado.");
    }
  }

  // TODO: implementar metodo removerFilme(): passar para csv ANTES
  public static removerFilme(imdb: string): void {
    const index = Filme.filmes.findIndex((filme) => filme._imdb === imdb);
    if (index !== -1) {
      const filmeRemovido = Filme.filmes.splice(index, 1);
      console.log(`Filme ${filmeRemovido[0].titulo} removido com sucesso.`);
    } else {
      console.log("Filme não encontrado.");
    }
    // TODO: atualizar o CSV após remoção
  }

  // TODO: passar para csv
  public static listarFilmes(): void {
    if (Filme.filmes.length === 0) {
      console.log("Nenhum filme cadastrado.");
    } else {
      console.log("Listando filmes:");
      Filme.filmes.forEach((filme) => {
        console.log(
          `Título: ${filme.titulo}, Autor: ${filme._autor}, Ano: ${filme._ano}, País: ${filme._pais}, IMDb: ${filme._imdb}`
        );
      });
    }
    // TODO: salvar a lista no CSV
  }

  public static buscarFilme(imdb: string): Filme {
    return Filme.filmes.find((filme) => filme._imdb === imdb)!;
  }
}
