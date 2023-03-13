CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT
);

CREATE TABLE users (
    id  SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://www.servedfromscratch.com/wp-content/uploads/2014/12/Crock-Pot-Chicken-Pho-18-2.jpg');
INSERT INTO dishes (title, image_url) VALUES ('goose', 'https://www.thedeliciouscrescent.com/wp-content/uploads/2018/12/Roast-Goose-Square.jpg');
INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://www.michels.com.au/app/uploads/2020/03/MP3960-Website-ClickCollect-Update_Images8.jpg');

ALTER TABLE dishes ADD description TEXT;
ALTER TABLE dishes ADD COLUMN user_id INTEGER;

UPDATE dishes SET description = 'Cake is a flour confection made from flour, sugar, and other ingredients, and is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations ...' WHERE title = 'cake';
UPDATE dishes SET description = 'In cooking and gastronomy, goose is the meat of several species of bird in the family Anatidae. The goose is in the biological family of birds including ducks, and swans, known as the family of Anatidae. The family has a cosmopolitan distribution.' WHERE title = 'goose';

INSERT INTO users (email) VALUES ('dt@ga.co');
INSERT INTO users (email) VALUES ('dt@generalassemb.ly');
