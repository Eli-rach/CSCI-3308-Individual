CREATE TABLE if not exists drinks
(
  drinkName character varying(20) NOT NULL,
  drinkCategory character varying(20) NOT ,
  drinkIsAlc character varying(10),
  directions character varying(100),
  drinkImg VARBINARY (max)
);