<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Coletar dados do formulário
    $nome = htmlspecialchars(trim($_POST["nome"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $mensagem = htmlspecialchars(trim($_POST["mensagem"]));

    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Email inválido.");
    }

    // Seu email de destino
    $destino = "William.m.c.flores@outlook.com.br";

    // Assunto do email
    $assunto = "Nova mensagem do portfólio";

    // Conteúdo do email
    $conteudo = "Você recebeu uma nova mensagem do seu site.\n\n";
    $conteudo .= "Nome: $nome\n";
    $conteudo .= "Email: $email\n\n";
    $conteudo .= "Mensagem:\n$mensagem\n";

    // Cabeçalhos
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviar email
    if (mail($destino, $assunto, $conteudo, $headers)) {

        // Redireciona com sucesso
        header("Location: index.html?status=enviado");
        exit();

    } else {

        // Redireciona com erro
        header("Location: index.html?status=erro");
        exit();

    }

}

?>