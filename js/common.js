const MODE_LOGIN = 6; // for login
const MODE_LOGOUT = 26; // for login
const MODE_GET_LOGGED_IN_USER = 27; // for login
const PHP_DOMAIN = "http://algorithmics.comp.nus.edu.sg/~onlinequiz/"; // changed to the main URL (03 Oct 2014)
var fbAccessToken = "";

// check status of facebook login
function fbStatusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // sync facebook session with server
        // Logged into your app and Facebook.
        FB.api('/me', function(response) {
            $('#login-link').html('Logout <b>' + response.name + '</b>');
        });
    } else {
        $('#login-link').text('Login');
    }
    fbAccessToken = response.authResponse.accessToken;
}

window.fbAsyncInit = function() {
    FB.init({
        // appId: '519543441523397', // Erin's
        appId: '512208288834370', // Steven's
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });

    // This function gets the state of the person visiting this page and can return one of three states to the callback you provide.  They can be:
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into your app or not.
    FB.getLoginStatus(function(response) {
        fbStatusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//surprise colour!
//Referenced to in  home.js and viz.js also
var colourArray = ["#52bc69", "#d65775"/*"#ed5a7d"*/, "#2ebbd1", "#d9513c", "#fec515", "#4b65ba", "#ff8a27", "#a7d41e"];
//green, pink, blue, red, yellow, indigo, orange, lime

function disableScroll() {
    $('html').css('overflow', 'hidden');
}

function enableScroll() {
    $('html').css('overflow', 'visible');
}

function getColours() {
    var generatedColours = new Array();
    while (generatedColours.length < 4) {
        var n = (Math.floor(Math.random() * colourArray.length));
        if ($.inArray(n, generatedColours) == -1) {
            generatedColours.push(n);
        }
    }
    return generatedColours;
}

function customAlert(msg) {
    $('#custom-alert p').html(msg);
    var m = -1 * ($('#custom-alert').outerHeight() / 2);
    $('#custom-alert').css('margin-top', m + 'px');
    $('#dark-overlay').fadeIn(function() {
        $('#custom-alert').fadeIn(function() {
            setTimeout(function() {
                $('#custom-alert').fadeOut(function() {
                    $('#dark-overlay').fadeOut();
                });
            }, 1000);
        });
    });
}

var generatedColours = getColours();
var surpriseColour = colourArray[generatedColours[0]];
var colourTheSecond = colourArray[generatedColours[1]];
var colourTheThird = colourArray[generatedColours[2]];
var colourTheFourth = colourArray[generatedColours[3]];

$(document).ready(function() {
    $('#login-link').click(function() {
        if ($('#login-link').text() == 'Login') {
            $('#login-overlay').fadeIn('fast');
            $('#login-overlay-content').show();
            disableScroll();
        } else {
            FB.logout(function(response) {
                fbStatusChangeCallback(response);
            });
        }
    });
    /*-------LOG IN AUTHENTICATION-------*/
    $('#login-overlay-content #login-go').click(function() {
        FB.login(function(response) {
            fbStatusChangeCallback(response);
            $('#login-overlay').fadeOut('fast');
            $('#login-overlay-content').hide();
        });
    });
    /*-------LOG IN CSS-------*/
    $('#login-id').focusin(function() {
        $(this).css('box-shadow', '0px 0px 3px ' + surpriseColour + ' inset');
        if ($(this).val() == "user id") {
            $(this).css('color', 'black');
            $(this).val("");
        }
    }).focusout(function() {
        $(this).css('box-shadow', '0px 0px 3px #929292 inset');
        if ($(this).val() == "") {
            $(this).css('color', '#aaa');
            $(this).val("user id");
        }
    });
    $('#login-pw').focusin(function() {
        $(this).css('box-shadow', '0px 0px 3px ' + surpriseColour + ' inset');
        if ($(this).val() == "password") {
            $(this).attr('type', 'password');
            $(this).css('color', 'black');
            $(this).val("");
        }
    }).focusout(function() {
        $(this).css('box-shadow', '0px 0px 3px #929292 inset');
        if ($(this).val() == "") {
            $(this).css('color', '#aaa');
            $(this).attr('type', 'text');
            $(this).val("password");
        }
    });
    $('#login-overlay').click(function() {
        $('#login-overlay').fadeOut('fast');
        enableScroll();
    });

    $('#login-overlay-content').click(function(event) {
        event.stopPropagation();
    });

    $('.right-links').css('background', surpriseColour);
    $('#login-go').css('background', surpriseColour);

    $('#about').html("<h4>About the project</h4><img class=\"close-overlay\" src=\"img/cross_white.png\" /><div class=\"content\"><p><strong><span style=\"line-height: 200%;\">Motivation</span></strong><br/><p>VisuAlgo was conceptualised in 2011 by Dr Steven Halim as a tool to help his students better understand data structures and algorithms, by allowing them to learn the basics on their own and at their own pace. VisuAlgo is like a 24/7 copy of himself. Together with some of his students from the National University of Singapore (see the 'Team'), a series of visualisations were developed and consolidated, from simple sorting algorithms to complex graph data structures and algorithms, and also string+geometry algorithms.</p><p>VisuAlgo contains many advanced algorithms that are discussed in Dr Steven Halim's book and beyond (Note: This 'Competitive Programming 3' book is co-authored with his brother Dr Felix Halim). At this point of time, some of these advanced algorithms visualization/animation can only be found in VisuAlgo. For example, in Graph Traversal visualization, we do not just discuss the standard Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms, but also their variants, e.g. the modifications of DFS for finding Articulation Points (Cut Vertex) and Bridges, Tarjan's and Kosaraju's DFS-like algorithms for finding Strongly Connected Components (SCCs) of a directed graph, and we also have feature to visualize the implication graph of a small 2-SAT(isfiablity) instance and check if the instance is satisfiable.</p><p>Though specifically designed for NUS students taking various data structure and algorithm classes (e.g. CS1010, CS1020, CS2010, CS2020, CS3230, and CS3233), as advocators of online learning, we hope that curious minds around the world will find these visualisations useful as well.</p>");

    // VisuAlgo was conceptualised in 2011 by Dr Steven Halim as a tool to help his students better understand data structures and algorithms, by allowing them to learn the basics on their own and at their own pace. Together with two of his students from the National University of Singapore, a series of visualisations were developed and consolidated, from simple sorting algorithms to complex graph data structures.</p><p>Though specifically designed for the use of NUS students taking various data structure and algorithm classes (CS1020, CS2010, CS2020, and CS3233), as advocators of online learning, we hope that curious minds around the world will find these visualisations useful as well.</p><p><strong><span style="line-height: 200%;">Ongoing developments</span></strong><br/>VisuAlgo is an ongoing project, and more complex visualisations are still being developed. Originally developed using HTML5 Canvas, we are currently redesigning the site to harness the power of Scalable Vector Graphics (SVG) instead. An automated testing system is also in the works.</p><p><strong><span style="line-height: 200%;">Publications</span></strong><br/>This work has been presented briefly at the CLI Workshop at the ACM ICPC World Finals 2012 (Poland, Warsaw) and at the <a href="http://www.mii.lt/olympiads_in_informatics/htm/INFOL099.htm" target="_blank">IOI Conference at IOI 2012</a> (Sirmione-Montichiari, Italy).</p></div>');

    $('#team').html('<h4>The team</h4><img class="close-overlay" src="img/cross_white.png" /><div class="content"><p><strong><span style="line-height: 200%;">Project leader</span></strong><br/><a href="http://www.comp.nus.edu.sg/~stevenha/"                         target="_blank">Dr Steven Halim</a>, Lecturer, SoC, NUS</p><p><strong><span style="line-height: 200%;">Initial Programmers</span></strong><br/><a href="http://zichun.i-xo.net/" target="_blank">Koh Zi Chun</a><br/><a href="http://roticv.rantx.com/" target="_blank">Victor Loh Bo Huai</a></p><p><strong><span style="line-height: 200%;">Past Final Year Project students</span></strong><br/>Phan Thi Quynh Trang (2012/13)<br/>Peter Phandi (2012/13)<br/>Albert Millardo Tjindradinata (2012/13)<br/>Nguyen Hoang Duy (2012/13)</br><a href="http://www.rosemarietan.com/" target="_blank">Rose Marie Tan Zhao Yun (2013/14)</a><br/><a href="http://sg.linkedin.com/pub/ivan-reinaldo/3b/4b9/200/" target="_blank">Ivan Reinaldo (2013/14)</a><p><strong><span style="line-height: 200%;">Old to New Conversion Project students</span></strong><br/>Steven Kester Yuwono, Nathan Azaria, Nguyen Viet Dung, Jonathan Irvin Gunawan, Cao Shengze, Ian Leow Tze Wei, Nguyen Khac Tung, Mohan Jishnu</p><p><strong><span style="line-height: 200%;">Present UROP/Final Year Project students</span></strong><br/>Wang Zi (2014/15)<br>Erin Teo Yi Ling (2014/15)</p><p><strong><span style="line-height: 200%;">Advisor</span></strong><br/><a href="http://felix-halim.net/"                            target="_blank">Felix Halim</a></p></div>');

    $('#termsofuse').html('<h4>Terms of use</h4><img class="close-overlay" src="img/cross_white.png" /><div class="content"><p>If you are a data structure and algorithm teacher, you are allowed to use this website (http://visualgo.net) for your classes. You can take screen shots from this website and use the screen shots elsewhere as long as you cite this website as a reference.</p><!--I think we need a better copyright/terms of use statement--></div>');

    $('.colour').css("color", surpriseColour); //name
    $('h4').css("background-color", surpriseColour); //about, contact us etc. button background

    //title
    $('#title a').click(function() {
        $('#title a').removeClass('selected-viz');
        $(this).addClass('selected-viz');
    });

    //overlays stuff
    $('#trigger-about').click(function() {
        $('#dark-overlay').fadeIn(function() {
            $('#about').fadeIn();
        });
    });
    $('#trigger-team').click(function() {
        $('#dark-overlay').fadeIn(function() {
            $('#team').fadeIn();
        });
    });
    $('#trigger-terms').click(function() {
        $('#dark-overlay').fadeIn(function() {
            $('#termsofuse').fadeIn();
        });
    });

    $('.close-overlay').click(function() {
        $('.overlays').fadeOut(function() {
            $('#dark-overlay').fadeOut();
        });
    });

    $('#dark-overlay').click(function() {
        $('.overlays').fadeOut();
        $('#dark-overlay').fadeOut();
    });
});
