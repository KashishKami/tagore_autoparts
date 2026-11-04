<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer classes
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Load Mailer Config
if (file_exists(__DIR__ . '/mail_config.php')) {
    require_once __DIR__ . '/mail_config.php';
} else {
    require_once __DIR__ . '/mail_config.sample.php';
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Detect AJAX request
    $is_ajax = isset($_POST['is_ajax']) 
        || (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
        || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

    // Get and sanitize form data
    $name   = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email  = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $review = htmlspecialchars(trim($_POST['review'] ?? ''));
    $rating = htmlspecialchars(trim($_POST['rating'] ?? '5'));

    // Create email message
    $to = "tagorefusion@gmail.com";
    $subject = "New Review from Review Form - " . ($name ?: 'Customer');
    $body  = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Rating: $rating stars\n";
    $body .= "Review:\n$review\n";
    $body .= "Submitted At: " . date('Y-m-d H:i:s') . "\n";

    // Initialize PHPMailer
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom(SMTP_USER, 'Tagore AutoParts Customer Review');
        if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($email, $name ?: 'Customer');
        }
        $mail->addAddress($to);

        // Content
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $body;

        $mail->send();

        if ($is_ajax) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => true,
                'message' => 'Thank you for your review. We will get back to you shortly.'
            ]);
            exit;
        } else {
            echo "Thank you for your review. We will get back to you shortly.";
            header("refresh:3; url=index.html");
            exit;
        }
    } catch (Exception $e) {
        if ($is_ajax) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'message' => 'Sorry, there was an error sending your review. Please try again later.'
            ]);
            exit;
        } else {
            http_response_code(500);
            echo "Sorry, there was an error sending your review. Please try again later.";
            exit;
        }
    }
}
?>
