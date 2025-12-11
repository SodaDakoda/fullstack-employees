import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (err) {
    next(err);
  }
});

app.post("/employees", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("Request body required.");
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || salary == null) {
      return res.status(400).send("Missing required field.");
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send("Invalid ID.");
    }

    const employee = await getEmployeeById(id);

    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    res.send(employee);
  } catch (err) {
    next(err);
  }
});

app.delete("/employees/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
