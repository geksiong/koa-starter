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

  public static helloWithSecret(name: string, secretMsg: string): string {
    return `Hello ${name}, I've received your secret message: ${secretMsg}`;
  }
}
