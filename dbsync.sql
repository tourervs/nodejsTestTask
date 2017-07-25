create user webuser with password 'Welcome123';
create database welcomeapp with owner = webuser ;
create extension chkpass;

create sequence id_sequence start 1 increment 1 ; 
grant select, update, usage ON id_sequence  TO webuser;

create table users (
    id integer primary key default  nextval('id_sequence'),
    name varchar(40) unique,
    password varchar(255)
);


grant select, update, insert ON users TO webuser;

insert into users (name,password)  values  ('user1' , 'Welcome123' );
insert into users (name,password)  values  ('user2' , 'Welcome123' );


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
