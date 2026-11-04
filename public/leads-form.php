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

    // Get and sanitize form data with safe fallbacks
    $name       = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email      = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone      = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $year       = htmlspecialchars(trim($_POST['year'] ?? ''));
    $make_model = htmlspecialchars(trim($_POST['make_model'] ?? trim(($_POST['make'] ?? '') . ' ' . ($_POST['model'] ?? ''))));
    $part       = htmlspecialchars(trim($_POST['part'] ?? ''));
    $opt_out    = isset($_POST['opt_out']) ? 'Yes' : 'No';
    $consent    = isset($_POST['consent']) ? 'Yes' : 'No';

    // Validation: Require either phone or email
    if (empty($phone) && empty($email)) {
        if ($is_ajax) {
            http_response_code(400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'message' => 'Please provide a valid phone number or email address.'
            ]);
            exit;
        } else {
            echo "Please provide a valid phone number or email address.";
            header("refresh:3; url=index.html");
            exit;
        }
    }

    // Create email message
    $to = "tagorefusion@gmail.com";
    $subject = "New Quote Request" . ($make_model ? " - $year $make_model ($part)" : "");
    $body  = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Year: $year\n";
    $body .= "Make & Model: $make_model\n";
    $body .= "Selected Part: $part\n";
    $body .= "Opt Out: $opt_out\n";
    $body .= "Consent to Text Messages: $consent\n";
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
        $mail->setFrom(SMTP_USER, 'Tagore AutoParts Leads');
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
                'message' => 'Thank you for your message. We will contact you shortly.'
            ]);
            exit;
        } else {
            renderQuoteConfirmationPage($name, $year, $make_model, $part, $phone, $email);
            exit;
        }
    } catch (Exception $e) {
        if ($is_ajax) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'message' => 'Sorry, there was an error processing your request. Please try calling us at +1-888-656-5933.'
            ]);
            exit;
        } else {
            renderQuoteErrorPage();
            exit;
        }
    }
}

function renderQuoteConfirmationPage($name, $year, $make_model, $part, $phone, $email) {
    $partInfo = htmlspecialchars(trim("$year $make_model $part") ?: 'Requested Part');
    $contactInfo = $phone ? htmlspecialchars($phone) : htmlspecialchars($email);
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Request Received | Tagore AutoParts</title>
    <link rel="icon" href="img/core-img/favicon.jpg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/site-polish.css">
    <meta http-equiv="refresh" content="6;url=index.html">
    <style>
        body {
            margin: 0;
            padding: 24px 16px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0f172a;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            box-sizing: border-box;
        }
        .confirmation-card {
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
            max-width: 500px;
            width: 100%;
            padding: 40px 30px;
            text-align: center;
            box-sizing: border-box;
            animation: modalPopIn 0.3s ease-out;
        }
        @keyframes modalPopIn {
            from { opacity: 0; transform: scale(0.92) translateY(12px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .card-icon {
            width: 68px;
            height: 68px;
            background: #ecfdf5;
            color: #059669;
            border: 2px solid #10b981;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin: 0 auto 20px auto;
        }
        .card-title {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 12px 0;
        }
        .card-desc {
            font-size: 15px;
            color: #334155;
            margin: 0 0 10px 0;
            line-height: 1.5;
        }
        .card-desc strong {
            color: #b71c1b;
        }
        .card-subtext {
            font-size: 13.5px;
            color: #64748b;
            margin: 0 0 26px 0;
            line-height: 1.5;
        }
        .card-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .btn-call {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #b71c1b;
            color: #ffffff !important;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
            padding: 13px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 14px rgba(183, 28, 27, 0.35);
            transition: background 0.2s;
        }
        .btn-call:hover {
            background: #991b1b;
        }
        .btn-home {
            background: #f1f5f9;
            color: #475569 !important;
            text-decoration: none;
            border: 1px solid #cbd5e1;
            font-weight: 600;
            font-size: 14px;
            padding: 11px 20px;
            border-radius: 8px;
            transition: background 0.15s;
        }
        .btn-home:hover {
            background: #e2e8f0;
            color: #0f172a !important;
        }
        .redirect-notice {
            margin-top: 22px;
            font-size: 12px;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="confirmation-card">
        <div class="card-icon"><i class="fa fa-check"></i></div>
        <h2 class="card-title">Quote Request Received!</h2>
        <p class="card-desc">We are checking nationwide salvage inventory for your <strong><?php echo $partInfo; ?></strong>.</p>
        <p class="card-subtext">Our automotive parts specialist will call or text you shortly at <strong><?php echo $contactInfo; ?></strong> with pricing and warranty options.</p>
        <div class="card-actions">
            <a href="tel:+18886565933" class="btn-call"><i class="fa fa-phone"></i> Call Now: +1 (888) 656-5933</a>
            <a href="index.html" class="btn-home">Return to Home</a>
        </div>
        <div class="redirect-notice">Redirecting to home page in a few seconds...</div>
    </div>
</body>
</html>
    <?php
}

function renderQuoteErrorPage() {
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Processing Request | Tagore AutoParts</title>
    <link rel="icon" href="img/core-img/favicon.jpg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/site-polish.css">
    <style>
        body {
            margin: 0;
            padding: 24px 16px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0f172a;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            box-sizing: border-box;
        }
        .confirmation-card {
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
            max-width: 500px;
            width: 100%;
            padding: 40px 30px;
            text-align: center;
            box-sizing: border-box;
        }
        .card-icon {
            width: 68px;
            height: 68px;
            background: #fef2f2;
            color: #dc2626;
            border: 2px solid #ef4444;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin: 0 auto 20px auto;
        }
        .card-title {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 12px 0;
        }
        .card-subtext {
            font-size: 14px;
            color: #64748b;
            margin: 0 0 26px 0;
            line-height: 1.5;
        }
        .card-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .btn-call {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #b71c1b;
            color: #ffffff !important;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
            padding: 13px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 14px rgba(183, 28, 27, 0.35);
        }
        .btn-home {
            background: #f1f5f9;
            color: #475569 !important;
            text-decoration: none;
            border: 1px solid #cbd5e1;
            font-weight: 600;
            font-size: 14px;
            padding: 11px 20px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="confirmation-card">
        <div class="card-icon"><i class="fa fa-exclamation-triangle"></i></div>
        <h2 class="card-title">Unable to Process Request</h2>
        <p class="card-subtext">Sorry, there was a temporary issue submitting your quote request online. Please call us directly for an immediate quote.</p>
        <div class="card-actions">
            <a href="tel:+18886565933" class="btn-call"><i class="fa fa-phone"></i> Call Now: +1 (888) 656-5933</a>
            <a href="index.html" class="btn-home">Try Again</a>
        </div>
    </div>
</body>
</html>
    <?php
}
?>