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
    Filme.filmes.push(this);
  }

  public get titulo(): string {
    return this._titulo;
  }

  /* TODO: dependendo da arquitetura, criar metodo adicionarFilme()
    se for caso: passar para csv ANTES 
    public adicionarFilme(): void  {}*/

    public static adicionarFilme(filme: Filme): void {
      Filme.filmes.push(filme);
      console.log(`Filme ${filme.titulo} adicionado com sucesso.`);
    }

  // TODO: implementar metodo atualizarFilme(): passar para csv ANTES
  public atualizarFilme(titulo?: string, autor?: string, ano?: number, pais?: string): void {
    if (titulo) this._titulo = titulo;
    if (autor) this._autor = autor;
    if (ano) this._ano = ano;
    if (pais) this._pais = pais;
  
    console.log(`Filme ${this.titulo} atualizado com sucesso.`);
    // TODO: salvar alterações no CSV
  }

  // TODO: implementar metodo removerFilme(): passar para csv ANTES
  public static removerFilme(imdb: string): void {
    const index = Filme.filmes.findIndex(filme => filme._imdb === imdb);
    if (index !== -1) {
      const filmeRemovido = Filme.filmes.splice(index, 1);
      console.log(`Filme ${filmeRemovido[0].titulo} removido com sucesso.`);
    } else {
      console.log("Filme não encontrado.");
    }
    // TODO: atualizar o CSV após remoção
  }

  // TODO: passar para csv
 /*  public static listarFilmes(): Filme[] {
    console.log("Listando filmes...");
    return Filme.filmes;
  } */

  /* public static listarFilmes(): void {
    if (Filme.filmes.length === 0) {
      console.log("Nenhum filme cadastrado.");
    } else {
      console.log("Listando filmes:");
      Filme.filmes.forEach(filme => {
        console.log(`Título: ${filme.titulo}`);
        console.log(`Autor: ${filme._autor}`);
        console.log(`Ano: ${filme._ano}`);
        console.log(`País: ${filme._pais}`);
        console.log(`IMDB: ${filme._imdb}`);
        console.log("----");
      });
    }
  }  
    ou */
    public static listarFilmes(): void {
      if (Filme.filmes.length === 0) {
        console.log("Nenhum filme cadastrado.");
      } else {
        console.log("Listando filmes:");
        Filme.filmes.forEach(filme => {
          console.log(`Título: ${filme.titulo}, Autor: ${filme._autor}, Ano: ${filme._ano}, País: ${filme._pais}, IMDb: ${filme._imdb}`);
        });
      }
      // TODO: salvar a lista no CSV
    }
}
