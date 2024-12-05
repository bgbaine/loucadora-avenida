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

  // TODO: implementar metodo atualizarFilme(): passar para csv ANTES
  public atualizarFilme(): void {
    console.log(`atualizando filme: ${this.titulo}`);
  }

  // TODO: implementar metodo removerFilme(): passar para csv ANTES
  public removerFilme(): void {
    console.log(`removendo filme: ${this.titulo}`);
  }

  // TODO: passar para csv
  public static listarFilmes(): Filme[] {
    console.log("Listando filmes...");
    return Filme.filmes;
  }
}
