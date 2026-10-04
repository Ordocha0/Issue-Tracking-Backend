import User from "./user.model.js";
import Issues from "./Issues.model.js";


User.hasMany(Issues, { foreignKey: 'created_by' });
Issues.belongsTo(User, { foreignKey: 'created_by' });

User.hasMany(Issues, { foreignKey: 'assigned_to' });
Issues.belongsTo(User, { foreignKey: 'assigned_to' });

export { User , Issues };