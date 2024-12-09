import { Cliente } from "./Cliente";
import { Filme } from "./Filme";

export class Locacao {
  private _id: number;
  private _cliente: Cliente;
  private _filme: Filme;

  /* Bem possivel que utilizar esses campos com tipo Date quebre tudo
  fazer o que, ne ^^ */
  private _dataLocacao: number;
  private _dataEntrega: number | undefined;

  // TODO: passar para csv
  private static locacoesAtivas: Locacao[] = [];
  private static locacoes: Locacao[] = [];

  // TODO: passar para csv
  constructor(cliente: Cliente, filme: Filme, dataLocacao: number) {
    this._id = Math.floor(Math.random() * 1_000);
    this._cliente = cliente;
    this._filme = filme;
    this._dataLocacao = dataLocacao;
  }

  public get id(): number {
    return this._id;
  }

  /* TODO: dependendo da arquitetura, criar metodo realizarLocacao()
    se for o caso: passar para csv ANTES*/
  public static realizarLocacao(locacao: Locacao): void {
    Locacao.locacoes.push(locacao);
    Locacao.locacoesAtivas.push(locacao);
    console.log(`Locacao ${locacao.id} cadastrada com sucesso.`);
  }

  // TODO: implementar metodo encerrarLocacao(): passar para csv ANTES
  public static encerrarLocacao(id: number): void {
    const index = Locacao.locacoesAtivas.findIndex(
      (locacao) => locacao._id === id
    );
    if (index !== -1) {
      const locacaoRemovida = Locacao.locacoesAtivas.splice(index, 1);
      console.log(`Locacao #${locacaoRemovida[0].id} removida com sucesso.`);
    } else {
      console.log("Locacao não encontrada.");
    }
  }

  // TODO: implementar metodo listarLocacoes(): passar para csv ANTES
  public static listarLocacoes(): void {
    if (Locacao.locacoesAtivas.length === 0) {
      console.log("Nenhuma locacao ativa.");
    } else {
      console.log("Listando locacoes ativas:");
      Locacao.locacoes.forEach((locacao) => {
        console.log(
          `ID: ${locacao.id}, Cliente: ${locacao._cliente.nome}, Filme: ${locacao._filme.titulo}, Data da Locacao: ${locacao._dataLocacao}`
        );
      });
    }
  }

  // TODO: passar para csv
  public static listarHistorico(): void {
    if (Locacao.locacoesAtivas.length === 0) {
      console.log("Nenhuma locacao ativa.");
    } else {
      console.log("Listando locacoes ativas:");
      Locacao.locacoes.forEach((locacao) => {
        console.log(
          `ID: ${locacao.id}, Cliente: ${locacao._cliente.nome}, Filme: ${locacao._filme.titulo}, Data da Locacao: ${locacao._dataLocacao}, Data da Entrega: ${locacao._dataEntrega}`
        );
      });
    }
  }
}
