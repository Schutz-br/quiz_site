document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const login = document.querySelector("#login").value;
    const senha = document.querySelector("#senha").value;

    try {
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || "Usuário/e-mail ou senha incorretos!");
            return;
        }

        // Guardamos só os dados da sessão no localStorage (não a lista de usuários/senhas)
        localStorage.setItem("usuarioLogado", JSON.stringify({
            id: dados.id,
            user: dados.user,
            tipo: dados.tipo,
            logadoEm: Date.now()
        }));

        window.location.href = "index.html";
    } catch (erro) {
        alert("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
        console.error(erro);
    }
});
