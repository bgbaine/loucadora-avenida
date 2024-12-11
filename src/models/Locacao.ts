import fs from "fs";
import * as fastcsv from "fast-csv";
import formatDate from "../utils/formatDate";
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
  private static _locacoesAtivas: Locacao[] = [];
  private static locacoes: Locacao[] = [];

  // TODO: passar para csv
  constructor(cliente: Cliente, filme: Filme, dataLocacao: number) {
    this._id = new Date().getTime();
    this._cliente = cliente;
    this._filme = filme;
    this._dataLocacao = dataLocacao;
  }

  public get id(): number {
    return this._id;
  }

  public static get locacoesAtivas(): Locacao[] {
    return Locacao._locacoesAtivas;
  }
  public static set locacoesAtivas(value: Locacao[]) {
    Locacao._locacoesAtivas = value;
  }

  public set dataEntrega(novaData: number) {
    this._dataEntrega = novaData;
  }

  public static async carregarLocacoes(): Promise<void> {
    try {
      Locacao.locacoesAtivas = await Locacao.lerLocacoesCSV(
        "data/locacoesAtivas.csv"
      );
      Locacao.locacoes = await Locacao.lerLocacoesCSV("data/locacoes.csv");
      console.log("Locações carregadas do CSV!");
    } catch (error) {
      console.error("Erro ao carregar locações:", error);
    }
  }

  private static lerLocacoesCSV(fileName: string): Promise<Locacao[]> {
    const locacoes: Locacao[] = [];

    return new Promise<Locacao[]>((resolve, reject) => {
      fs.createReadStream(fileName)
        .pipe(fastcsv.parse({ headers: true, skipEmptyLines: true } as any))
        .on("data", (row) => {
          const cliente = Cliente.buscarCliente(row.cpf);
          const filme = Filme.buscarFilme(row.imdb);

          if (!cliente || !filme) {
            console.error(`Dados ausentes para linha: ${JSON.stringify(row)}`);
            return; // Skip this row if data is missing
          }

          const locacao = new Locacao(
            cliente,
            filme,
            parseInt(row.dataLocacao)
          );
          locacao._id = parseInt(row.id);
          locacao._dataEntrega = row.dataEntrega
            ? parseInt(row.dataEntrega)
            : undefined;
          locacoes.push(locacao);
        })
        .on("end", () => resolve(locacoes))
        .on("error", (error) => reject(error));
    });
  }

  private static async salvarLocacoes(): Promise<void> {
    await Locacao.escreverLocacoesCSV(
      "data/locacoesAtivas.csv",
      Locacao.locacoesAtivas
    );
    await Locacao.escreverLocacoesCSV("data/locacoes.csv", Locacao.locacoes);
  }

  private static async escreverLocacoesCSV(
    fileName: string,
    locacoes: Locacao[]
  ): Promise<void> {
    const writableStream = fs.createWriteStream(fileName);

    const stream = fastcsv.format({ headers: true });

    stream.pipe(writableStream);

    locacoes.forEach((locacao) => {
      stream.write({
        id: locacao.id,
        cpf: locacao._cliente.cpf,
        imdb: locacao._filme.imdb,
        dataLocacao: locacao._dataLocacao,
        dataEntrega: locacao._dataEntrega || "",
      });
    });

    stream.end();
  }

  /* TODO: dependendo da arquitetura, criar metodo realizarLocacao()
    se for o caso: passar para csv ANTES*/
  public static async realizarLocacao(locacao: Locacao): Promise<void> {
    Locacao.locacoes.push(locacao);
    Locacao.locacoesAtivas.push(locacao);
    console.log(`Locacao #${locacao.id} cadastrada com sucesso.`);
    await Locacao.salvarLocacoes();
  }

  // TODO: implementar metodo encerrarLocacao(): passar para csv ANTES
  public static async encerrarLocacao(id: number): Promise<void> {
    const index = Locacao.locacoesAtivas.findIndex(
      (locacao) => locacao._id === id
    );

    if (index !== -1) {
      const locacaoEncerrada: Locacao | undefined = Locacao.locacoes.find(
        (locacao) => locacao.id === id
      );

      if (!locacaoEncerrada) {
        console.error("Locacao não encontrada.");
        return;
      }

      locacaoEncerrada.dataEntrega = new Date().getTime();

      const locacaoAtivaEncerrada = Locacao.locacoesAtivas.splice(index, 1);
      console.log(
        `Locacao #${locacaoAtivaEncerrada[0].id} encerrada com sucesso.`
      );
      await Locacao.salvarLocacoes();
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
      Locacao.locacoesAtivas.forEach((locacao) => {
        console.log(
          `ID: #${locacao.id}, Cliente: ${locacao._cliente.nome}, Filme: ${
            locacao._filme.titulo
          }, Data da Locacao: ${formatDate(locacao._dataLocacao)}`
        );
      });
    }
  }

  // TODO: passar para csv
  public static listarHistorico(): void {
    if (Locacao.locacoes.length === 0) {
      console.log("Nenhuma locacao encontrada.");
    } else {
      console.log("Listando histórico de locações: ");
      Locacao.locacoes.forEach((locacao) => {
        console.log(
          `ID: #${locacao.id}, Cliente: ${locacao._cliente.nome}, Filme: ${
            locacao._filme.titulo
          }, Data da Locacao: ${formatDate(
            +locacao._dataLocacao
          )}, Data da Entrega: ${formatDate(locacao._dataEntrega)}`
        );
      });
    }
  }
}
