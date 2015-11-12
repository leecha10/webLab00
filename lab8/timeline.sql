create table tweets (
  no integer primary key auto_increment,
  author varchar(20) not null,
  contents text not null,
  time datetime not null
);
