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


\copy answers_photos(id,answer_id,url) FROM '/Users/valpizzo/Desktop/SDC Project/QandA_API/data/answers_photos.csv' DELIMITER ',' CSV HEADER;