CREATE TABLE IF NOT EXISTS users (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    address   VARCHAR(255),
    birthdate DATE,
    age       INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);