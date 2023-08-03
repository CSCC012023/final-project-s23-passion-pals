import { createTransport } from "nodemailer";
import nodemailer from "nodemailer";

export default async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false, // Set to true if using port 465 (SSL/TLS)
			auth: {
			  user: 'nishu.sheth22@gmail.com', // Replace with your Gmail email
			  pass: 'adtijianbtdmqgyr',   // Replace with your Gmail app password or your account password
			},
		  });

		await transporter.sendMail({
			from: 'nishu.sheth22@gmail.com',
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};