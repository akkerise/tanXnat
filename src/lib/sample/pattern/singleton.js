// Singleton
function DatabaseConnection() {
  let databaseInstance = null;
  let count = 0;
  function init() {
    console.log(`Opening database #${count + 1}`);
  }
  function open() {
    if (databaseInstance == null) {
      databaseInstance = init();
    }
    return databaseInstance;
  }
  function close() {
    console.log('closing database');
    databaseInstance = null;
  }
  return {
    open,
    close
  }
}

const database = DatabaseConnection();
database.open(); //Open database #1
database.open(); //Open database #1
database.open(); //Open database #1
database.close(); //close database