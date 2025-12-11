import client from "./client.js";
import { faker } from "@faker-js/faker";

await client.connect();
await seedEmployees();
await client.end();

console.log("🌱 Database seeded.");

async function seedEmployees() {
  // delete existing
  await client.query(`DELETE FROM employees;`);

  const employees = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    birthday: faker.date.birthdate({ min: 20, max: 60, mode: "age" }),
    salary: faker.number.int({ min: 40000, max: 150000 }),
  }));

  for (const emp of employees) {
    await client.query(
      `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3);
      `,
      [emp.name, emp.birthday, emp.salary]
    );
  }
}
