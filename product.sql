
CREATE TABLE products(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    name VARCHAR(25),
    model VARCHAR(25),
    price int,
    sale BIT,
    description VARCHAR(255),
    image VARCHAR(255),
    isModel BIT
);

ALTER TABLE products 
	CHANGE `isModel` `isModel` bit DEFAULT 'b'0'