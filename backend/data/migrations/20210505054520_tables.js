exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists('user', (table) => {
      table.increments();
      table.string('username', 255).unique().notNullable();
      table.text('password').notNullable();
      table.string('full_name');
      table.string('email').notNullable();
    })
    .createTableIfNotExists('category', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.enu('type', ['expense', 'income']).defaultTo('expense');
      table.string('color').defaultTo('black');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
    })
    .createTableIfNotExists('record', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.integer('amount').notNullable().unsigned();
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('category.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex.raw(`
        CREATE TRIGGER IF NOT EXISTS update_record_updated_at
        BEFORE UPDATE ON record
        FOR EACH ROW
        SET NEW.updated_at = NOW();
      `);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('record')
    .dropTableIfExists('category')
    .dropTableIfExists('user')
    .then(() => {
      return knex.raw(`DROP TRIGGER IF EXISTS update_record_updated_at`);
    });
};
