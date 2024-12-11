import { Cliente } from "./src/models/Cliente";
import { Pessoa } from "./src/models/Pessoa";
import { Filme } from "./src/models/Filme";
import { Locacao } from "./src/models/Locacao";
import promptSync from "prompt-sync";

const prompt = promptSync();

const c: Cliente = new Cliente(
  "Jose",
  25,
  "03332240012",
  "Rua das Flores",
  "5598883459"
);
const p: Pessoa = new Pessoa("Carlos", 17);

const d: Cliente = new Cliente(
  "Nao sou jose",
  17,
  "03332240012",
  "Rua das Flores",
  "5598883459"
);

let escolha: number = 1_000;

do {
  // console.log("\n".repeat(100));
  console.log("=".repeat(15) + "LOUCADORA AVENIDA" + "=".repeat(15));
  console.log("Escolha uma secao:");

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
        console.log("=".repeat(15) + "LOUCADORA AVENIDA" + "=".repeat(15));
        console.log("Escolha uma acao:");
        console.log("1 - Listar filmes");
        console.log("2 - Adicionar filme");
        console.log("3 - Atualizar filme");
        console.log("4 - Remover filme");
        console.log("\n5 - Voltar para o inicio");

        escolhaFilme = +prompt("Escolha: ");
        switch (escolhaFilme) {
          case 1:
            Filme.listarFilmes();
            break;
          case 2:
            const titulo: string = prompt("Digite o titulo: ");
            const autor: string = prompt("Digite sua autor: ");
            const imdb: string = prompt("Digite o id do IMDB: ");
            const ano: number = +prompt("Digite o ano de lancamento: ");
            const pais: string = prompt("Digite o pais de origem: ");

            const f: Filme = new Filme(titulo, autor, imdb, ano, pais);

            Filme.adicionarFilme(f);
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
            break;
          case 4:
            Filme.removerFilme(prompt("Id do IMDB: "));
            break;
        }
      } while (escolhaFilme != 5);
      break;
    case 2:
      // console.log("\n".repeat(100));
      let escolhaCliente = 1_000;
      do {
        console.log("=".repeat(15) + "LOUCADORA AVENIDA" + "=".repeat(15));
        console.log("Escolha uma acao:");
        console.log("1 - Listar clientes");
        console.log("2 - Adicionar cliente");
        console.log("3 - Atualizar cliente");
        console.log("4 - Remover cliente");
        console.log("\n5 - Voltar para o inicio");

        escolhaCliente = +prompt("Escolha: ");
        switch (escolhaCliente) {
          case 1:
            Cliente.listarClientes();
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
            break;
          case 4:
            Cliente.removerCliente(prompt("CPF: "));
            break;
        }
      } while (escolhaCliente != 5);
      break;
    case 3:
      let escolhaLocacao = 1_000;
      do {
        console.log("=".repeat(15) + "LOUCADORA AVENIDA" + "=".repeat(15));
        console.log("Escolha uma acao:");
        console.log("1 - Listar locacoes ativas");
        console.log("2 - Adicionar locacao");
        console.log("3 - Encerrar locacao");
        console.log("4 - Listar historico de locacoes");
        console.log("\n5 - Voltar para o inicio");

        escolhaLocacao = +prompt("Escolha: ");
        switch (escolhaLocacao) {
          case 1:
            Locacao.listarLocacoes();
            break;
          case 2:
            const cpfCliente: string = prompt("Digite o cpf do cliente: ");
            Cliente.checarCliente(cpfCliente);

            if (!Cliente.checarCliente(cpfCliente)) {
              console.log("Cliente nao encontrado.");
              break;
            }

            const imdbFilme: string = prompt("Digite o id do IMDB do filme: ");
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

            /*

            TODO: buscar objeto Cliente e Filme a partir do cpf e imdb

            const l: Locacao = new Locacao(OBJETO_CLIENTE, OBJETO_FILME, dataLocacao); 
            
            Locacao.realizarLocacao(l);

            */
            break;
          case 3:
            Locacao.encerrarLocacao(
              +prompt("Digite o id da locacao a ser encerrada: ")
            );
            break;
          case 4:
            Locacao.listarHistorico();
            break;
        }
      } while (escolhaLocacao != 5);
      break;
  }
} while (escolha != 0);
