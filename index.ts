import { Cliente } from "./src/models/Cliente";
import { Pessoa } from "./src/models/Pessoa";

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
