CREATE TABLE IF NOT EXISTS cb_customers (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    info JSON NOT NULL,
    items JSON NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS cb_login (
    id INT AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;