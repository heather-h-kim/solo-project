CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "cats" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"age" varchar(100) NOT NULL,
	"is_neutered" varchar(100) NOT NULL,
	"current_weight" numeric,
	"current_weight_date" date DEFAULT CURRENT_DATE,
	"goal_weight" numeric,
	"treat_percentage" int,
	"total_daily_cal" int,
	"food_cal" int,
	"treat_cal" int,
	"wet_percentage" int,
	"adjustment_direction" varchar(100),
	"adjustment_percentage" int,
	"user_id" int REFERENCES "user"
);

CREATE TABLE "foods" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(500) NOT NULL,
	"type" varchar(100) NOT NULL,
	"cal_per_kg" int
); 


CREATE TABLE "cats_foods" (
	"id" SERIAL PRIMARY KEY, 
	"cat_id" int REFERENCES "cats",
	"food_id" int REFERENCES "foods",
	"daily_amount_oz" numeric
);


CREATE TABLE "weight" (
	"id" SERIAL PRIMARY KEY,
	"current_weight" numeric,
	"date" date DEFAULT CURRENT_DATE,	
	"cat_id" int REFERENCES "cats"
);