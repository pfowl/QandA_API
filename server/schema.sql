CREATE TABLE IF NOT EXISTS answers_photos (
   id serial PRIMARY KEY,
   answer_id int references answers(id) NOT NULL,
   url varchar(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS answers (
   id serial PRIMARY KEY,
   question_id int NOT NULL,
   body varchar(5000),
   date_written bigint,
   answerer_name varchar(50),
   answerer_email varchar(100),
   reported int,
   helpful int
);

CREATE TABLE IF NOT EXISTS questions (
   id serial PRIMARY KEY,
   product_id int references product(id) NOT NULL,
   body varchar(4000),
   date_written text,
   asker_name varchar(50),
   asker_email varchar(100),
   reported int,
   helpful int
);

CREATE TABLE IF NOT EXISTS product (
   id serial PRIMARY KEY,
   name varchar(100),
   slogan varchar(1000),
   description varchar(2000),
   category varchar(200),
   default_price int
);

\copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/valpizzo/Desktop/SDC/QandA_API/data/questions.csv' DELIMITER ',' CSV HEADER;