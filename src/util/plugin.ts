import type { App } from '@slack/bolt';
import { promises as fs } from 'fs';
import { resolve } from 'path';

//Credit for the base of this script to 
//Max Kaparawich https://github.com/karpawich and 
//H4I https://github.com/hack4impact/slack-bot/blob/master/src/util/plugin.ts

/**
 * A handy function that prefixes any ID string you
 * give it with your plugin's slug
 */
type PrefixFunction = (id:string) => string;

/**
 * The JSON metadata file for your plugin
 */
interface PluginJSON {
  name: string,
  version: string,
  slug: string,
}

type PluginFunction = (app:App, pre:PrefixFunction) => Promise<void>;

interface Plugin {
  json: PluginJSON,
  func: PluginFunction
}

// Some TypeScript wizardy that dynamically loads plugins
async function loadPlugins(app:App) {
  console.log('Loading plugins...');
  const __dirname = resolve('')

  // load the plugin files
  const loadPromises:Promise<Plugin>[] = [];
  const pluginFolders:string[] = await fs.readdir(resolve(__dirname, 'src', 'plugins'));
  for (let i = 0; i < pluginFolders.length; i += 1) {
    loadPromises.push((async () => {
      const json:PluginJSON = (await import(`../plugins/${pluginFolders[i]}/pluginConfig`)).default;
      const func:PluginFunction = (await import(`../plugins/${pluginFolders[i]}/plugin`)).default;
      return { json, func };
    })());
  }

  // register each plugin
  const pluginPromises:Promise<void>[] = [];
  const plugins:Plugin[] = await Promise.all(loadPromises);
  console.log(`${plugins.length} plugins detected.`);
  for (let i = 0; i < plugins.length; i += 1) {
    const plugin = plugins[i];
    const pre:PrefixFunction = (id) => `${plugin.json.slug}_${id}`;
    pluginPromises.push(plugin.func(app, pre).then(() => {
      console.log(`→ "${plugin.json.name}" v${plugin.json.version} loaded.`);
    }));
  }
  await Promise.all(pluginPromises);
  console.log('Plugins loaded!');
}

export type {
  PrefixFunction, PluginJSON, PluginFunction, Plugin,
};

export default loadPlugins;