export const up = async ({schema, fn}) => {
  return schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('password').notNullable();
    table.string('name');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultsTo(fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultsTo(fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

export const down = async ({schema}) => {
  return schema.dropTableIfExists('users');
};
