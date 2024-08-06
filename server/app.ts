import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import signupRouter from "./routers/signup";
import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";
import loginRouter from "./routers/login";
import registerDoctorRouter from "./routers/registerDoctor";
import registerPatientRouter from "./routers/registerPatient";
import meRouter from "./routers/me";
import doctorSearchRouter from "./routers/doctorSearch";
import doctorDetailRouter from "./routers/getDoctorDetail";
import availiblityRouter from "./routers/doctorAvailability";
import paymentRouter from "./routers/handlePayment";
import bookAppointmentRouter from "./routers/bookAppointment";
import Secret from "./utils/secrets";
import doctorDashboardRouter from "./routers/doctorDashboard";
import patientDashboardRouter from "./routers/patientDashboard";
import chatRouter from "./routers/chat";
import meetRouter from "./routers/meet";
dotenv.config();
const app = express();
const port = Secret.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Kushal Goyal");
});

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/me", meRouter);
app.use("/api/register-doctor", registerDoctorRouter);
app.use("/api/register-patient", registerPatientRouter);
app.use("/api/search", doctorSearchRouter);
app.use("/api/doctor", doctorDetailRouter);
app.use("/api/doctor-availability", availiblityRouter);
app.use("/api/pay", paymentRouter);
app.use("/api/book", bookAppointmentRouter);
app.use("/api/doctor-dashboard", doctorDashboardRouter);
app.use("/api/patient-dashboard", patientDashboardRouter);
app.use("/api/meet", meetRouter);
app.use("/api/chat", chatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
