/*
 * Created by liuchaorun
 * Date 18-6-14
 * Time 下午6:55
 **/
const koa = require('koa');
const app = new koa();
const koaStatic = require('koa-static');
app.use(koaStatic(__dirname));
app.listen(3000);