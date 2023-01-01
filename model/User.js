const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "user-name is too short"],
    maxlength: [30, "User-name is tool long"],
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (parm) => `Please enter a valid email ${parm}`,
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 3,
  },

  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },

  accountStatus: {
    type: String,
    required: true,
    enum: ["ACTIVE", "PENDING", "REJECTED"],
    default: "PENDING",
  },
});

const User = model("User", userSchema);
module.exports = User;
