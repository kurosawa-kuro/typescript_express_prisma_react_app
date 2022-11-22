import { User, createUserService, readUsersService, readUserService, updateUserService, deleteUserService } from "../../services/userService";
import { registerUserService, loginUserService } from "../../services/authService";

async function main() {
    // userServiceStart()
    authServiceStart()
}

async function userServiceStart() {
    // C
    await createUserService({
        name: 'aaa', email: 'aaa@aaa.aaa', password: 'aaa@aaa.aaa'
    });

    // R
    const user = await readUsersService();
    console.log({ user })

    // U
    const id = user[0].id
    const updateUser = await updateUserService(id, {
        name: 'bbb', email: 'bbb@bbb.bbb'
    });
    console.log({ updateUser })

    // D
    await deleteUserService(id);
}

async function authServiceStart() {
    // const random = Math.random()
    // const registerUser = await registerUserService({ name: 'aaa', email: `${random}@email.com`, password: 'aaa@aaa.aaa' })
    // // const registerUser = await registerUserService({ name: 'aaa', email: `aaa@email.com`, password: 'aaa@aaa.aaa' })
    // console.log({ registerUser })

    const signinedUser = await loginUserService({
        email: `aaa@email.com`, password: 'aaa@aaa.aaa',
    })
    console.log({ signinedUser })
}

main()