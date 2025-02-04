const iptFriends = document.querySelector("#ipt-participantes");
const btnAddFriend = document.querySelector(".add-friend");
const friendList = document.querySelector(".friend-list");
const resultBox = document.querySelector(".result-box");
const resultBtnProximo = document.querySelector('.next');
const resultBtnAnterior = document.querySelector('.anterior');
const resultNomeAmigo = document.querySelector('.result-friend');
const resultNomeSorteio = document.querySelector('.result-sorteio') 

let friends = []; //lista dos participantes
let sorteio = []; //armazena resultado do sorteio
let indexAtual = 0; //vou usar isso depois para exibir o resultado do sorteio


function updateList(){
    friendList.innerHTML = " ";
    
    for (friend of friends) {
        let friendItem = friendList.appendChild(document.createElement("div"));
        const divFriendbtns = `<button class='btnFriend' id='remove' onclick='removeFriend("${friend}")'></button>`;
        friendItem.className = "friend-item";
        friendItem.id = friend;
        friendItem.innerHTML = friend + divFriendbtns;
    }
}

function addFriend() {
    const friendName = iptFriends.value.trim();

    if (friendName === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }
    if (friends.includes(friendName)) {
        alert("Esse amigo já foi adicionado!");
        return;
    }

    friends.push(friendName);
    updateList();
    iptFriends.value = "";
}

function removeFriend(friendToRemove){
    //atualiza o array excluindo o amigo a ser removido
    friends = friends.filter(friend => friend !== friendToRemove);
    console.log(friends);
    updateList();
}

function generateRandomNum(limite){
    // gera um numero aleatorio com base no numero dos participantes
    return Math.floor(Math.random() * limite);
}

function sortear(){
    sorteio = [];
    const numParticipantes = friends.length;

    for (friend of friends){
        let indexFriend = friends.indexOf(friend); 
        let randomNum;
        do {              
            if ((indexFriend + 1) == numParticipantes && !sorteio.includes(indexFriend)){
                console.log(sorteio[0]);
                // para evitar um loop infinito, troca-se o numero do ultimo com o primeiro
                randomNum = sorteio[0];
                sorteio.splice(0, 1, indexFriend);
                console.log(sorteio[0]);
                break;
            }
            randomNum = generateRandomNum(numParticipantes);
        } while (
            randomNum === indexFriend || sorteio.includes(randomNum)
        )
        sorteio.push(randomNum);
    }
    // console.log(sorteio);
    
    exibirResultado(3)
}

function exibirResultado(indexAtual){
    const numParticipantes = friends.length;

    if (numParticipantes == 0){
        //previne exibir um resultado vazio caso eu tenha esquecido algo
        window.alert("Ocorreu um erro! Tente inserir os participantes novamente");
        return;
    }
    resultNomeAmigo.innerHTML = friends[indexAtual];
    resultNomeSorteio.innerHTML = friends[sorteio[indexAtual]];
    if (indexAtual == 0){
        resultBtnAnterior.classList.add('hidden');
        return;
    }   
    if (indexAtual+1 == numParticipantes){
        resultBtnProximo.classList.add('hidden');
        return;
    }
}
