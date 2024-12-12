import carregarDados from "./src/utils/carregarDados";
import imprimirMenu from "./src/utils/Menu";

// Funcao principal
async function App() {
  await carregarDados();
  imprimirMenu();
}

App().catch((err) => console.error("Erro ao carregar dados: ", err));
