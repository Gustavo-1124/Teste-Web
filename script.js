const oficinas = [
    {
        nome: "Introdução à Robótica",
        preco: 30,
        horario: "08:00",
        vagas: 20,
        imagem: "img/robotica.png"
    },
    {
        nome: "Criação de Jogos com JavaScript",
        preco: 45,
        horario: "09:00",
        vagas: 15,
        imagem: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    },
    {
        nome: "Primeiros Passos com Arduino",
        preco: 40,
        horario: "10:00",
        vagas: 18,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN3MmdxvMc6PPcqdQvbTvpZU1dGXPF48Rn9oKpqOwpHA&s=10"
    },
    {
        nome: "Design de Interfaces no Figma",
        preco: 25,
        horario: "13:00",
        vagas: 25,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdiHNE-OqbWYaeouK47-eWrfSI7oP5oRV9YPKiWnInVA&s=10"
    },
    {
        nome: "Segurança na Internet",
        preco: 20,
        horario: "14:00",
        vagas: 30,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUf5dJ9z3F7Lk8HvdTHQmX2EucZkzbvvOu2FBecQ6Aw&s=10"
    },
    {
        nome: "Introdução à Inteligência Artificial",
        preco: 50,
        horario: "15:00",
        vagas: 20,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5ADwqK7ZRflK1uoEbcm1VKPexA3HJjpmJlFU-So-0g&s=10"
    },
    {
        nome: "Desenvolvimento de Aplicativos",
        preco: 55,
        horario: "16:00",
        vagas: 15,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBiaiXRPBoMFLBFbgw8S18V89DwMjKXZlKA39tOXfRuw&s=10"
    },
    {
        nome: "Criação de Sites Responsivos",
        preco: 35,
        horario: "17:00",
        vagas: 25,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO71zmGypsXqLZ8idCq1DhTGptDHbtJmwyte2XSyf8UQ&s=10"
    }
];

const container = document.getElementById("oficinas");
const busca = document.getElementById("busca");
const ordenacao = document.getElementById("ordenacao");
const contador = document.getElementById("contador");

function mostrarOficinas(lista) {
    if (!container) return;

    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = '<div class="mensagem">Nenhuma oficina encontrada.</div>';
        return;
    }

    lista.forEach(function(oficina) {
        container.innerHTML += `
            <div class="card">
                <img src="${oficina.imagem}" alt="${oficina.nome}">
                <div class="card-conteudo">
                    <h3>${oficina.nome}</h3>
                    <p class="informacao">Horário: ${oficina.horario}</p>
                    <p class="informacao">Vagas: ${oficina.vagas}</p>
                    <p class="preco">R$ ${oficina.preco.toFixed(2).replace(".", ",")}</p>
                    <button class="botao" onclick="inscrever('${oficina.nome}')">Inscrever-se</button>
                </div>
            </div>
        `;
    });
}

function inscrever(nome) {
    let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];

    const oficina = oficinas.find(function(oficina) {
        return oficina.nome === nome;
    });

    const jaExiste = inscricoes.some(function(oficina) {
        return oficina.nome === nome;
    });

    if (jaExiste) {
        alert("Você já está inscrito nesta oficina.");
        return;
    }

    inscricoes.push(oficina);
    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));

    alert("Oficina adicionada!");
    atualizarContador();
}

function atualizarContador() {
    if (!contador) return;

    let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
    contador.textContent = inscricoes.length;
}

function ordenarEExibir(lista) {
    if (!ordenacao) return;

    if (ordenacao.value === "menor") {
        lista.sort(function(a, b) {
            return a.preco - b.preco;
        });
    }

    if (ordenacao.value === "maior") {
        lista.sort(function(a, b) {
            return b.preco - a.preco;
        });
    }

    mostrarOficinas(lista);
}

if (busca) {
    busca.addEventListener("input", function() {
        const texto = busca.value.toLowerCase();

        const resultado = oficinas.filter(function(oficina) {
            return oficina.nome.toLowerCase().includes(texto);
        });

        ordenarEExibir(resultado);
    });
}

if (ordenacao) {
    ordenacao.addEventListener("change", function() {
        const texto = busca.value.toLowerCase();

        const resultado = oficinas.filter(function(oficina) {
            return oficina.nome.toLowerCase().includes(texto);
        });

        ordenarEExibir(resultado);
    });
}

const imagensSlider = document.querySelector(".imagens-slider");
const botaoProximo = document.querySelector("#proximo");
const botaoAnterior = document.querySelector("#anterior");

if (imagensSlider && botaoProximo && botaoAnterior) {
    let posicao = 0;
    const totalImagens = 4;
    const larguraImagem = 600;

    botaoAnterior.addEventListener("click", function() {
        if (posicao < 0) {
            posicao += larguraImagem;
            imagensSlider.style.transform = `translateX(${posicao}px)`;
        }
    });

    botaoProximo.addEventListener("click", function() {
        if (posicao > -(totalImagens - 1) * larguraImagem) {
            posicao -= larguraImagem;
            imagensSlider.style.transform = `translateX(${posicao}px)`;
        }
    });
}

let oficinaParaRemover = null;

function mostrarInscricoes() {
    const lista = document.getElementById("lista-inscricoes");
    const total = document.getElementById("total");

    if (!lista || !total) return;

    let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];

    lista.innerHTML = "";

    if (inscricoes.length === 0) {
        lista.innerHTML = '<div class="mensagem">Você ainda não possui nenhuma inscrição.</div>';

        total.innerHTML = `
            <p>Total de oficinas: 0</p>
            <strong>Total: R$ 0,00</strong>
        `;

        atualizarContador();
        return;
    }

    let valorTotal = 0;

    inscricoes.forEach(function(oficina, indice) {
        valorTotal += oficina.preco;

        lista.innerHTML += `
            <div class="inscricao">
                <div>
                    <h3>${oficina.nome}</h3>
                    <p>Horário: ${oficina.horario}</p>
                    <p>Valor: R$ ${oficina.preco.toFixed(2).replace(".", ",")}</p>
                </div>

                <button class="botao remover" onclick="abrirModal(${indice})">
                    Remover
                </button>
            </div>
        `;
    });

    total.innerHTML = `
        <p>Total de oficinas: ${inscricoes.length}</p>
        <strong>Total: R$ ${valorTotal.toFixed(2).replace(".", ",")}</strong>
    `;

    atualizarContador();
}

function abrirModal(indice) {
    oficinaParaRemover = indice;

    const modal = document.getElementById("modal-remocao");

    if (modal) {
        modal.classList.add("mostrar");
    }
}

function fecharModal() {
    const modal = document.getElementById("modal-remocao");

    if (modal) {
        modal.classList.remove("mostrar");
    }

    oficinaParaRemover = null;
}

function removerOficina() {
    if (oficinaParaRemover === null) return;

    let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];

    inscricoes.splice(oficinaParaRemover, 1);

    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));

    fecharModal();
    mostrarInscricoes();
}

const cancelarRemocao = document.getElementById("cancelar-remocao");
const confirmarRemocao = document.getElementById("confirmar-remocao");

if (cancelarRemocao) {
    cancelarRemocao.addEventListener("click", fecharModal);
}

if (confirmarRemocao) {
    confirmarRemocao.addEventListener("click", removerOficina);
}

const modalRemocao = document.getElementById("modal-remocao");

if (modalRemocao) {
    modalRemocao.addEventListener("click", function(event) {
        if (event.target === modalRemocao) {
            fecharModal();
        }
    });
}

const tema = document.getElementById("tema");

function carregarTema() {
    if (localStorage.getItem("tema") === "escuro") {
        document.body.classList.add("escuro");
    }
}

if (tema) {
    tema.addEventListener("click", function() {
        document.body.classList.toggle("escuro");

        if (document.body.classList.contains("escuro")) {
            localStorage.setItem("tema", "escuro");
        } else {
            localStorage.setItem("tema", "claro");
        }
    });
}

const menuBotao = document.getElementById("menu-botao");
const menu = document.getElementById("menu");

if (menuBotao && menu) {
    menuBotao.addEventListener("click", function() {
        menu.classList.toggle("mostrar-menu");
    });
}

const formConta = document.getElementById("form-conta");

function validarNome() {
    const nome = document.getElementById("nome");
    const mensagem = document.getElementById("nome-mensagem");

    if (!nome || !mensagem) return false;

    if (nome.value.trim().length >= 3 && nome.value.trim().includes(" ")) {
        mensagem.textContent = "Nome válido.";
        mensagem.className = "valido";
        return true;
    }

    mensagem.textContent = "Digite seu nome completo.";
    mensagem.className = "invalido";
    return false;
}

function validarEmail() {
    const email = document.getElementById("email");
    const mensagem = document.getElementById("email-mensagem");

    if (!email || !mensagem) return false;

    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formato.test(email.value)) {
        mensagem.textContent = "E-mail válido.";
        mensagem.className = "valido";
        return true;
    }

    mensagem.textContent = "Digite um e-mail válido.";
    mensagem.className = "invalido";
    return false;
}

function carregarDadosParticipante() {
    const dados = JSON.parse(localStorage.getItem("participante"));

    if (!dados) return;

    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("email").value = dados.email || "";
    document.getElementById("idade").value = dados.idade || "";
    document.getElementById("cidade").value = dados.cidade || "";
}

if (formConta) {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const mostrarSenha = document.getElementById("mostrar-senha");

    nome.addEventListener("input", validarNome);
    email.addEventListener("input", validarEmail);

    mostrarSenha.addEventListener("click", function() {
        if (senha.type === "password") {
            senha.type = "text";
            mostrarSenha.textContent = "Ocultar";
        } else {
            senha.type = "password";
            mostrarSenha.textContent = "Mostrar";
        }
    });

    formConta.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!validarNome() || !validarEmail()) {
            return;
        }

        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            idade: document.getElementById("idade").value,
            cidade: document.getElementById("cidade").value,
            senha: document.getElementById("senha").value
        };

        localStorage.setItem("participante", JSON.stringify(dados));

        document.getElementById("perfil-nome").textContent = dados.nome;
        document.getElementById("perfil-email").textContent = dados.email;
        document.getElementById("perfil-idade").textContent = dados.idade + " anos";
        document.getElementById("perfil-cidade").textContent = dados.cidade;

        const aviso = document.getElementById("aviso");

        aviso.classList.add("mostrar-aviso");

        setTimeout(function() {
            aviso.classList.remove("mostrar-aviso");
        }, 3000);
    });

    carregarDadosParticipante();

    const dadosSalvos = JSON.parse(localStorage.getItem("participante"));

    if (dadosSalvos) {
        document.getElementById("perfil-nome").textContent = dadosSalvos.nome;
        document.getElementById("perfil-email").textContent = dadosSalvos.email;
        document.getElementById("perfil-idade").textContent = dadosSalvos.idade + " anos";
        document.getElementById("perfil-cidade").textContent = dadosSalvos.cidade;

        validarNome();
        validarEmail();
    }
}

const imagemPrincipal = document.getElementById("imagem-principal");
const miniaturas = document.querySelectorAll(".miniaturas img");

if (imagemPrincipal) {
    miniaturas.forEach(function(imagem) {
        imagem.addEventListener("click", function() {
            imagemPrincipal.src = this.src;
        });
    });
}

carregarTema();
mostrarOficinas(oficinas);
atualizarContador();
mostrarInscricoes();