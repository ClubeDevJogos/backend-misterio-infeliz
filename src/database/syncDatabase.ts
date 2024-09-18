import database from "../database";

import chapter from "../models/chapter";
import mission from "../models/mission";
import user from "../models/user";
import item from "../models/item";
import user_item from "../models/user_item";

chapter.hasMany(mission, { foreignKey: "id_chapter" });

mission.belongsTo(chapter, { foreignKey: "id_chapter" as "chapter" });
mission.hasMany(user, { foreignKey: "id_mission" });

user.belongsTo(mission, { foreignKey: "id_mission" as "mission" });
user.hasMany(user_item, { foreignKey: "id_user" });

item.hasMany(user_item, { foreignKey: "id_item" });

user_item.belongsTo(user, { foreignKey: "id_user" as "user" });
user_item.belongsTo(item, { foreignKey: "id_item" as "item" });

database.sync({ force: false });
