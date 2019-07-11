module.exports = {
  components: 'src/workflow.tsx',
  propsParser: require('react-docgen-typescript').withDefaultConfig().parse,
  serverPort: 3000,
};
