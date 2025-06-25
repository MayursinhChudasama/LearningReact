import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = db.prepare("SELECT * FROM meals").all();
  // console.log("--->", result);

  return result;
}
