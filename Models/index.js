// Models/index.js
import User from "./user.model.js";
import Issues from "./Issues.model.js";
import Comments from "./Comments.model.js";

/* ---------- User <-> Issues ---------- */
User.hasMany(Issues, { foreignKey: 'created_by', as: 'createdIssues' });
Issues.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

User.hasMany(Issues, { foreignKey: 'assigned_to', as: 'assignedIssues' });
Issues.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignee' });

/* ---------- Issue <-> Comments ---------- */
Issues.hasMany(Comments, { foreignKey: 'issue_id', as: 'comments' });
Comments.belongsTo(Issues, { foreignKey: 'issue_id', as: 'issue' });

/* ---------- User <-> Comments ---------- */
User.hasMany(Comments, { foreignKey: 'user_id', as: 'comments' });
Comments.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

Comments.hasMany(Comments, { foreignKey: 'parent_id', as: 'replies' });
Comments.belongsTo(Comments, { foreignKey: 'parent_id', as: 'parent' });

export { User, Issues, Comments };