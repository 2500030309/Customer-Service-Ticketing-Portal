select * from users;

select * from tickets;

select * from menus;

insert into menus(mid,icon,menu) values 
(1, 'dashboard.png', 'Dashboard'),
(2, 'createticket.png', 'Create Ticket'),
(3, 'manageticket.png', 'Manage Tickets'),
(4, 'usermanager.png', 'User Manager'),
(5, 'myprofile.png', 'My Profile');

select * from roles;

insert into roles(role, rolename) values
(1,'USER'),
(2,'MANAGER'),
(3,'ADMIN');

select * from roles_mapping;

insert into roles_mapping(mid, role) values 
(1,1),
(2,1),
(5,1),
(1,2),
(2,2),
(3,2),
(5,2),
(1,3),
(2,3),
(3,3),
(4,3),
(5,3);

select M.* from menus M join roles_mapping R on M.mid = R.mid where R.role = 1;
select M.* from menus M join roles_mapping R on M.mid = R.mid where R.role = 2;
select M.* from menus M join roles_mapping R on M.mid = R.mid where R.role = 3;

UPDATE tickets
SET status = 'PENDING'
WHERE status IS NULL;