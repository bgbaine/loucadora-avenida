export default function formatarData(timestamp: number | undefined): string {
  if (timestamp === undefined) {
    return "Não entregue";
  }
  const data = new Date(timestamp);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
