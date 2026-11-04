<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="404 page tagore autoparts ">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow" />
    <meta name="keywords" content="Used Tranmissions Prices, Quality used Engine, turbo charging, turbo charged engine, turbo charger for car, turbo charger price, car engine turbocharger, turbocharger parts supplier, best quality Turbocharger, Quality used turbochager, Quality Used Transmissions, Engines For Sale Near Me, Transmissions For Sale Near Me, Used Transmissions For Sale, Cheap Used Transmissions, Used Transmissions With Warranty, Used Engines, Used Engines For Sale, Used Engine And Transmission, Quality Used Engines, Tranmissions Used, Used Transmissions, Used Engines And Transmissions, Best Used Engines Online, Low Miliage Engines, Where To Buy Used Transmissions, Certified Used Engines, Used Transmissions Cost, Quality Used Engines And Transmissions, Transmissions For Sale Used, Affordable Used Engines ">
    <meta name="author" content="tagoreautoparts">

    <!-- Title  -->
    <title>404</title>

    <!-- Favicon  -->
    <link rel="icon" href="img/core-img/favicon.jpg">

    <!-- Core Style CSS -->
    <link rel="stylesheet" href="css/core-style.css">
    
    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KS4SG8NK');</script>
    <!-- End Google Tag Manager -->

</head>

<body>

    <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KS4SG8NK"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    
    <!-- ##### Header Area Start ##### -->
    <header class="header_area">
        <div class="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            <!-- Classy Menu -->
            <nav class="classy-navbar" id="essenceNav">
                <!-- Logo -->
                <a class="nav-brand" href="index.html"><img src="img/core-img/logo.png" alt=""></a>
                <!-- Navbar Toggler -->
                <div class="classy-navbar-toggler">
                    <span class="navbarToggler"><span></span><span></span><span></span></span>
                </div>
                
                <!-- Menu -->
                <div class="classy-menu">
                    <!-- close btn -->
                    <div class="classycloseIcon">
                        <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                    </div>
                    <div class="classynav">
                       
                        <ul>
                            <li><a href="engines.html">Used Engine</a></li>
                        </ul>
                        <ul>
                            <li><a href="transmission.html">Used Transmission</a></li>
                        </ul>
                           <ul> <li><a href="shop.html">Shop</a></li> </ul>
                

                       <ul>
                            <li><a href="https://blog.tagoreautoparts.com">Blog</a></li>
                        </ul>
                       
                            <ul><li><a href="contact.html">Contact Us</a></li></ul>
                    </div>
                    <!-- Nav End -->
                </div>
            </nav>

            <!-- Header Meta Data -->
            <div class="header-meta d-flex clearfix justify-content-end">
                <!-- Search Area -->
                <div class="search-area">
                    <form action="shop.html" method="">                        <input type="search" name="search" id="headerSearch" placeholder="Type for search">
                        <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                </div>
              
                <!-- Cart Area -->
                <div class="cart-area">
                    <a href="#" id="essenceCartBtn"><img src="img/core-img/bag.svg" alt="Shop Cart"> <span>0</span></a>
                </div>
            </div>

        </div>
    </header>
    <!-- ##### Header Area End ##### -->

             <!-------------------------------------------------------------Right side code---------------------------------------->

             <div class="cart-bg-overlay"></div>
             <div class="right-side-cart-area">
               <div class="cart-button">
                  <a href="#" id="rightSideCart"><img src="img/core-img/bag.svg" alt=""> <span class="cart-count"></span></a>
                </div>
             <!-- Cart Container -->
                  <div class="cart-container" id="cartContainer">
                  <div class="cart-items" id="cartItems"></div>
                  <div class="cart-total" style="display: flex; flex-direction: column; align-items: center;">
                     <p style="text-align: center;">Total: <span id="cartTotal" style="font-weight: bold; color: #239636;">$0.00</span></p>
                 <a href="checkout.html" class="btn essence-btn">Check out</a>
                 </div>
              </div>
             </div>
 
          <!---------------------------------------------------------------End------------------------------------------------->

     <!--------------------------------------------pop-up------------------------------------------------------------------------------------------------------------>
<div id="popup" class="popup">
    <div class="popup-content">
        <span class="close-btn" id="close-btn">&times;</span>
        <div class="popup-banner">
            <h2> What are you waiting for?</h2>
            <p class="phone-number">Get in touch: <strong>+1 888 656 5933</strong></p>
            <blockquote> "Get Quality Used Engine & Transmission" </blockquote>
            <button class="call-button" onclick="window.location.href='tel:+18886565933'"> Call Now! </button>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const popup = document.getElementById('popup');
        const closeBtn = document.getElementById('close-btn');
        const pageName = window.location.pathname.split('/').pop(); // Get the current page name

        function showPopup() {
            popup.style.display = 'flex';
        }

        function hidePopup() {
            popup.style.display = 'none';
        }

        // Check if the popup has been shown for this page in the session
        const popupShown = sessionStorage.getItem(`popupShown_${pageName}`);

        // Show the popup if it hasn't been shown yet
        if (!popupShown) {
            setTimeout(showPopup, 9000); // 9000 milliseconds = 9 seconds
            sessionStorage.setItem(`popupShown_${pageName}`, 'true'); // Set the item for this page
        }

        // Close the popup when the close button is clicked
        closeBtn.addEventListener('click', function() {
            hidePopup();
        });

        // Optional: Close the popup if the user clicks outside of the popup content
        window.addEventListener('click', function(event) {
            if (event.target === popup) {
                hidePopup();
            }
        });
    });
</script>
<!--------------------------------------------pop-up end--------------------------------------------------------------------------------------------------->



<!--------------------------------------404 error----------------------------------------------->
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="error-template">
                    <h1>Oops!</h1>
                    <h2>404 Not Found</h2>
                    <div class="error-details">
                        Sorry, an error has occured, Requested page not found!
                    </div>
                    <br>
                    <br>
                    <div class="error-actions">
                        <a href="index.html" class="btn essence-btn">Take Me Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>


<!---------------------------------------------------------------End----------------------------------------------->


    <!-- ##### Footer Area Start ##### -->
    <footer class="footer_area clearfix">
        <div class="container">
            <div class="row">
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area d-flex mb-30">
                        <!-- Logo -->
                        <div class="footer-logo mr-50">
                            <a href="#"><img src="img/core-img/logo.png" alt=""></a>
                        </div>
                        <!-- Footer Menu -->
                        <div class="footer_menu">
                            <ul>
                                <li><a href="shop.html">Shop</a></li>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="contact.html">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area mb-30">
                        <ul class="footer_widget_menu">
                            <li><a href="order-status.html">Order Status</a></li>
                            <li><a href="payment-options.html">Payment Options</a></li>
                            <li><a href="shipping-and-delivery.html">Shipping and Delivery</a></li>
                            
                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
                            <li><a href="checkout.html">Pay Now</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="row align-items-end">
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area">
                        <div class="footer_heading mb-30">
                            <h6>Subscribe</h6>
                        </div>
                        <div class="subscribtion_form">
                            <form action="#" method="#">
                                <input type="email" name="mail" class="mail" placeholder="Your email here">
                                <button type="submit" class="submit"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area">
                        <div class="footer_social_area">
                            <div class="footer_contact_area">
                                <p>Contact us: +1 888-656-5933</p>
                                <p>Email: support@tagoreautoparts.com</p>
                            </div>
                            <a href="https://www.facebook.com/tagoreusedparts/" data-toggle="tooltip" data-placement="top" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="https://www.instagram.com/tagoreautoparts/" data-toggle="tooltip" data-placement="top" title="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                            <a href="https://twitter.com/tagoreautoparts" data-toggle="tooltip" data-placement="top" title="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="https://in.pinterest.com/tagoreautoparts/" data-toggle="tooltip" data-placement="top" title="Pinterest"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                            <a href="https://www.youtube.com/@tagoreautoparts" data-toggle="tooltip" data-placement="top" title="Youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-12 text-center">
                    <p>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
                    </p>
                </div>
            </div>
        </div>
    </footer>
    <!-- ##### Footer Area End ##### -->

    <!-- jQuery (Necessary for All JavaScript Plugins) -->
    <script src="js/jquery/jquery-2.2.4.min.js"></script>
    <!-- Popper js -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Plugins js -->
    <script src="js/plugins.js"></script>
    <!-- Classy Nav js -->
    <script src="js/classy-nav.min.js"></script>
    <!-- Active js -->
    <script src="js/active.js"></script>
    <!---------Add to cart------>
    <script src="js/cart.js"></script>

    
</body>

</html>