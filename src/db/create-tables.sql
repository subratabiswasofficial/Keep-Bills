create table Session( email varchar(100), OTP int, created bigint, primary key(email) );

create table Users(  uid varchar(50) not null, email varchar(100) not null, type varchar(20) not null default 'student', primary key( uid, email ) );
    
create table Files( fid varchar(50) not null, etag varchar(255) not null, name varchar(255) not null, location varchar(255) not null, created datetime not null, primary key( fid ) );

create table Students( uid varchar(50), name varchar(100) not null, roll bigint not null unique, department varchar(100), semester int default 1, avatarId varchar(50), primary key (uid), foreign key (uid) references Users(uid) on delete cascade );

create table Bills( bid varchar(50), uid varchar(50) not null, amount int not null, fid varchar(50), ref varchar(200) not null, semester int not null, created datetime not null, status varchar(20) default 'pending', primary key (bid), foreign key (uid) references Users(uid) on delete cascade )
