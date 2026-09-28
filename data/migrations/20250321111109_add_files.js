/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("t_files", tbl=>{
        tbl.increments();
        tbl.text("title")
        tbl.text("filename")
        tbl.text("filepath")
        tbl.text("origName")
        tbl.integer("size")
        tbl.boolean("isEnable")
        tbl.boolean("isDeleted")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("t_files")
};
