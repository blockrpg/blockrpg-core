import jsSHA from 'jssha';

const HashKey = 'jimao';

export class Password {
  public static Hash(password: string): string {
    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.setHMACKey(HashKey, "TEXT");
    shaObj.update(password);
    const hash = shaObj.getHMAC("HEX");
    return hash;
  }
}
