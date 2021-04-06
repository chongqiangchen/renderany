// @ts-nocheck
import Less from 'less/lib/less';
import defaultOptions from 'less/lib/less/default-options';
const less = new Less();
less.PluginLoader = function() {};
less.options = Object.assign(defaultOptions(), {
  javascriptEnabled: true
});
export default less;
