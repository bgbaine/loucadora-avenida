import fs from "fs";
import * as fastcsv from "fast-csv";
import formatarData from "../utils/formatarData";
import { Cliente } from "./Cliente";
import { Filme } from "./Filme";

export class Locacao {
  private _id: number;
  private _cliente: Cliente;
  private _filme: Filme;
  private _dataLocacao: number;
  private _dataEntrega: number | undefined;

  private static _locacoesAtivas: Locacao[] = [];
  private static locacoes: Locacao[] = [];

  constructor(cliente: Cliente, filme: Filme, dataLocacao: number) {
    // Para cada locacao é gerado um id unico baseado no timestamp
    this._id = new Date().getTime();

    this._cliente = cliente;
    this._filme = filme;
    this._dataLocacao = dataLocacao;
  }

  // Getters e Setters
  public get id(): number {
    return this._id;
  }

  public static get locacoesAtivas(): Locacao[] {
    return Locacao._locacoesAtivas;
  }

  public static set locacoesAtivas(locacoesAtualizadas: Locacao[]) {
    Locacao._locacoesAtivas = locacoesAtualizadas;
  }

  public set dataEntrega(novaData: number) {
    this._dataEntrega = novaData;
  }

  // Metodos de instancia

  // Metodos estaticos

  // Carrega locacoes do arquivo CSV para a aplicacao
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

  // Puxa locacoes do arquivo CSV
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
            return;
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

  // Salva locacoes no arquivo CSV
  private static async salvarLocacoes(): Promise<void> {
    await Locacao.escreverLocacoesCSV(
      "data/locacoesAtivas.csv",
      Locacao.locacoesAtivas
    );
    await Locacao.escreverLocacoesCSV("data/locacoes.csv", Locacao.locacoes);
  }

  // Escreve locacoes no arquivo CSV
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

  public static async realizarLocacao(locacao: Locacao): Promise<void> {
    Locacao.locacoes.push(locacao);
    Locacao.locacoesAtivas.push(locacao);
    console.log(`Locacao #${locacao.id} cadastrada com sucesso.`);
    await Locacao.salvarLocacoes();
  }

  public static async encerrarLocacao(id: number): Promise<void> {
    // Procurar (nas locacoes ativas) a locacao pelo id
    const index = Locacao.locacoesAtivas.findIndex(
      (locacao) => locacao._id === id
    );

    if (index !== -1) {
      // Procurar (no historico de locacoes) a locacao pelo id
      const locacaoEncerrada: Locacao | undefined = Locacao.locacoes.find(
        (locacao) => locacao.id === id
      );

      if (!locacaoEncerrada) {
        console.error("Locacao não encontrada.");
        return;
      }

      // Encerrar locacao no historico
      locacaoEncerrada.dataEntrega = new Date().getTime();
      
      // Encerrar locacao em locacoes ativas
      const locacaoAtivaEncerrada = Locacao.locacoesAtivas.splice(index, 1);
      console.log(
        `Locacao #${locacaoAtivaEncerrada[0].id} encerrada com sucesso.`
      );
      await Locacao.salvarLocacoes();
    } else {
      console.log("Locacao não encontrada.");
    }
  }

  // Lista locacoes ativas
  public static listarLocacoes(): void {
    if (Locacao.locacoesAtivas.length === 0) {
      console.log("Nenhuma locacao ativa.");
    } else {
      console.log("Listando locacoes ativas:");
      Locacao.locacoesAtivas.forEach((locacao) => {
        console.log(
          `ID: #${locacao.id}, Cliente: ${locacao._cliente.nome}, Filme: ${
            locacao._filme.titulo
          }, Data da Locacao: ${formatarData(locacao._dataLocacao)}`
        );
      });
    }
  }

  // Lista todas as locacoes ja feitas
  public static listarHistorico(): void {
    if (Locacao.locacoes.length === 0) {
      console.log("Nenhuma locacao encontrada.");
    } else {
      console.log("Listando histórico de locações: ");
      Locacao.locacoes.forEach((locacao) => {
        console.log(
          `ID: #${locacao.id}, Cliente: ${locacao._cliente.nome}, Filme: ${
            locacao._filme.titulo
          }, Data da Locacao: ${formatarData(
            +locacao._dataLocacao
          )}, Data da Entrega: ${formatarData(locacao._dataEntrega)}`
        );
      });
    }
  }
}
