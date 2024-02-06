import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

userSchema.pre('save', function (next) {
  if (!this.user_id) {
    this.user_id = this._id.toString();
  }
  next();
});

const UserModel = mongoose.model('user_details', userSchema);
export default UserModel;
