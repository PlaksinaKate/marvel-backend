import nodemailer from "nodemailer";
import { database } from "./database/index.js";

export const checkClientsRecord = async () => {
  const records = await database.records.getRecords();
  const nowDate = new Date();

  records.map(async (record) => {
    const { id, id_service, id_master, id_client, data_time } = record;
    const dateTime = new Date(data_time);
    dateTime.setDate(dateTime.getDate() - 1);

    if (
      data_time.toISOString().split("T")[0] >
      nowDate.toISOString().split("T")[0]
    ) {
      return Promise.allSettled([
        await database.clients.getClient(id_client),
        await database.masters.getMaster(id_master),
        await database.services.getService(id_service),
      ]).then((result) => {
        console.log(result);
        sendMail({
          name: result[0].value.name,
          service: result[2].value.name,
          date: new Date(data_time).toLocaleString(),
          master: result[1].value.name,
          id,
        });
      });
    }
  });
};

export async function sendMail({ name, service, date, master, id }) {
  try {
    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "cc7dd50be07339fe347192c8d862b088",
      },
    });

    const mailOptions = {
      from: "Marvel салон  mailtrap@demomailtrap.com",
      to: "plaksina.ekaterina20@gmail.com",
      subject: "Email Scheduler",
      text: "Hello from spambot",
      html: `
      <h3>Здравствуйте, ${name}!</h3>
      <p>Вы записаны на процедуру ${service} ${date} к мастеру ${master}</p>
      <p>Пожалуйста, подтвердите запись http://localhost:5173/confirm-record?id=${id}</p>
      <br/>
      <p>С уважением,</p>
      <p>Салон Marvel</p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
