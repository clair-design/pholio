const { join } = require("path");
const { writeFile, ensureFile } = require("fs-extra");
const rollup = require("rollup");
const { skip } = require("rxjs/operators");
const { BehaviorSubject, Observable } = require("rxjs");

const getCacheDir = require("./getCacheDir");
const readCachedFile = require("./readCache");

let uid = 0;

module.exports = function({
  input,
  watch,
  moduleName,
  compress,
  format = "iife"
}) {
  const env = process.env.NODE_ENV || "development";
  const subject = new BehaviorSubject(null);
  const file = `${env}_${uid++}`;
  const tempScript = join(getCacheDir(), "temp", `${file}.js`);
  const tempStyles = join(getCacheDir(), "temp", `${file}.css`);

  const plugins = require("./rollupPlugins")({
    compress,
    extract: !watch,
    async onExtract(getExtracted) {
      await ensureFile(tempStyles);
      await writeFile(tempStyles, getExtracted().code);
      return false;
    }
  });

  const option = {
    input,
    plugins,
    output: {
      format: format,
      name: moduleName,
      file: tempScript
    }
  };

  if (typeof input === "object") {
    option.input = {
      path: input.path,
      contents: input.content
    };
    plugins.unshift(require("./rollupPluginMemory")());
  }

  Observable.create(async observer => {
    try {
      const emitNext = async () => {
        observer.next({
          script: await readCachedFile(tempScript),
          styles: await readCachedFile(tempStyles)
        });
      };

      if (!watch) {
        const bundle = await rollup.rollup(option);
        await bundle.write(option.output);
        return emitNext();
      }

      const watcher = rollup.watch(option);
      watcher.on("event", ({ code, error }) => {
        if (code === "ERROR" || code === "FATAL") {
          observer.error(error);
        }
        if (code === "BUNDLE_END") {
          emitNext();
        }
      });
    } catch (error) {
      observer.error(error);
    }
  }).subscribe(subject);

  // skip the fisrt null value
  return subject.pipe(skip(1));
};
