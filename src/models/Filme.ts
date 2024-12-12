import fs from "fs";
import { parse } from "fast-csv";
import { writeToPath } from "fast-csv";

export class Filme {
  private _titulo: string;
  private _autor: string;
  private _imdb: string;
  private _ano: number;
  private _pais: string;

  private static filmes: Filme[] = [];

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

  // Getters e Setters
  public get titulo(): string {
    return this._titulo;
  }

  public get imdb(): string {
    return this._imdb;
  }

  // Metodos de instancia

  // Metodos estaticos
  public static salvarFilmes(): void {
    const rows = Filme.filmes.map((filme) => [
      filme._titulo,
      filme._autor,
      filme._imdb,
      filme._ano,
      filme._pais,
    ]);
    writeToPath("data/filmes.csv", rows, {
      headers: ["titulo", "autor", "imdb", "ano", "pais"],
    }).on("finish", () => console.log("Filmes salvos em CSV!"));
  }

  public static carregarFilmes(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.createReadStream("data/filmes.csv")
        .pipe(parse({ headers: true }))
        .on("data", (row) => {
          const filme = new Filme(
            row.titulo,
            row.autor,
            row.imdb,
            parseInt(row.ano),
            row.pais
          );
          Filme.filmes.push(filme);
        })
        .on("end", () => {
          console.log("Filmes carregados do CSV!");
          resolve();
        })
        .on("error", (error) => reject(error));
    });
    }

  // Verifica se o filme já está cadastrado
  public static checarFilme(imdb: string): boolean {
    return Filme.filmes.some((filme) => filme._imdb === imdb);
  }

  public static adicionarFilme(filme: Filme): void {
    Filme.filmes.push(filme);
    Filme.salvarFilmes();
    console.log(`Filme ${filme.titulo} adicionado com sucesso.`);
  }

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

  public static removerFilme(imdb: string): void {
    const index = Filme.filmes.findIndex((filme) => filme._imdb === imdb);
    if (index !== -1) {
      const filmeRemovido = Filme.filmes.splice(index, 1);
      console.log(`Filme ${filmeRemovido[0].titulo} removido com sucesso.`);
    } else {
      console.log("Filme não encontrado.");
    }
  }

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
  }

  // Busca um filme (objeto do tipo Filme) pelo numero do IMDb
  public static buscarFilme(imdb: string): Filme {
    return Filme.filmes.find((filme) => filme._imdb === imdb)!;
  }
}
