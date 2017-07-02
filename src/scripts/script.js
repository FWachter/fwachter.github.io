/*
PROGRAMMER: Frederick Wachter
DATE CREATED: 2016-04-13
PURPOSE: Engineering Portfolio of Frederick Wachter
CONTACT INFO: wachterfreddy@gmail.com
*/

/* -------------------- ---------------------- -------------------- */
/* -------------------- User Defined Variables -------------------- */
/* -------------------- ---------------------- -------------------- */
var pageNames = ["Home", "About Me", "Engineering Experience", "Project Experience", "Contact Me"];

/* -------------------- ---------------- -------------------- */
/* -------------------- Static Variables -------------------- */
/* -------------------- ---------------- -------------------- */
var pageIndex = 0; // indicated the current page of the user
var totalPages = $(".footerButton").length; // indicates the amount of available pages on the webpage
var sidebarDisplayFlag = 1; // indicates if the sidebar should be displayed
var pageTwoScrollFlag = 0; // indicates if the scrollbar is active on the second page
var resumeButtonDisplayFlag = 1; // indicates if the sidebar should be displayed
var sidebarDisplayTolerance = 30; // tolerance to decide to display sidebar or not

var platformIndexAdjust = $("#contentPage1").children().length - $(".platform").length - 1; // Adjustment to platform index
var jobIndexAdjust = $("#contentPage2").children().length - $(".job").length - 1; // Adjustment to job index
var projectIndexAdjust = $("#contentPage3").children().length - $(".project").length - 1; // Adjustment to project index

/* -------------------- ------------- -------------------- */
/* -------------------- Window Resize -------------------- */
/* -------------------- ------------- -------------------- */
windowResize();

$(window).resize(function() {windowResize();});
function windowResize() {
	var windowWidth  = $(window).width();
	var windowHeight = $(window).height();

	$("#intro").css({
		"height":windowHeight + "px"
	});
	$(".page").css({
		"width":windowWidth + "px",
		"height":windowHeight + "px"
	});
	$("#logo").css({
		"top":(windowHeight / 2) + "px",
		"left":(windowWidth / 2) + "px" 
	});

	if ((resumeButtonDisplayFlag) && (windowWidth < 875)) {
		$("#resumeButton").addClass("hidden");
		resumeButtonDisplayFlag = 0;
	} else if ((!resumeButtonDisplayFlag) && windowWidth >= 875) { 
		$("#resumeButton").removeClass("hidden");
		resumeButtonDisplayFlag = 1;	
	}

	if ((windowHeight < 800) && (pageTwoScrollFlag == 0)) {
		$("#tint1").addClass("scroll");
		pageTwoScrollFlag = 1;
	} else if ((windowHeight > 800) && (pageTwoScrollFlag == 1)) {
		$("#tint1").removeClass("scroll");
		pageTwoScrollFlag = 0;
	}

	var lastJob = $(".job").eq($(".job").length-1);
	var jobBottomPosition = lastJob.offset().top + lastJob.height();
	if ((windowHeight - jobBottomPosition - 200) < 0) {
		$("#page2").addClass("scroll");
	}

	offsetPages(pageIndex,windowWidth);
	setIconLocation(null,pageIndex,1);
	adjustVideoSize_Page1(windowWidth);
}

/* -------------------- -------- -------------------- */
/* -------------------- Function -------------------- */
/* -------------------- -------- -------------------- */
function offsetPages(index,windowWidth) {
	var offset = (-index) * windowWidth;
	for (var i = 0; i < totalPages; i++) {
		$(".page").eq(i).css({
			"left":offset + (windowWidth * i) + "px"
		});
	}
}
function setIconLocation(previousIndex,currentIndex,windowResize) {
	var windowHeight = $(window).height();
	if ((windowResize == 1) && (currentIndex > 0)) {
		$("#logo").css({
			"top":windowHeight - 42 + "px"
		});
	} else if ((previousIndex == 0) && (pageIndex > 0)) {
		$("#logo").css({
			"box-shadow":"none",
			"margin-top":"-75px",
			"margin-left":"-50px",
			"top":windowHeight - 42 + "px",
			"background-color":"rgba(0,0,0,0)"
		});
		$("#mainLogo").css({
			"width":"100px"
		});
	} else if ((previousIndex > 0) && (pageIndex == 0)) {
		$("#logo").css({
			"top":(windowHeight / 2) + "px",
			"box-shadow":"",
			"margin-top":"",
			"margin-left":"",
			"background-color":""
		});
		$("#mainLogo").css({
			"width":""
		});
	}
}
function toggleActivePage(previousIndex,currentIndex) {
	$(".footerButton").eq(previousIndex).removeClass("active");
	$(".footerButton").eq(previousIndex).addClass("notActive");
	$(".footerButton").eq(previousIndex).addClass("icon");

	$(".footerButton").eq(currentIndex).addClass("active");
	$(".footerButton").eq(currentIndex).removeClass("notActive");
	$(".footerButton").eq(currentIndex).removeClass("icon");

	setIconLocation(previousIndex,currentIndex,0);
}
function adjustVideoSize_Page1(windowWidth) {
	if (windowWidth <= 1000) {
		$(".video").css({
			"height":((windowWidth / 2) / 1.333) + "px"
		});
		$("#videoSpacer").css({
			"height":((windowWidth / 2) / 1.333) + "px"
		});
		$("#showVideo").css({
			"border-radius":"0px"
		});
	} else {
		$(".video").css({
			"height":"375px"
		});
		$("#videoSpacer").css({
			"height":"375px"
		});
		$("#showVideo").css({
			"border-radius":"0px 0px 5px 5px"
		});
	}
}
function toggleSidebarDisplay() {
	if (sidebarDisplayFlag == 0) {
		$("#sidebar").css({
			"right":"-64px"
		});
	} else if (sidebarDisplayFlag == 1) {
		$("#sidebar").css({
			"right":""
		});
	} else {
		alert("Error (3): Flag was set to incorrect value.");
	}
}
function displayPageName(index) {
	var pageName;
	pageName = pageNames[index];
	$("#footerText").text(pageName);
}

/* -------------------- --------------- -------------------- */
/* -------------------- Click Functions -------------------- */
/* -------------------- --------------- -------------------- */
$(".footerButton").click(function() {
	var windowWidth = $(window).width();
	var previousIndex = pageIndex;
	pageIndex = $(this).index();

	if (previousIndex != pageIndex) {
		offsetPages(pageIndex,windowWidth);
		toggleActivePage(previousIndex,pageIndex);

		if (pageIndex != 0) {
			$("#introText").css({
				"opacity":"0"
			});
		} else if (pageIndex == 0) {
			$("#introText").css({
				"opacity":"1"
			});
		} else {
			alert("Error (1): Current page index is incorrect.");
		}
	}

	displayPageName(pageIndex);
});

/* -------------------- --------------- -------------------- */
/* -------------------- Hover Functions -------------------- */
/* -------------------- --------------- -------------------- */
$(".footerButton").hover(
	function() {
		displayPageName($(this).index());
	}, function() {
		displayPageName(pageIndex);
	}
);
$(".platform").hover(
	function() {
		var windowWidth = $(window).width();
		var sidebarWidth = $("#sidebar").width();
		var platformPosition = $(this).position().left + $(this).width();

		if (platformPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}

		var platformIndex = $(this).index() - platformIndexAdjust;
		$(".background").eq(platformIndex).css({
			"opacity":"0.2"
		});
		$(".platformDescription").eq(platformIndex).css({
			"opacity":"1"
		});
	}, function() {
		if (sidebarDisplayFlag == 0) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}

		var platformIndex = $(this).index() - platformIndexAdjust;
		$(".background").eq(platformIndex).css({
			"opacity":""
		});
		$(".platformDescription").eq(platformIndex).css({
			"opacity":""
		});
	}
);
$(".job").hover(
	function() {
		var windowWidth = $(window).width();
		var sidebarWidth = $("#sidebar").width();
		var jobPosition = $(this).position().left + $(this).width();

		if (jobPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}

		var jobIndex = $(this).index() - jobIndexAdjust;
		$(".background").eq(jobIndex + $(".platform").length).css({
			"opacity":"0.2"
		});
		$(".jobDescription").eq(jobIndex).css({
			"opacity":"1"
		});
	}, function() {
		if (sidebarDisplayFlag == 0) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}

		var jobIndex = $(this).index() - jobIndexAdjust;
		$(".background").eq(jobIndex + $(".platform").length).css({
			"opacity":""
		});
		$(".jobDescription").eq(jobIndex).css({
			"opacity":""
		});
	}
);
$(".project").hover(
	function() {
		var windowWidth = $(window).width();
		var sidebarWidth = $("#sidebar").width();
		var projectPosition = $(this).position().left + $(this).width();

		if (projectPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}

		var projectIndex = $(this).index() - projectIndexAdjust;
		$(".background").eq(projectIndex + $(".platform").length + $(".job").length).css({
			"opacity":"0.2"
		});
		$(".projectDescription").eq(projectIndex).css({
			"opacity":"1"
		});
	}, function() {
		if (sidebarDisplayFlag == 0) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}

		var projectIndex = $(this).index() - projectIndexAdjust;
		$(".background").eq(projectIndex + $(".platform").length + $(".job").length).css({
			"opacity":""
		});
		$(".projectDescription").eq(projectIndex).css({
			"opacity":""
		});
	}
);

/* -------------------- ----------------------- -------------------- */
/* -------------------- Contact Form Submission -------------------- */
/* -------------------- ----------------------- -------------------- */
$("#contentPage3").submit(function(e) {
	e.preventDefault();
	$.ajax({
	    url: "https://formspree.io/wachterfreddy@gmail.com", 
	    method: "POST",
	    data: {name: $("#userName").val(), _replyto: $("#userEmail").val(), message: $("#userMessage").val()},
	    dataType: "json"
	});

	setTimeout(function() {
		clearForm();
	}, 1000);
});

function clearForm() {
	var elems = document.getElementsByTagName("input");
	var l = elems.length - 1;
	for (var i = 0; i < l; ++i) {
		elems[i].value = "";
	}
	$("textarea").val("");

	alert("Contact request sent.");
}

/* -------------------- --------------- -------------------- */
/* -------------------- Google Tracking -------------------- */
/* -------------------- --------------- -------------------- */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-69516450-3', 'auto');
ga('send', 'pageview');


