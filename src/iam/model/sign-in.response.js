export class SignInResponse {
    constructor(id, email, username, token) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.token = token;
    }
}