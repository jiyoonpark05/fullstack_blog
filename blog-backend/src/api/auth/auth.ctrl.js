import Joi from '@hapi/joi';
import User from '../../models/user';

/*
    post /api/auth/register
    {
        username:'jiyoon'
        password:'jiyoon123'
    }
*/
//회원가입
export const register = async (ctx) => {
  //request body 검증 하기
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    //username이 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; //conflict
      return;
    }
    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save();

    //응답할 데이터에서 hashedpassword 필드 제거
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};
//로그인
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  //username, password 없으면 에러 처리
};

//로그인 상태 확인
export const check = async (ctx) => {};

//로그아웃
export const logout = async (ctx) => {};