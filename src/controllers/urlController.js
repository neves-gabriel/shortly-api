import { nanoid } from "nanoid";
import { connection } from "../database.js";

export async function postUrl(req, res) {
  try {
    const { user } = res.locals;
    const { url } = req.body;

    const shortUrl = nanoid(8);

    await connection.query(
      `
			INSERT INTO urls
			("userId", url, shortUrl)
			VALUES
			($1, $2, $3)
		`,
      [user.id, url, shortUrl]
    );

    res.status(201).send(shortUrl);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
