document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const user = document.querySelector("#user").value;
    const senha = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmarSenha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, user, senha, confirmarSenha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || "Erro ao cadastrar.");
            return;
        }

        alert(dados.mensagem);
        window.location.href = "login.html";
    } catch (erro) {
        alert("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
        console.error(erro);
    }
});
