import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "projectmedify@outlook.com",
        pass: process.env.PASSWORD
    }
})

exports.sendMail = (mailOptions: any) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
}
