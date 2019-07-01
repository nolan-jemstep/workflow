type greetType = (name: string) => string;

const greet: greetType = name => `hello ${name}`;

export default greet;
