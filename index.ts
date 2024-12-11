import { Cliente } from "./src/models/Cliente";
import { Filme } from "./src/models/Filme";
import { Locacao } from "./src/models/Locacao";
import promptSync from "prompt-sync";
import { MenuUtils } from "./src/utils/MenuUtils";

const prompt = promptSync();

async function loadData() {
  try {
    await Cliente.loadClientesFromCSV();
    console.log("Clientes loaded successfully.");

    await Filme.loadFilmesFromCSV();
    console.log("Filmes loaded successfully.");

    await Locacao.carregarLocacoes();
    console.log("Locacoes loaded successfully.");
  } catch (error) {
    console.error("Error during data initialization:", error);
  }
}

async function startApp() {
  await loadData();

  let escolha: number = 1_000;

  do {
    // console.log("\n".repeat(100));
    MenuUtils.imprimirCabecalho("secao");
    console.log("1 - Filmes");
    console.log("2 - Clientes");
    console.log("3 - Locacoes");
    console.log("\n0 - Sair do programa");

    escolha = +prompt("Escolha: ");
    switch (escolha) {
      case 1:
        // console.log("\n".repeat(100));
        let escolhaFilme = 1_000;
        do {
          MenuUtils.imprimirCabecalho("secao");
          console.log("1 - Listar filmes");
          console.log("2 - Adicionar filme");
          console.log("3 - Atualizar filme");
          console.log("4 - Remover filme");
          console.log("\n5 - Voltar para o inicio");

          escolhaFilme = +prompt("Escolha: ");
          switch (escolhaFilme) {
            case 1:
              Filme.listarFilmes();
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 2:
              const titulo: string = prompt("Digite o titulo: ");
              const autor: string = prompt("Digite sua autor: ");
              const imdb: string = prompt("Digite o id do IMDB: ");
              const ano: number = +prompt("Digite o ano de lancamento: ");
              const pais: string = prompt("Digite o pais de origem: ");

              const f: Filme = new Filme(titulo, autor, imdb, ano, pais);

              Filme.adicionarFilme(f);
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 3:
              const imdbAtualizado: string = prompt(
                "Digite o id do IMDB do filme para atualizar: "
              );
              if (!Filme.checarFilme(imdbAtualizado)) {
                console.log("Filme não encontrado.");
                break;
              }

              const tituloAtualizado: string = prompt(
                "Novo titulo (deixe em branco para não alterar): "
              );
              const autorAtualizado: string = prompt(
                "Novo autor (deixe em branco para não alterar): "
              );
              const anoAtualizado: number = +prompt(
                "Novo ano (deixe em branco para não alterar): "
              );
              const paisAtualizado: string = prompt(
                "Novo pais (deixe em branco para não alterar): "
              );

              Filme.atualizarFilme(
                imdbAtualizado,
                tituloAtualizado || undefined,
                autorAtualizado || undefined,
                anoAtualizado || undefined,
                paisAtualizado || undefined
              );
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 4:
              Filme.removerFilme(prompt("Id do IMDB: "));
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
          }
        } while (escolhaFilme != 5);
        break;
      case 2:
        // console.log("\n".repeat(100));
        let escolhaCliente = 1_000;
        do {
          MenuUtils.imprimirCabecalho("acao");

          console.log("1 - Listar clientes");
          console.log("2 - Adicionar cliente");
          console.log("3 - Atualizar cliente");
          console.log("4 - Remover cliente");
          console.log("\n5 - Voltar para o inicio");

          escolhaCliente = +prompt("Escolha: ");
          switch (escolhaCliente) {
            case 1:
              Cliente.listarClientes();
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 2:
              const nome: string = prompt("Digite o Nome: ");
              const idade: number = +prompt("Digite sua idade: ");
              const cpf: string = prompt("Digite seu CPF: ");
              const endereco: string = prompt("Digite seu endereco: ");
              const telefone: string = prompt("Digite seu Telefone: ");

              const c: Cliente = new Cliente(
                nome,
                idade,
                cpf,
                endereco,
                telefone
              );

              Cliente.adicionarCliente(c);
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 3:
              const cpfAtualizado: string = prompt(
                "Digite o CPF do cliente para atualizar: "
              );

              if (!Cliente.checarCliente(cpfAtualizado)) {
                console.log("Cliente não encontrado.");
                break;
              }

              const nomeAtualizado: string = prompt(
                "Novo nome (deixe em branco para não alterar): "
              );
              const enderecoAtualizado: string = prompt(
                "Novo endereço (deixe em branco para não alterar): "
              );
              const telefoneAtualizado: string = prompt(
                "Novo telefone (deixe em branco para não alterar): "
              );

              Cliente.atualizarCadastro(
                cpfAtualizado,
                nomeAtualizado || undefined,
                enderecoAtualizado || undefined,
                telefoneAtualizado || undefined
              );
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 4:
              Cliente.removerCliente(prompt("CPF: "));
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
          }
        } while (escolhaCliente != 5);
        break;
      case 3:
        let escolhaLocacao = 1_000;
        do {
          MenuUtils.imprimirCabecalho("acao");

          console.log("1 - Listar locacoes ativas");
          console.log("2 - Adicionar locacao");
          console.log("3 - Encerrar locacao");
          console.log("4 - Listar historico de locacoes");
          console.log("\n5 - Voltar para o inicio");

          escolhaLocacao = +prompt("Escolha: ");
          switch (escolhaLocacao) {
            case 1:
              Locacao.listarLocacoes();
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 2:
              const cpfCliente: string = prompt("Digite o cpf do cliente: ");
              Cliente.checarCliente(cpfCliente);

              if (!Cliente.checarCliente(cpfCliente)) {
                console.log("Cliente nao encontrado.");
                break;
              }

              const imdbFilme: string = prompt(
                "Digite o id do IMDB do filme: "
              );
              Filme.checarFilme(imdbFilme);

              if (!Filme.checarFilme(imdbFilme)) {
                console.log("Filme nao encontrado.");
                break;
              }

              const dataLocacao: number = new Date().getTime();

              Locacao.realizarLocacao(
                new Locacao(
                  Cliente.buscarCliente(cpfCliente),
                  Filme.buscarFilme(imdbFilme),
                  dataLocacao
                )
              );
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 3:
              Locacao.encerrarLocacao(
                +prompt("Digite o id da locacao a ser encerrada: ")
              );
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
            case 4:
              Locacao.listarHistorico();
              MenuUtils.pressioneEnterParaContinuar(prompt);
              break;
          }
        } while (escolhaLocacao != 5);
        break;
    }
  } while (escolha != 0);
}
startApp().catch((err) => console.error("Error loading data: ", err));
