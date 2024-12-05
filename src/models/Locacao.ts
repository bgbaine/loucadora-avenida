import { Cliente } from "./Cliente";
import { Filme } from "./Filme";

export class Locacao {
  private _cliente: Cliente;
  private _filme: Filme;

  /* Bem possivel que utilizar esses campos com tipo Date quebre tudo
  fazer o que, ne ^^ */
  private _dataLocacao: Date;
  private _dataEntrega: Date;

  // TODO: passar para csv
  private static locacoesAtivas: Locacao[] = [];
  private static locacoes: Locacao[] = [];

  // TODO: passar para csv
  constructor(
    cliente: Cliente,
    filme: Filme,
    dataLocacao: Date,
    dataEntrega: Date
  ) {
    this._cliente = cliente;
    this._filme = filme;
    this._dataLocacao = dataLocacao;
    this._dataEntrega = dataEntrega;
    Locacao.locacoes.push(this);
    Locacao.locacoesAtivas.push(this);
  }

  /* TODO: dependendo da arquitetura, criar metodo realizarLocacao()
    se for o caso: passar para csv ANTES
    public realizarLocacao(): void  {}*/

  // TODO: implementar metodo encerrarLocacao(): passar para csv ANTES
  public encerrarLocacao(): void {
    console.log("encerrando locacao");
  }

  // TODO: implementar metodo listarLocacoes(): passar para csv ANTES
  public static listarLocacoes(): Locacao[] {
    return Locacao.locacoesAtivas;
  }

  // TODO: passar para csv
  public static listarHistorico(): Locacao[] {
    return Locacao.locacoes;
  }
}
