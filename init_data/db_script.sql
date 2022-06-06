CREATE TABLE if not exists drinks
(
  drinkName VARCHAR(200) NOT NULL,
  drinkCategory VARCHAR(100) NOT NULL,
  drinkIsAlc VARCHAR(100),
  directions VARCHAR(1000),
  drinkImg VARCHAR(1000)
);