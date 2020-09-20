/**
 * Demo services
 */
export default class DemoServices {
  public static hello(): string {
    return "Hello stranger!";
  }

  public static helloWithName(name: string): string {
    return "Hello " + name;
  }
}
