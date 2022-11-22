import { spawn } from "child_process";
import { PrismaClient } from "@prisma/client";

export default async function () {
    // if (process.env.NODE_ENV === "test") {
    await new Promise(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();
            // const deletePosts = prisma.post.deleteMany()
            // const deleteProfile = prisma.profile.deleteMany()
            const deleteUsers = prisma.user.deleteMany({})

            // The transaction runs synchronously so deleteUsers must run last.
            await prisma.$transaction([deleteUsers])

            resolve(0);
        } catch (error) {
            reject(0);
        }


        // child.on("close", (code) => {

        //     if (code === 0) {
        //         resolve(0);
        //     } else {
        //         reject(code);
        //     }
        // });
    });
    // }
}
