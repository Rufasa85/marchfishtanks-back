const User = require("./User")
const Fish = require("./Fish")
const Tank = require("./Tank")

User.hasMany(Tank);
User.hasMany(Fish);

Tank.belongsTo(User);
Tank.hasMany(Fish);

Fish.belongsTo(User);
Fish.belongsTo(Tank);

module.exports = {User,Tank,Fish};