import http from "../http_common";
class AuthService {

    register(data) {
        return http.post("api/acount/register", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    login(data) {
        return http.post("api/acount/login", data);
    }

}

export default new AuthService();