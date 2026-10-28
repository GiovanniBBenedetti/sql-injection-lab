CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS secrets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    secret_key VARCHAR(100),
    secret_value TEXT
);

INSERT INTO users (username, password, email, role) VALUES
('admin', 'admin123', 'admin@empresa.com', 'admin'),
('joao', 'senha123', 'joao@email.com', 'user'),
('maria', 'maria456', 'maria@email.com', 'user'),
('carlos', 'carlos789', 'carlos@email.com', 'user');

INSERT INTO products (name, description, price, category) VALUES
('Notebook Pro', 'Notebook de alta performance', 4999.99, 'Eletrônicos'),
('Mouse Gamer', 'Mouse com 16000 DPI', 299.99, 'Periféricos'),
('Teclado Mecânico', 'Switch blue, RGB', 599.99, 'Periféricos'),
('Monitor 4K', 'Monitor 27 polegadas 4K', 2499.99, 'Eletrônicos');

INSERT INTO secrets (secret_key, secret_value) VALUES
('api_key', 'sk-prod-9f8e7d6c5b4a3210'),
('db_backup_pass', 'BackupPass@2024!'),
('jwt_secret', 'super-secret-jwt-key-never-share');
