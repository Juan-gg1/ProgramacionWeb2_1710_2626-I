const os = require('node:os');

console.log("Informacion de mi sistema");
console.log("--------------------------");
console.log("Nombre de sistema", os.platform());
console.log("Version de mi sistema:", os.release());
console.log("Arquitectura", os.cpus());
