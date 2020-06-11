CREATE TABLE if not EXISTS User (
	id text PRIMARY key ,
  	username TEXT unique,
  	pwdHash TEXT 
);
Create table if not EXISTS Password(
  id TEXT PRIMARY key,
  cipher TEXT,
  hash TEXT , 
  user_id REFERENCES User (id) );
CREATE TABLE IF NOT EXISTS Site (
  id TEXT PRIMARY key,
  name text ,
  username TEXT );