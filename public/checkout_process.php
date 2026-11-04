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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Detect AJAX request
    $is_ajax = isset($_POST['is_ajax']) 
        || (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
        || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

    // Get form data
    $year = $_POST['year'] ?? '';
    $makeModel = $_POST['Make&model'] ?? '';
    $productType = $_POST['product_type'] ?? '';
    $specification = $_POST['Specification'] ?? '';
    $vinNumber = $_POST['vin_number'] ?? '';
    $agentName = $_POST['agent_name'] ?? '';
    $milesByAgent = $_POST['miles_by_agent'] ?? '';
    $priceByAgent = $_POST['price_by_agent'] ?? '';
    $fullName = $_POST['firstname'] ?? '';
    $email = $_POST['email'] ?? '';
    $addressType = $_POST['address_type'] ?? '';
    $address = $_POST['address'] ?? '';
    $city = $_POST['city'] ?? '';
    $state = $_POST['state'] ?? '';
    $zip = $_POST['zip'] ?? '';
    $phoneNumber = $_POST['phone_number'] ?? '';
    $shopName = $_POST['shop_name'] ?? '';
    $liftGate = $_POST['lift_gate'] ?? '';
    $billingFullName = $_POST['billing_fullname'] ?? '';
    $billingAddress = $_POST['billing_address'] ?? '';
    $billingCity = $_POST['billing_city'] ?? '';
    $billingState = $_POST['billing_state'] ?? '';
    $billingZip = $_POST['billing_zip'] ?? '';
    $cardName = $_POST['cardname'] ?? '';
    $cardNumber = $_POST['cardnumber'] ?? '';
    $expMonth = $_POST['expmonth'] ?? '';
    $expYear = $_POST['expyear'] ?? '';
    $cvv = $_POST['cvv'] ?? '';
    $termsConditions = isset($_POST['terms_conditions']) ? "Agreed" : "Not Agreed";
    $messageBox = $_POST['message'] ?? '';

    // Create email message
    $to = "tagorefusion@gmail.com"; 
    $subject = "New Order Details";

    // Create the email message body with form data
    $message = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .email-header {
                background-color: rgb(23, 145, 12);
                color: #ffffff;
                padding: 20px;
                text-align: center;
                font-size: 24px;
            }
            .email-body {
                padding: 20px;
            }
            .email-body h3 {
                color: rgb(23, 145, 12);
                margin-bottom: 10px;
            }
            .email-body table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .email-body table th, .email-body table td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
            .email-body table th {
                background-color: #f1f1f1;
                font-weight: bold;
            }
            .email-footer {
                text-align: center;
                padding: 10px;
                background-color: #f1f1f1;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='email-header'>Order Details</div>
            <div class='email-body'>
                <h3>Part Information</h3>
                <table>
                    <tr><th>Year</th><td>$year</td></tr>
                    <tr><th>Make & Model</th><td>$makeModel</td></tr>
                    <tr><th>Product Type</th><td>$productType</td></tr>
                    <tr><th>Specification</th><td>$specification</td></tr>
                    <tr><th>VIN Number</th><td>$vinNumber</td></tr>
                    <tr><th>Agent Name/Extension</th><td>$agentName</td></tr>
                    <tr><th>Miles Given by Agent</th><td>$milesByAgent</td></tr>
                    <tr><th>Price Given by Agent</th><td style='font-weight: bold; color: #15803d;'>$priceByAgent</td></tr>
                </table>

                <h3>Shipping Address</h3>
                <table>
                    <tr><th>Full Name</th><td>$fullName</td></tr>
                    <tr><th>Email</th><td>$email</td></tr>
                    <tr><th>Address Type</th><td>$addressType</td></tr>
                    <tr><th>Address</th><td>$address</td></tr>
                    <tr><th>City</th><td>$city</td></tr>
                    <tr><th>State</th><td>$state</td></tr>
                    <tr><th>Zip Code</th><td>$zip</td></tr>
                    <tr><th>Phone Number</th><td>$phoneNumber</td></tr>
                    <tr><th>Shop Name</th><td>$shopName</td></tr>
                    <tr><th>Lift Gate Needed</th><td>$liftGate</td></tr>
                </table>

                <h3>Billing Address</h3>
                <table>
                    <tr><th>Full Name</th><td>$billingFullName</td></tr>
                    <tr><th>Address</th><td>$billingAddress</td></tr>
                    <tr><th>City</th><td>$billingCity</td></tr>
                    <tr><th>State</th><td>$billingState</td></tr>
                    <tr><th>Zip</th><td>$billingZip</td></tr>
                </table>

                <h3>Payment Details</h3>
                <table>
                    <tr><th>Card Name</th><td>$cardName</td></tr>
                    <tr><th>Card Number</th><td>$cardNumber</td></tr>
                    <tr><th>Expiration</th><td>$expMonth / $expYear</td></tr>
                    <tr><th>CVV</th><td>$cvv</td></tr>
                </table>

                <h3>Additional Information</h3>
                <p><strong>Terms and Conditions:</strong> $termsConditions</p>
                <p><strong>Message:</strong> $messageBox</p>
            </div>
            <div class='email-footer'>Thank you for your order. We appreciate your business!</div>
        </div>
    </body>
    </html>
    ";

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
        $mail->setFrom('tagorefusion@gmail.com', 'Tagore Autoparts Order Desk');
        if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($email, $fullName ?: 'Customer');
        }
        $mail->addAddress('tagorefusion@gmail.com');

        // Content
        $mail->isHTML(true);  
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();

        if ($is_ajax) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => true,
                'message' => 'Thank you for your order. We will contact you shortly.'
            ]);
            exit;
        } else {
            renderCheckoutConfirmationPage($fullName, $year, $makeModel, $productType, $phoneNumber, $email);
            exit;
        }
    } catch (Exception $e) {
        if ($is_ajax) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'message' => 'Sorry, there was an error processing your order. Please call us at +1-888-656-5933.'
            ]);
            exit;
        } else {
            renderCheckoutErrorPage();
            exit;
        }
    }
}

function renderCheckoutConfirmationPage($fullName, $year, $makeModel, $productType, $phoneNumber, $email) {
    $partInfo = htmlspecialchars(trim("$year $makeModel $productType") ?: 'Requested Part');
    $contactInfo = $phoneNumber ? htmlspecialchars($phoneNumber) : htmlspecialchars($email);
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Received | Tagore AutoParts</title>
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
        <h2 class="card-title">Order Details Received!</h2>
        <p class="card-desc">Thank you, <strong><?php echo htmlspecialchars($fullName ?: 'Customer'); ?></strong>! We have received your order details for <strong><?php echo $partInfo; ?></strong>.</p>
        <p class="card-subtext">Our order desk is reviewing your vehicle details and will contact you shortly at <strong><?php echo $contactInfo; ?></strong> to confirm order processing & shipping.</p>
        <div class="card-actions">
            <a href="tel:+18886565933" class="btn-call"><i class="fa fa-phone"></i> Call Order Desk: +1 (888) 656-5933</a>
            <a href="index.html" class="btn-home">Return to Home</a>
        </div>
        <div class="redirect-notice">Redirecting to home page in a few seconds...</div>
    </div>
</body>
</html>
    <?php
}

function renderCheckoutErrorPage() {
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Processing Order | Tagore AutoParts</title>
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
        <h2 class="card-title">Unable to Process Order</h2>
        <p class="card-subtext">Sorry, there was a temporary issue processing your order online. Please call our order desk directly for immediate assistance.</p>
        <div class="card-actions">
            <a href="tel:+18886565933" class="btn-call"><i class="fa fa-phone"></i> Call Order Desk: +1 (888) 656-5933</a>
            <a href="checkout.html" class="btn-home">Try Again</a>
        </div>
    </div>
</body>
</html>
    <?php
}
?>