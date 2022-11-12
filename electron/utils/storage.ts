import fs from 'fs';

export default {
  async write(filename: string, payload: any) {
    try {
      await fs.writeFileSync(filename, JSON.stringify(payload), 'utf-8');
      return true;
    } catch (error: unknown) {
      return undefined;
    }
  },

  async read(filename: string) {
    try {
      if (await !fs.existsSync(filename)) {
        throw new Error(`${filename} doesn't exists`);
      }

      const json = await fs.readFileSync(filename);
      const data = JSON.parse(json.toString());

      return data;
    } catch (error) {
      return undefined;
    }
  },

  async remove(filename: string) {
    if (await !fs.existsSync(filename)) {
      throw new Error(`${filename} doesn't exists`);
    }

    try {
      await fs.unlinkSync(filename);
      return true;
    } catch (error) {
      return undefined;
    }
  },
};
