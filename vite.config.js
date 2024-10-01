import path from 'path';

/**
 * Trick to use Vite server.open option on macOS
 * @see https://github.com/facebook/create-react-app/pull/1690#issuecomment-283518768
 */
process.env.BROWSER = 'open';

export default {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.js'),
      name: 'Dico',
      formats: ['umd', 'es'],
      fileName: 'dico'
    },
  },

  server: {
    port: 3300,
    open: true,
  }
}