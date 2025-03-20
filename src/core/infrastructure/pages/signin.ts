import ko from 'knockout'
import page from 'page'
import login from '../../application/userLogin'

class ViewModel {
    username:ko.Observable<string>
    password:ko.Observable<string>
    constructor(){
        this.username =  ko.observable('')
        this.password = ko.observable('')
    }
    login(){
        login(this.username(), this.password())
            .then(token=>{
                if(token){
                    localStorage.setItem('token', token)
                    page.redirect('/products')
                }
            })
    }
}

ko.components.register('loginPage',{
    template:`
    <div class="bg-gradient-login w-100 h-100 d-flex flex-column justify-content-between">
        <form class="form-signin w-100 mx-auto mt-3 d-flex flex-column" data-bind="submit: login">
            <img class="d-block mx-auto mb-4" src="./assets/LOGO1.png" alt="" width="140" height="80">
            <div class="rounded-2 bg-white mb-2">
                <div class="form-floating">                
                    <span class="input-group-text border-0" id="basic-addon2" >
                    <i class="bi bi-person-fill" style="color:#707070;"></i>                
                    <input type="text" class="form-control border-0" style="box-shadow:none;" id="floatingInput" placeholder="username" data-bind="value: username">
                    </span>
                </div>
                <div style="background:#888;width:100%;height:1px;"></div>
                <div class="form-floating">
                    <span class="input-group-text border-0" id="basic-addon2">
                        <i class="bi bi-lock-fill" style="color:#707070;"></i>
                        <input type="password" class="form-control border-0" style="box-shadow:none;" id="floatingPassword" placeholder="Password" data-bind="value: password">
                    </span>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="form-check text-start flex-grow-0">
                    <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                    <label class="form-check-label text-white" for="flexCheckDefault">
                        remember
                    </label>
                </div>
                <button class="btn btn-midnight-blue flex-grow-0" type="submit" >Log in</button>
            </div>
            </form>
            <p class="text-white text-center">web services your control</p>
    </div>
    <style>
    .form-signin {
        max-width: 330px;
        padding: 1rem;
    }
    .bg-gradient-login {
        background: linear-gradient(to bottom, rgb(25, 25, 90), #000);
    }
    .btn-midnight-blue:hover {
        background-color: rgb(25, 25, 112);
        border-color: rgb(25, 25, 112);
        color: #fff; 
    }
    .btn-midnight-blue {
        background-color: rgb(20, 20, 90);
        border-color: rgb(20, 20, 90);
        color: #fff;
    }
    </style>
    `,
    viewModel: ViewModel
})