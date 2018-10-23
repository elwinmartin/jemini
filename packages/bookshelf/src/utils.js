export const getTableName = (migration) => {
  const tableName = [];
  const segments = migration.split('_').reverse();
  const connectors = ['to', 'from', 'and', 'with', 'for', 'in', 'of', 'on'];
  const actions = [
    'create',
    'insert',
    'add',
    'make',
    'delete',
    'remove',
    'destroy',
    'drop',
    'append',
    'update',
    'change',
  ];

  if (segments[0] === 'table') {
    segments.shift();
  }

  for (let i = 0; i < segments.length; i += 1) {
    if (connectors.indexOf(segments[i]) === -1) {
      tableName.push(segments[i]);
    }
  }

  if (actions.indexOf(tableName[tableName.length - 1]) !== -1) {
    tableName.pop(); // remove last segment if an action.
  }

  return tableName.reverse().join('_');
};
