class Bill {
    constructor({}) {}
}
/*
create table Bills(
    bid varchar(50),
    uid varchar(50),
    amount int not null,
    fid varchar(50),
    ref varchar(200),
    created date,
    status varchar(20) default 'pending',
    primary key (bid),
    foreign key (uid)
    references Users(uid)
    on delete cascade
);
*/
