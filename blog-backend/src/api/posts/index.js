const Router = require('koa-router');
const postCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', postCtrl.write);

//api/posts/:id를 위한 라우터를 새로 만들고 posts에 해당 라우터를 등록
const post = new Router();

posts.get('/', postCtrl.read);
posts.delete('/', postCtrl.remove);
posts.patch('/', postCtrl.update);

post.use('/:id', postCtrl.checkObjectId, post.routes());

export default posts;
