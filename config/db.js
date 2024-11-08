import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost', // Remplacez par votre hôte MySQL
    port: '8889',
    user: 'root', // Remplacez par votre nom d'utilisateur MySQL
    password: 'root', // Remplacez par votre mot de passe MySQL
    database: 'woven', // Nom de la base de données
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;