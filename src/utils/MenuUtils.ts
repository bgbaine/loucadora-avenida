export class MenuUtils {
  public static imprimirCabecalho(palavra: string) {
    console.log("\n".repeat(100));
    console.log("=".repeat(15) + "LOUCADORA AVENIDA" + "=".repeat(15));
    console.log(`Escolha uma ${palavra}:`);
  }

  public static pressioneEnterParaContinuar(prompt: any) {
    prompt("\nPressione enter tecla para continuar...");
  }
}
