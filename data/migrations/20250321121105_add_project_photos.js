/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("t_photos", tbl=>{
        tbl.increments();
        tbl.integer("projectid")
        tbl.text("filepath")
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
    return knex.schema.dropTableIfExists("t_photos")
};
