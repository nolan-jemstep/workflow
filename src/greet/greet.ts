type greetType = (name: string) => string;

const greet: greetType = (name: string): string => `hello ${name}`;

export default greet;
