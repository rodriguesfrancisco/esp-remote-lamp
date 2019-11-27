$(document).ready(function() {

    //Usuários autorizados a utilizar a aplicação
    //Put the authorized emails here
    const authorizedUsers = [''];

    var uid = null;
    //Executado quando o usário faz o login
    firebase.auth().onAuthStateChanged(function(user) {
        //Apenas autorizar os usuários permitidos
        if (user && authorizedUsers.includes(user.email)) {
            uid = user.id;

            //Inicializa o database do firebase
            var database = firebase.database();
            var ledStatus;

            //Verifica o banco de dados do firebase retornando os valores
            database.ref().on("value", function(snap) {

                //Verifica o valor do atributo ledStatus no banco de dados
                ledStatus = snap.val().ledStatus;

                //Controla as cores do texto o do botão
                if(ledStatus == 1) {
                    $(".lightStatus").text("THE LIGHT IS ON!").css("color", "#23967F");
                    $(".lightButton").text("TURN OFF").addClass("light-on");
                } else {
                    $(".lightStatus").text("THE LIGHT IS OFF!").css("color", "#E84855");
                    $(".lightButton").text("TURN ON").removeClass("light-on");
                }
            });

            //Acionado quando se clica no botão de ligar/desligar a luz
            $(".lightButton").click(function() {
                //Procura o atributo letStatus no banco de dados e guarda na variável
                var firebaseRef = firebase.database().ref().child("ledStatus");

                //Se o status da variável ledStatus na aplicação for 1, liga a luz usando a váriável
                //firebaseRef, caso contrário, desliga.
                if(ledStatus == 1) {
                    firebaseRef.set(0);
                    ledStatus = 0;
                } else {
                    firebaseRef.set(1);
                    ledStatus = 1;
                }
            })

            //chama o método logout quando clica no botão
            $(".logoutButton").click(logOut);
        } else {
            //Executado caso o usuário tente acessar a rota sem fazer o login
            uid = null;
            //Executado caso o usuário que logou não é permitido acessar a aplicação
            if(user && !authorizedUsers.includes(user.email)) {
                user = null;
                alert("Usuário não autorizado!");
            }
            //Redireciona o usuário de volta para a tela de login
            window.location.replace("index.html");
        }
    });    

    //Realiza o logout do usuário
    function logOut() {
        firebase.auth().signOut();
    }
});