<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ampAnalytics._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Azure Media Player</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--*****START OF Azure Media Player Scripts*****-->
    <!--Note: DO NOT USE the "latest" folder in production. Replace "latest" with a version number like "1.0.0"-->
    <!--EX:<script src="//amp.azure.net/libs/amp/1.0.0/azuremediaplayer.min.js"></script>-->
    <!--Azure Media Player versions can be queried from //amp.azure.net/libs/amp/latest/docs/changelog.html-->
    <script src="//amp.azure.net/libs/amp/latest/azuremediaplayer.min.js"></script>
    <link href="//amp.azure.net/libs/amp/latest/skins/amp-default/azuremediaplayer.min.css" rel="stylesheet">
    <!--*****END OF Azure Media Player Scripts*****-->
    <script src="myAnalytics.js"></script>
</head>
<body style="margin:0px">
    <h1>Sample: Logging Events and Google Analytics</h1>
    <video id="azuremediaplayer" class="azuremediaplayer amp-default-skin amp-big-play-centered" tabindex="0"></video>
    <textarea id="techLog" style="width:640px" rows="10"></textarea>
    <br />
    <textarea id="txtLog" style="width:640px" rows="10"></textarea>

    <script>
      //Google Analytics
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', '<%= this._TrackingID%>', 'auto');
    ga('send', 'pageview');


    // URL Streaming
    var videoManifest = "<%=this._videoManifest%>";

        var myOptions = {
            "nativeControlsForTouch": false,
            autoplay: true,
            controls: true,
            width: "640",
            height: "400",
            poster: ""
        };

        var myPlayer = amp("azuremediaplayer", myOptions, function () {
            //'this' refers to the player instance in the ready function
        });

        //Setup all Player Events
        setupEvents(myPlayer);
        //Load Video on player       
        myPlayer.src([{ src: videoManifest, type: "application/vnd.ms-sstr+xml" }, ]);
        //Show Client info
        document.getElementById("techLog").innerText = "user-agent: " + navigator.userAgent + "\n\n" + "tech:       " + myPlayer.currentTechName() + "\n\n" + "mime:       " + myPlayer.currentType();

    </script>
    <br />
    <label id="lPlayTime"></label>
    <footer>
        <br />
        <p>©Sample</p>
    </footer>
</body>
    </html>