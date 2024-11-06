import bcrypt from "bcrypt";
export async function hashPassword(password: string): Promise<string> {
  const SALT = parseInt(process.env.SALT as string);
  const genSalt = await bcrypt.genSalt(SALT);
  const hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
}
