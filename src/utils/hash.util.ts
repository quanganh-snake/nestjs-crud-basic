import { hash } from "bcrypt";
const saltRounds = 10;

export const hashText = async (text: string): Promise<string> => {
  const hashData = await hash(text, saltRounds);
  return hashData;
}