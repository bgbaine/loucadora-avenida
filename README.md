# para instalar: npm i

# para rodar: npx ts-node index.ts


# Trabalho final POO

### Atividade Prática: Desenvolvimento de um Sistema de Biblioteca

### Objetivo:

Desenvolver um sistema de gerenciamento de uma biblioteca utilizando os conceitos de Programação Orientada a Objetos (POO). Este projeto servirá para revisar e aplicar os principais conceitos abordados ao longo da unidade curricular, como classes, objetos, herança, polimorfismo, encapsulamento, e manipulação de arquivos.

### Descrição do Projeto:

Os alunos deverão criar um sistema que permita o gerenciamento de livros, membros da biblioteca e empréstimos de livros. Os grupos poderão ser de até 3 integrantes+1. O sistema deve ser capaz de realizar as seguintes operações:

1. **Cadastro de Livros**
    - Adicionar novo livro (com atributos como título, autor, ISBN, ano de publicação).
    - Listar todos os livros cadastrados.
    - Atualizar informações de um livro.
    - Remover um livro do cadastro.
2. **Cadastro de Membros**
    - Adicionar novo membro (com atributos como nome, número de matrícula, endereço, telefone).
    - Listar todos os membros cadastrados.
    - Atualizar informações de um membro.
    - Remover um membro do cadastro.
3. **Gerenciamento de Empréstimos**
    - Realizar empréstimo de um livro para um membro (registrar data de empréstimo e data de devolução).
    - Listar todos os empréstimos ativos.
    - Registrar devolução de um livro.
    - Listar histórico de empréstimos.

### Requisitos Técnicos:

- **Classes e Objetos:**
    - Criar classes para Livro, Membro e Empréstimo.
    - Utilizar encapsulamento para proteger os atributos das classes.
    - Implementar métodos para adicionar, atualizar, remover e listar objetos.
- **Herança e Polimorfismo:**
    - Implementar uma classe base "Pessoa" e derivar a classe "Membro" dela.
    - Demonstrar o uso de polimorfismo através de métodos que podem ser sobrepostos.
- **Manipulação de Arquivos:**
    - Salvar e carregar os dados dos livros, membros e empréstimos de/para arquivos para garantir a persistência dos dados.
    - Utilizar arquivos de texto ou CSV para armazenamento.
- **Interface:**
    - Desenvolver uma interface de linha de comando (CLI) para interação com o usuário.
    - Oferecer um menu para navegar entre as diferentes funcionalidades do sistema.

### Passo a Passo para a Execução:

1. **Planejamento:**
    - Dividir o projeto em módulos: Cadastro de Livros, Cadastro de Membros, Gerenciamento de Empréstimos, e Interface CLI.
    - Definir as classes e seus atributos.
    - Especificar os métodos necessários para cada funcionalidade.
2. **Implementação:**
    - Implementar as classes Livro, Membro (herdando de Pessoa) e Empréstimo.
    - Desenvolver métodos de manipulação de dados (CRUD) para livros e membros.
    - Implementar funções para realizar e registrar empréstimos, além de devolver livros.
3. **Persistência de Dados:**
    - Criar métodos para salvar e carregar dados de arquivos.
    - Garantir que todas as alterações (adicionar, atualizar, remover) sejam refletidas nos arquivos correspondentes.
4. **Interface de Usuário:**
    - Desenvolver uma interface de linha de comando para facilitar a interação com o sistema.
    - Implementar um menu principal que permita ao usuário escolher entre as funcionalidades disponíveis (Cadastro de Livros, Cadastro de Membros, Empréstimos).
5. **Testes e Validação:**
    - Realizar testes unitários para garantir que os métodos das classes funcionem corretamente.
    - Testar a persistência de dados verificando se os arquivos são atualizados corretamente após cada operação.
    - Validar a interface de usuário testando todas as opções do menu.
6. **Documentação:**
    - Documentar o código com comentários explicativos em caso de rotinas que tenha necessidade.
    - Gravar um vídeo de apresentação/demonstração técnica e de funcionalidades do sistema (máximo 10 minutos), com clareza do papel de cada um dentro do projeto.

### Entrega:

A entrega deve ser realizada por todos membros do grupo, via blackboard, em Atividades Avaliativas, contemplando os seguintes itens:

- Código fonte completo do sistema.
- Arquivos de dados utilizados para teste (ex.: livros.txt, membros.txt, emprestimos.txt).
- Vídeo de apresentação (Todos integrantes do grupo precisam estar na gravação e precisam também apresentar parte do trabalho - Alunos que não apresentarem estarão automaticamente reprovados).
- Data de entrega: **até 12 de dezembro de 2024**

### Avaliação:

- **Funcionalidade (30%):** O sistema realiza todas as operações solicitadas corretamente.
- **Organização e Estrutura do Código (30%):** Uso adequado dos conceitos de POO, clareza e modularidade do código.
- **Persistência de Dados (10%):** Implementação correta da manipulação de arquivos para salvar e carregar dados.
- **Testes e validação (10%)**: Escrita de testes que gere uma cobertura de testes satisfatória para a aplicação.
- **Interface de Usuário (10%):** Usabilidade e eficiência da interface de linha de comando.
- **Documentação (10%):** Qualidade da apresentação do vídeo.

**Ps.: Contemplar na apresentação/vídeo:**

- Apresentação e explicação do código desenvolvido;
- Comentar requisitos que foram desenvolvidos e que ficaram pendentes;
- Deixar claro onde os pilares da orientação a objetos foram contemplados;
- Finalize a apresentação com “Conclusões” a respeito do trabalho e “Oportunidades de melhoria” que o grupo identificou para uma possível continuidade do projeto.

Ps.: Propostas podem ser realizadas pelos grupos para desenvolvimento de projeto alternativo.