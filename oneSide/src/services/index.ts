import flyio from '../utils/request';
// 登录接口
 export function login(code): Promise<any>{
     return flyio.post('/user/code2session', {code});
 }