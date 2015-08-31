# AMP-Analytics: Azure Media Services Player Analytics with Google Analytics
<h2 id="introduction">Introduction</h2>
<p>Azure Media Player is a web video player built to playback media content from Microsoft Azure Media Services on a wide variety of browsers and devices. For more information you can review the <a href="http://amp.azure.net/libs/amp/latest/docs/">official documentation</a>.</p>
<p>When you publish any information on internet you want to have analytics about the usage of this content, to do this you can use <a href="https://www.google.com/analytics/web">Google Analytics</a>. The idea is measure final user watching time using client side information. For example this dashboard.</p>
<p><img src="https://raw.githubusercontent.com/liarjo/AMP-Analytics/master/img1.jpg" alt="" /></p>
<h2 id="the-code">The Code</h2>
<p>The code is an ASP.NET page but it can be implement in any language because, all the logics are wrote in JavaScript. The project has 2 configuration key in web.config</p>
<ol type="a">
<li><p>TrackingID: it is google Analytics ID</p></li>
<li><p>videoManifest: Video manifest URL.</p></li>
</ol>
<p>The code is base in AMP <a href="http://amp.azure.net/libs/amp/latest/samples/dynamic_registerEvents.html">Playback with event listeners</a> sample adding Analytics integration on each event, that’s means each player event will be logged on Analytics server. Additional of player event you will log the Play time in minutes on the server.</p>
<h2 id="to-test">To test</h2>
<p>Update Web.config file and run the project you will see something like this</p>
<p><img src="https://raw.githubusercontent.com/liarjo/AMP-Analytics/master/img2.jpg" alt="" /></p>
