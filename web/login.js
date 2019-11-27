//Objeto de configuração da interface gráfica do componente de login
var ui = new firebaseui.auth.AuthUI(firebase.auth());

//Objeto de configuração do login do firebase
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
        },
        uiShown: function() {
            document.getElementById('loader').style.display = 'none';
        }
    },    
    signInSuccessUrl: 'main.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID          
    ],    
    tosUrl: 'main.html'
};

//Adiciona o componente gráfico na div com o id firebaseui-auth-container
ui.start('#firebaseui-auth-container', uiConfig);