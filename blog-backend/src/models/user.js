import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

//인스턴스 메서드를 작성할 때는 화살표 함수 x function 키워드로 만들어야 함 (내부에서 this(=문서인스턴스)에 접근하기 위함)
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username }); // this : model(user)
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

const User = mongoose.model('User', UserSchema);

export default User;