Create database testDb;
Use testDb;

create table Test(id int not null, name varchar(30) not null, email varchar(15) not null, phone int null);

insert into Test(id, name, email, phone) values(1, "mail@mail.com", 78978945); 
