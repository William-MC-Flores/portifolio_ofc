<?php

error_reporting(0);

// ============================
// IMPORTS
// ============================
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

// ============================
// CAPTURA DOS DADOS
// ============================
$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');

// ============================
// VALIDAÇÃO
// ============================
if (!$nome || !$email || !$mensagem) {
    echo "Preencha todos os campos!";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email inválido!";
    exit;
}

if (strlen($mensagem) > 1000) {
    echo "Mensagem muito longa!";
    exit;
}

// ============================
// ENVIO
// ============================
$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = 'will.m.c.flores@gmail.com';
    $mail->Password = 'sxro qajc qxlh exzb';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->Timeout = 10;
    $mail->SMTPKeepAlive = false;

    $mail->CharSet = 'UTF-8';

    // ============================
    // REMETENTE
    // ============================
    $mail->setFrom('will.m.c.flores@gmail.com', 'Portfólio');
    $mail->addAddress('will.m.c.flores@gmail.com');

    // responde direto pro usuário
    $mail->addReplyTo($email, $nome);

    // ============================
    // CONTEÚDO
    // ============================
    $mail->isHTML(true);
    $mail->Subject = 'Contato do Portfólio';

    $mail->Body = "
        <h2>Nova mensagem do site</h2>
        <p><b>Nome:</b> " . htmlspecialchars($nome) . "</p>
        <p><b>Email:</b> " . htmlspecialchars($email) . "</p>
        <p><b>Mensagem:</b><br>" . nl2br(htmlspecialchars($mensagem)) . "</p>
    ";

    // versão texto (boa prática)
    $mail->AltBody = "Nome: $nome\nEmail: $email\nMensagem:\n$mensagem";

    // ============================
    // ENVIO
    // ============================
    $mail->send();

    echo "Mensagem enviada com sucesso!";
} catch (Exception $e) {
    echo "Erro ao enviar mensagem. Tente novamente.";
}
