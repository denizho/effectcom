/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("projects", tbl=>{
      tbl.increments();
      tbl.text("title")
      tbl.text("img")
      tbl.text("video")
      tbl.text("isVideo")
      tbl.integer("sort")
      tbl.boolean("isEnable")
      tbl.boolean("isDeleted")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("projects")
};
