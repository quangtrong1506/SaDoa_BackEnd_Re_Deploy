import {generateConfirmUrl, hashHmacString} from "../Common/helper.js";
import {DEFAULT_PASWORD} from "../../config/constant.js";
import UserRepository from "../Repositories/UserRepository.js";
import EmailService from "./EmailService.js";

class UserService {
    static userRepository = new UserRepository();
    static emailService = new EmailService();

    async storeUser (data) {
        const result = {
            isSuccess: true,
        };

        try {
            data.password = hashHmacString(DEFAULT_PASWORD);
            const insertedUser = await UserService.userRepository.store(data);
            UserService.emailService.sendMail(
                [data.email],
                'Confirm Account Base Admin',
                'email/confirmAccount.ejs',
                {
                    name: data.name,
                    confirmUrl: generateConfirmUrl(insertedUser.id)
                }
            );
            result.user = insertedUser;
        } catch (e) {
            result.isSuccess = false;
            result.error = e;
        }

        return result;
    }
}

export default UserService;