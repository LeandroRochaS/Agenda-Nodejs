const validador = require('validator');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const LoginShema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}

});

const LoginModel = mongoose.model('Login', LoginShema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;

    }

    async login() {
        this.valida();
        if(this.erros.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.erros.push('Usuário não existe.');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.erros.push('Senha inválida');
            this.user = null;
            return;
        }

    }

    cleanUp(){
        for(const key in this.body){
            if (typeof this.body[key] != 'string') {
                this.body[key] = '';
            }

        };

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

     async register(){
        this.valida();
        if(this.erros.length > 0) return;

        await this.userExists();

        if(this.erros.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    valida() {
        this.cleanUp();

        if(!validador.isEmail(this.body.email)) this.erros.push('E-mail inválido');
    
        if(this.body.password.length < 6 || this.body.password.length >= 50) this.erros.push('A senha precisa ter entre 6 e 50 caracteres.');
    
    }

    async userExists () {
        const user = await LoginModel.findOne({ email: this.body.email });
        if(user) this.erros.push('Usuário já existe.');
    }

}

module.exports = Login;