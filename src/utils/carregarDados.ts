import { Cliente } from "../../src/models/Cliente";
import { Filme } from "../../src/models/Filme";
import { Locacao } from "../../src/models/Locacao";

export default async function carregarDados(): Promise<void> {
  try {
    await Cliente.carregarClientes();
    console.log("Clientes carregados com sucesso.");

    await Filme.carregarFilmes();
    console.log("Filmes carregados com sucesso.");

    await Locacao.carregarLocacoes();
    console.log("Locacoes carregados com sucesso.");
  } catch (error) {
    console.error("Erro carregando dados:", error);
  }
}
