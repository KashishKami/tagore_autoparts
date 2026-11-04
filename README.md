# Tagore AutoParts — Modern Source Codebase

Welcome to the **Tagore AutoParts** source repository! This project is built using [Astro](https://astro.build/) for high-performance static HTML generation, coupled with secure PHP mail handlers designed for Apache web servers (such as Hostinger).

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Local Setup Guide (Step-by-Step)](#-local-setup-guide-step-by-step)
3. [Configuring Sensitive Credentials (`mail_config.php`)](#-configuring-sensitive-credentials-mail_configphp)
4. [Available Scripts](#-available-scripts)
5. [Hostinger Deployment Guide](#-hostinger-deployment-guide)
6. [Project Architecture](#-project-architecture)

---

## 🛠 Prerequisites

Before starting, ensure you have:
* **Git** installed on your system.
* **Node.js** `>=22.12.0` (Recommended: latest LTS via `nvm`).
* **npm** `10.x` or newer.

---

## 🚀 Local Setup Guide (Step-by-Step)

Follow these exact steps to run the website on your local computer:

### 1. Clone the Repository
Open your terminal and clone the repository:
```bash
git clone <YOUR_GIT_REPOSITORY_URL>
cd tagore_autoparts_source
```

### 2. Install Node.js (via NVM)
We recommend using **NVM (Node Version Manager)** so you never run into permission errors or OS package conflicts:

```bash
# Install / activate NVM (if not already installed):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash
source ~/.bashrc

# Download and activate the latest stable Node LTS:
nvm install --lts
nvm use --lts

# Verify versions:
node -v   # Should output v22.x or v26.x
npm -v
```

### 3. Install Project Dependencies
Run npm install to download Astro and its build tools:
```bash
npm install
```

---

## 🔐 Configuring Sensitive Credentials (`mail_config.php`)

For security reasons, **passwords and live API keys are never committed to this repository**.

The PHP mail handlers (`checkout_process.php`, `contact_us.php`, `leads-form.php`, and `send_review.php`) require a private configuration file that is ignored by Git.

### How to set up your real credentials:

1. **Copy the sample configuration file:**
   ```bash
   cp public/mail_config.sample.php public/mail_config.php
   ```

2. **Open `public/mail_config.php` in your editor:**
   ```php
   <?php
   // Sensitive Mailer Credentials - Ignored by Git
   define('SMTP_USER', 'your_actual_gmail@gmail.com');
   define('SMTP_PASS', 'your_16_character_google_app_password');
   ```

3. **Save the file.** 
   > ⚠️ **Important:** Use a dedicated **Google App Password** (generated from Google Account Security settings), **not** your personal email account password.

---

## 💻 Available Scripts

Inside the project directory, you can run the following shortcut commands:

| Command | Description |
| :--- | :--- |
| `npm run dev` | **Starts the local development server** at `http://localhost:4321` with instant hot-reload. |
| `npm run build` | **Compiles the website** into optimized static HTML/CSS files inside the `./dist` folder. |
| `npm run preview` | **Locally previews the compiled `./dist` folder** so you can test the production output before uploading. |

---

## 🌐 Hostinger Deployment Guide

Hostinger uses standard Apache web servers with PHP support. Because our Astro project compiles to static HTML with `format: 'file'` and passes through PHP handlers untouched, deploying to Hostinger is seamless.

### Step 1: Build the Production Files Locally
In your terminal, run:
```bash
npm run build
```
Astro will compile all components and copy all static assets (`img/`, `fonts/`, `css/`, `js/`, `PHPMailer/`, `.htaccess`, and `.php` files) into the `./dist` directory.

### Step 2: Upload to Hostinger `public_html/`
You can upload the files using **Hostinger File Manager** (in hPanel) or via **FTP / FileZilla**:

1. Open your Hostinger **hPanel** and go to **File Manager** (or connect via FTP).
2. Navigate into the **`public_html`** root folder of your website.
3. Upload **everything inside the local `./dist/` folder** into `public_html/`:
   * All `.html` files (`index.html`, `about.html`, `checkout.html`, etc.)
   * All directories (`css/`, `js/`, `img/`, `fonts/`, `Front Banners/`, `PHPMailer/`)
   * All PHP handlers (`checkout_process.php`, `contact_us.php`, `leads-form.php`, `send_review.php`, `404.php`)
   * **Crucial:** Ensure the hidden **`.htaccess`** file is uploaded (enable "Show Hidden Files" in your FTP client / File Manager).
   * **Crucial:** Ensure your private **`mail_config.php`** is uploaded into `public_html/` so the forms can send email notifications.

### Step 3: Verify PHP Version in Hostinger
In your Hostinger hPanel:
* Go to **Advanced** > **PHP Configuration**.
* Ensure your website is running on **PHP 8.1** or **PHP 8.2** (or minimum PHP 7.4).

---

## 📁 Project Architecture

```text
tagore_autoparts_source/
├── astro.config.mjs          # Astro configuration (build.format: 'file')
├── package.json              # Project identity, dependencies & scripts
├── README.md                 # Setup & deployment documentation
│
├── public/                   # STATIC ASSETS (Copied directly into /dist untouched)
│   ├── .htaccess             # Apache server rewrites & 301 redirects
│   ├── mail_config.php       # Real SMTP credentials (IGNORED BY GIT)
│   ├── mail_config.sample.php# Template for SMTP credentials (TRACKED BY GIT)
│   ├── checkout_process.php  # Checkout form processor & email notifier
│   ├── contact_us.php        # Contact form handler
│   ├── leads-form.php        # Lead generation handler
│   ├── send_review.php       # Review submission handler
│   ├── PHPMailer/            # PHPMailer library
│   ├── img/                  # Logos, banners & automotive product images
│   ├── fonts/                # Custom web typography
│   └── css/                  # Global styles (core-style.css, site-polish.css)
│
└── src/                      # SOURCE CODE (Compiled by Astro)
    ├── components/           # Reusable UI Lego blocks (Header.astro, Footer.astro, etc.)
    ├── layouts/              # Master HTML frame (BaseLayout.astro)
    └── pages/                # Website pages (index.astro, about.astro, checkout.astro, etc.)
```

---

## 🔒 Security & Privacy Notice
* **Never commit `public/mail_config.php`** to Git.
* Check your `.gitignore` to ensure `node_modules/`, `dist/`, `.astro/`, and `mail_config.php` remain untracked.

