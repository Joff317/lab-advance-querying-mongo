const mongoose = require("mongoose");
require("dotenv").config();

const companiesSchema = new mongoose.Schema({
  name: "string",
  founded_year: "number",
});
const Companie = mongoose.model("Companie", companiesSchema);

function getAllCompanies() {
  return mongoose
    .connect(`${process.env.DB_URL}`)
    .then((elt) =>
      console.log(
        `Connected to Mongo! Database name: ${elt.connections[0].name}`
      )
    )
    .then(() => Companie.find())
    .then((companie) =>
      console.log("All Companie was sucessfully display", companie)
    )
    .then(() => mongoose.connection.close())
    .catch((err) => console.error("Error connection to mongo", err));
}

function getAllCompaniesByMatchName(companieName) {
  return mongoose
    .connect(`${process.env.DB_URL}`)
    .then((elt) =>
      console.log(
        `Connected to Mongo! Database name: ${elt.connections[0].name}`
      )
    )
    .then(() =>
      Companie.find({ name: companieName }).select({ name: 1, _id: 0 })
    )
    .then((companie) =>
      console.log("Companie name was sucessfully display", companie)
    )
    .then(() => mongoose.connection.close())
    .catch((err) => console.error("Error connection to mongo", err));
}

function getAllCompaniesByEmployees() {
  return mongoose
    .connect(`${process.env.DB_URL}`)
    .then((elt) =>
      console.log(
        `Connected to Mongo! Database name: ${elt.connections[0].name}`
      )
    )
    .then(() =>
      Companie.find({ number_of_employees: { $gt: 5000 } })
        .sort({ number_of_employees: 1 })
        .limit(20)
    )
    .then((companies) =>
      console.log("All companies was sucessfully display", companies)
    )
    .then(() => mongoose.connection.close())
    .catch((err) => console.error("Error connection to mongo", err));
}

function getAllCompaniesFounded() {
  return mongoose
    .connect(`${process.env.DB_URL}`)
    .then((elt) =>
      console.log(
        `Connected to Mongo! Database name: ${elt.connections[0].name}`
      )
    )
    .then(() =>
      Companie.find({ founded_year: { $gte: 2000, $lte: 2005 } }).select({
        name: 1,
        founded_year: 1,
        _id: 0,
      })
    )
    .then((companies) =>
      console.log("All companies was sucessfully display", companies)
    )
    .then(() => mongoose.connection.close())
    .catch((err) => console.error("Error connection to mongo", err));
}

function getAllCompaniesIPO() {
  return mongoose
    .connect(`${process.env.DB_URL}`)
    .then((elt) =>
      console.log(
        `Connected to Mongo! Database name: ${elt.connections[0].name}`
      )
    )
    .then(() =>
      Companie.find({
        "ipo.valuation_amount": { $gt: 100000000 },
        founded_year: { $lte: 2010 },
      })
        .select({ name: 1, ipo: 1, _id: 0 })
        .select({ name: 1, "ipo.valuation_amount": 1, _id: 0 })
    )
    .then((companies) =>
      console.log("All companies was sucessfully display", companies)
    )
    .then(() => mongoose.connection.close())
    .catch((err) => console.error("Error connection to mongo", err));
}

function getAllCompaniesLessThan1000Employee() {
  return mongoose
    .connect(`${process.env.DB_URL}`)
    .then((elt) =>
      console.log(
        `Connected to Mongo! Database name: ${elt.connections[0].name}`
      )
    )
    .then(() =>
      Companie.find({
        number_of_employees: { $lte: 1000 },
        founded_year: { $lte: 20005 },
      })
        .sort({ number_of_employees: 1 })
        .limit(10)
    )
    .then((companies) =>
      console.log("All companies was sucessfully display", companies)
    )
    .then(() => mongoose.connection.close())
    .catch((err) => console.error("Error connection to mongo", err));
}

function getCompaniesWithoutPartners() {
   return mongoose
     .connect(`${process.env.DB_URL}`)
     .then((elt) =>
       console.log(
         `Connected to Mongo! Database name: ${elt.connections[0].name}`
       )
     )
     .then(() =>
       Companie.find({ partners: { $exists: false } })
     )
     .then((companies) =>
       console.log("Companies without partners were successfully displayed", companies)
     )
     .then(() => mongoose.connection.close())
     .catch((err) => console.error("Error connecting to MongoDB", err));
 }

function getCompaniesWithNullCategory() {
   return mongoose
     .connect(`${process.env.DB_URL}`)
     .then((elt) =>
       console.log(
         `Connected to Mongo! Database name: ${elt.connections[0].name}`
       )
     )
     .then(() =>
       Companie.find({ category_code: { $type: 10 } })
     )
     .then((companies) =>
       console.log("Companies with null category_code were successfully displayed", companies)
     )
     .then(() => mongoose.connection.close())
     .catch((err) => console.error("Error connecting to MongoDB", err));
 }

 function getMediumCompanies() {
   return mongoose
     .connect(`${process.env.DB_URL}`)
     .then((elt) =>
       console.log(
         `Connected to Mongo! Database name: ${elt.connections[0].name}`
       )
     )
     .then(() =>
       Companie.find({
         number_of_employees: { $gte: 100, $lt: 1000 }
       }).select({ name: 1, number_of_employees: 1, _id: 0 })
     )
     .then((companies) =>
       console.log("Medium-sized companies were successfully displayed", companies)
     )
     .then(() => mongoose.connection.close())
     .catch((err) => console.error("Error connecting to MongoDB", err));
 }


 function getTopTenCompaniesByEmployees() {
   return mongoose
     .connect(`${process.env.DB_URL}`)
     .then((elt) =>
       console.log(
         `Connected to Mongo! Database name: ${elt.connections[0].name}`
       )
     )
     .then(() =>
       Companie.find()
         .sort({ number_of_employees: -1 }) // Sorting in descending order by number_of_employees
         .limit(10)
     )
     .then((companies) =>
       console.log("Top ten companies by employees were successfully displayed", companies)
     )
     .then(() => mongoose.connection.close())
     .catch((err) => console.error("Error connecting to MongoDB", err));
 }

 function getCompaniesFoundedInSecondSemester() {
   return mongoose
     .connect(`${process.env.DB_URL}`)
     .then((elt) =>
       console.log(
         `Connected to Mongo! Database name: ${elt.connections[0].name}`
       )
     )
     .then(() =>
       Companie.find({
         founded_month: { $gte: 7, $lte: 12 } // Assuming month 7-12 represents the second semester
       })
         .limit(1000)
     )
     .then((companies) =>
       console.log("Companies founded in the second semester were successfully displayed", companies)
     )
     .then(() => mongoose.connection.close())
     .catch((err) => console.error("Error connecting to MongoDB", err));
 }
// getAllCompanies();
// getAllCompaniesByMatchName("Babelgum")
// getAllCompaniesByEmployees()
// getAllCompaniesFounded()
// getAllCompaniesIPO()
// getAllCompaniesLessThan1000Employee()
// getCompaniesWithoutPartners()
// getCompaniesWithNullCategory()
// getMediumCompanies()
// getTopTenCompaniesByEmployees()
// getCompaniesFoundedInSecondSemester()
