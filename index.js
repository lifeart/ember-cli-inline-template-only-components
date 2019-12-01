'use strict';

const { cacheKeyForStableTree } = require('calculate-cache-key-for-tree');

module.exports = {
  name: require('./package').name,
  cacheKeyForTree: cacheKeyForStableTree,

  setupPreprocessorRegistry(type, registry) {

    
      let pluginObj = this._buildPlugin();

      // var precompiled = htmlbarsPlugin.precompile("{{my-component}}");

      pluginObj.parallelBabel = {
        requireFile: __filename,
        buildUsing: '_buildPlugin',
        params: {
          
        },
      };


      registry.add('htmlbars-ast-plugin', pluginObj);
    
  },

  _buildPlugin() {
    return {
      name: 'inline-template-only-components',
      plugin: require('./lib/ast-transform'),
      baseDir() {
        return __dirname;
      },
    };
  }
};
