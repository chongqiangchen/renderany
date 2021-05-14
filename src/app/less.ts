// @ts-nocheck
import Less from 'less/lib/less';
import defaultOptions from 'less/lib/less/default-options';
const less = new Less();
// tslint:disable-next-line:only-arrow-functions
less.PluginLoader = function() {};
less.options = Object.assign(defaultOptions(), {
  javascriptEnabled: true
});
export default less;
