import express from "express";
import { mailId, mailPassword, mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { predefinedVaccinations, Users } from "./models/userModel.js";
import cors from "cors";
import { getVaccinationDates } from "./component/utility.js";
import nodemailer from "nodemailer";
import cron from "node-cron";

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer Mail sender
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: mailId,
    pass: mailPassword,
  },
});

mongoose
  .connect(mongoDBURL)
  .then(console.log("App connected to Database"))
  .then(
    app.listen(PORT, () => {
      console.log(`App is listning at Port:${PORT}`);
    })
  )
  .catch((e) => {
    console.log(e.message);
  });

// test if server is running
app.get("/", async (req, res) => {
  res.send(
    `Port is listnening at ${PORT}, nothing special here do not access this unless you like blank screen`
  );
});

//Signup Page...

app.post("/signup", async (req, res) => {

  const { username, email, password, child } = req.body;

  try {
    // Validate input data
    if (!username || !email || !password || !child) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const user_name = await Users.findOne({
      username,
    });

    const e_mail = await Users.findOne({
      email,
    });

    if (user_name) {
      return res.status(400).send({ message: "Username Already exist" });
    }

    if (e_mail) {
      console.log("email not found");
      return res.status(400).send({ message: "Email already exists" });
    }

    // Calculate recommended vaccination dates for each child

    const updatedChildren = child.map((childInfo) => {
      const { childName, dob } = childInfo;
      const vaccinationsWithDates = getVaccinationDates(
        dob,
        predefinedVaccinations
      );

      return {
        childName,
        dob,
        vaccinations: vaccinationsWithDates,
      };
    });

    // fetch to whom we need to send mail.
    const mailOptions = {
      from: mailId,
      to: String(email),
      subject: "VaccineApp Signup success",
      text: "This is a test email sent using Nodemailer. You have been logged in successully",
    };

    // once every thing good this will send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    // Create a new user document
    const newUser = new Users({
      username,
      email,
      password,
      child: updatedChildren,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete User
app.post("/deleteUser/userid/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } else {
      const deleteuser = await Users.findByIdAndDelete(id);
      return res.status(200).send({ Message: "User delete successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

//Get UserData in home

app.get("/userdata/:id", async (req,res) => {
  const {id} = req.params;
  try {
    const user =await Users.find({"_id":id});

    console.log(user)
    // console.log(userId)
    return res.status(200).send(user);
  } catch (error) {
    console.log({message: error})
  }
  
})

//login
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await Users.findOne({
      username: username,
      password: password,
    });

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Please enter username and password" });
    }

    if (!user) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Username or password is incorrect" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(502)
      .send({ message: "Username or password is incorrect" });
  }
});

// update vaccine
app.put(
  "/users/:userId/child/:childId/vaccination/:vaccineId",
  async (req, res) => {
    try {
      const { userId, childId, vaccineId } = req.params;
      const { administered } = req.body;

      const user = await Users.findOneAndUpdate(
        {
          _id: userId,
          "child._id": childId,
          "child.vaccinations._id": parseInt(vaccineId),
        },
        {
          $set: {
            "child.$[child].vaccinations.$[vaccine].administered": administered,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "child._id": childId },
            { "vaccine._id": parseInt(vaccineId) },
          ],
        }
      );
      console.log(administered);
      if (!user) {
        return res.status(404).send("User, child, or vaccination not found");
      }

      await user.save();

      return res.send(user);
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).send(error.message);
    }
  }
);

// Hospital Update.
app.put(
  "/users/:userId/child/:childId/hospital/:vaccineId",
  async (req, res) => {
    try {
      const { userId, childId, vaccineId } = req.params;
      const { hospital,recommendedDate } = req.body;

      const user = await Users.findOneAndUpdate(
        {
          _id: userId,
          "child._id": childId,
          "child.vaccinations._id": parseInt(vaccineId),
        },
        {
          $set: {
            "child.$[child].vaccinations.$[vaccine].hospital": hospital,
            "child.$[child].vaccinations.$[vaccine].recommendedDate": recommendedDate,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "child._id": childId },
            { "vaccine._id": parseInt(vaccineId) },
          ],
        }
      );
      console.log(hospital, recommendedDate);
      if (!user) {
        return res.status(404).send("User, child, or vaccination not found");
      }

      await user.save();

      return res.send(user);
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).send(error.message);
    }
  }
);

// To update Dates of all vaccines.



// To send email Notification.
cron.schedule("* * * 5 * *", async (req, res) => {
  try {
    const users = await Users.find();
    users.forEach((user) => {
      let childVaccinations = [];

      user.child.forEach((child) => {
        child.vaccinations.forEach((vaccination) => {
          if (!vaccination.administered) {
            childVaccinations.push({
              name: vaccination.name,
              recommendedDate: vaccination.recommendedDate,
              administered: String(vaccination.administered),
            });
          }
        });
      });

      let data = `Hi ${user.username},\nYour Baby's vaccination report is ready.`;

      const tableRows = childVaccinations.map((vaccine) => `
        <tr>
          <td style="border: 1px solid #aaa; padding: 8px;">${vaccine.name}</td>
          <td style="border: 1px solid #aaa; padding: 8px;">${vaccine.recommendedDate}</td>
          <td style="border: 1px solid #aaa; padding: 8px;">${vaccine.administered}</td>
        </tr>
      `).join('');

      const mailOption = {
        from: mailId,
        to: user.email,
        subject: `${user.username} your Vaccine Report`,
        
        html: `
        <h2>${data}</h2>
        <table style="border-collapse: collapse; width: 100%;">
                <tr style="background-color: #f2f2f2;">
                  <th style="border: 1px solid #ddd; padding: 8px;">Vaccine Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Date of vaccination</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Vaccination taken</th>
                </tr>
                ${tableRows}
              </table>`,
      };

      console.log(mailOption.html);
      // transporter.sendMail(mailOption, (error, info) => {
      //   if (error) {
      //     console.error("Error sending email: ", error);
      //   } else {
      //     console.log("Email sent: ", info.response);
      //   }
      // });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});