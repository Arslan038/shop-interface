<template>
    <div class="footer">
        <div class="top">
            <div class="row px-3 py-2">
                <div class="col-2 col-md-1 logo">
                </div>
                <div class="col-3 col-md-3 text-center">
                    <p class="pt-3">Terms &amp; Conditions</p>
                </div>
                <div class="col-4 col-md-4 text-center pt-3">
                    <span class="pl-3">Francais</span>
                    <span class="pl-3">English</span>
                </div>
                <div class="col-12 col-md-4 text-center pt-3">
                    <ul>
                        <li><span>Follow Us</span></li>
                        <li><i class="fa fa-facebook pl-3"></i></li>
                        <li><i class="fa fa-twitter pl-3"></i></li>
                        <li><i class="fa fa-youtube pl-3"></i></li>
                        <li><i class="fa fa-linkedin pl-3"></i></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p>Copyright 2019 – MANICARDS – All rigths reserved</p>
        </div>
    </div>
</template>

<style scoped>
.logo {
    background: url('../assets/logo.png');
    background-size: 100% 100%;
    background-position: center;
    width: 100%;
    height: 50px;
}
.top {
    background: #000;
    color:#fff;
}
ul li {
    list-style-type: none;
    display: inline;
}
.bottom {
    background: gray;
    color: #fff;
    padding-left: 15px;
}
</style>