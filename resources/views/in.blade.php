<!DOCTYPE HTML>
<html>

<head>
    <!-- META TAGS -->
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- STYLES -->
    <link href="{{ URL::asset('css/font-awesome.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ URL::asset('css/fullpage.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ URL::asset('css/style.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ URL::asset('css/chess.css') }}" rel="stylesheet" type="text/css">
    <!-- SITE TITLE -->
    <title>Home</title>
</head>

<body>

    <!-- AUDIO PLAYER -->
    <audio class="audio-player" autoplay loop>
	<source src="audio/song.mp3" type="audio/mpeg">
</audio>

    <!-- BACKGROUND CONTAINER -->
    <div class="bg-container snowy">
        <!-- GLASS BALL -->
        <div class="glass-ball rotate"></div>
        <!-- TOP LIGHT -->
        <div class="top-light"></div>
        <!-- PAGE CONTENT -->
        <div class="page-content">
            <div class="fullpage">
                <!-- HOME SECTION -->
                <div id="home" class="section active">
                    <!-- TITLE -->
                    <h1 class="snow-text">Coming Soon</h1>
                    <!-- COUNTER -->
                    <div class="snow-box">
                        <div class="countdown" data-date="December 25 2020 00:00:00"></div>
                    </div>
                </div>
                <!-- INFO SECTION -->
                <div id="info" class="section">
                    <div class="container">
                        <!-- INFO TEXT -->
                        <div class="shadow-box">
                            <h2>Let's play gobang</h2>
                            <canvas id="mycanv" width="800" height="800"></canvas>
                        </div>
                        <!-- SOCIAL ICONS -->
                        <ul class="social-icons">
                            <li><a href="#" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li><a href="#" title="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                            <li><a href="#" title="Google+"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                            <li><a href="#" title="Contact"><i class="fa fa-envelope" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SCRIPTS  -->
    <script type="text/javascript" src="{{ URL::asset('js/jquery.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/countdown.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/jquery.fullpage.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/three.canvas.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/snowy.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/script.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/chess.js') }}"></script>


</body>

</html>