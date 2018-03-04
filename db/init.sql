create DATABASE testDb;
Use testDb;

create table Test1(id int not null, name varchar(30) not null, email varchar(15) not null, phone int null);
create table Test2(id int not null, name varchar(30) not null, email varchar(15) not null, phone int null);
create table Test3(id int not null, name varchar(30) not null, email varchar(15) not null, phone int null);

insert into Test1(id, name, email, phone) values(1, "stein", "mail@mail.com", 78978945); 
insert into Test2(id, name, email, phone) values(1, "stein", "mail@mail.com", 78978945); 
insert into Test3(id, name, email, phone) values(1, "stein", "mail@mail.com", 78978945); 