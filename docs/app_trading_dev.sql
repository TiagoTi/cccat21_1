-- conectar como administrador de banco de dados
-- psql -W -h 192.168.10.3 db0 postgres

create database app_trading_dev;

CREATE ROLE usr_admin
  WITH LOGIN
  PASSWORD 'Passw0rd!'
  NOSUPERUSER
  NOCREATEDB
  NOCREATEROLE
  INHERIT
  VALID UNTIL 'infinity';
CREATE ROLE usr_api
  WITH LOGIN
  PASSWORD 'Passw0rds'
  NOSUPERUSER
  NOCREATEDB
  NOCREATEROLE
  INHERIT
  VALID UNTIL 'infinity';

GRANT CONNECT ON DATABASE app_trading_dev TO usr_admin;
GRANT CONNECT ON DATABASE app_trading_dev TO usr_api;

ALTER DATABASE app_trading_dev OWNER TO usr_admin;

\c app_trading_dev;

GRANT CREATE ON SCHEMA public TO usr_admin;
ALTER SCHEMA public OWNER TO usr_admin;

GRANT CREATE ON SCHEMA public TO usr_api;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO usr_api;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO usr_api;


-- conectar como a aplicacao
-- psql -W -h 192.168.10.3 app_trading_dev usr_api

-- conectar como a administrador 
-- psql -W -h 192.168.10.3 app_trading_dev usr_admin


-- psql -W -h 192.168.10.3 pizzaria_db_dev usr_api
---
app_trading_dev=# ALTER ROLE usr_admin RENAME TO usr_admin_trading;
ALTER ROLE
app_trading_dev=# ALTER ROLE usr_api RENAME TO usr_api_trading;
ALTER ROLE
app_trading_dev=# select rolname from pg_roles ;

app_trading_dev=# ALTER ROLE usr_admin_trading WITH PASSWORD '123';
ALTER ROLE
app_trading_dev=# ALTER ROLE usr_api_trading WITH PASSWORD '123';
