const createHash = require('webpack/lib/util/createHash');

const NAME = 'RemixxStaticModuleIdsPlugin';

class RemixxStaticModuleIdsPlugin {
  constructor(options) {
  }

  apply(compiler) {
    const options = this.options;
    compiler.hooks.compilation.tap(NAME, compilation => {
      const usedIds = new Set();
      compilation.hooks.beforeModuleIds.tap(
        NAME,
        modules => {
          for (const module of modules) {
            if (module.id === null && module.libIdent) {
              const id = module.libIdent({
                context: this.options.context || compiler.options.context
              });
              const hash = createHash(options.hashFunction);
              hash.update(id);
              const hashId = hash.digest(options.hashDigest);
              let len = options.hashDigestLength;
              while (usedIds.has(hashId.substr(0, len))) len++;

              module.id = hashId.substr(0, len);
              module._source._value = module._source._value.replace('__respond_pending_chunk_id__', module.id);
              usedIds.add(module.id);
            }
          }
        }
      );
    });
  }
}

export default RemixxStaticModuleIdsPlugin;
