/*
PROGRAMMER: Frederick Wachter
DATE CREATED: 2016-04-13
LAST MODIFIED: 2016-05-16
PURPOSE: Engineering Portfolio of Frederick Wachter
CONTACT INFO: wachterfreddy@gmail.com
*/

/* -------------------- --------- -------------------- */
/* -------------------- Variables -------------------- */
/* -------------------- --------- -------------------- */
var pageIndex = 0; // indicated the current page of the user
var totalPages = $(".footerButton").length; // indicates the amount of available pages on the webpage
var videoDisplayFlag_Page1 = 0; // indicates if videos should be displayed on page 1
var sidebarDisplayFlag = 1; // indicates if the sidebar should be displayed
var jobIndexAdjust = $("#contentPage1").children().length - $(".job").length; // Adjustment to job index

/* -------------------- ------------- -------------------- */
/* -------------------- Window Resize -------------------- */
/* -------------------- ------------- -------------------- */
windowResize();
$(window).resize(function() {windowResize();});
function windowResize() {
	var windowWidth = $(window).width();
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

	offsetPages(pageIndex,windowWidth);
	setIconLocation(null,pageIndex,1);
	adjustVideoSize_Page1(windowWidth);
	toggleVideoDisplay(windowWidth);
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
function toggleVideoDisplay(windowWidth) {
	var previousSidebarDisplayFlag = sidebarDisplayFlag;
	if (videoDisplayFlag_Page1 == 0) {
		var topAdjustment = 0;
		if (windowWidth < 1000) {
			topAdjustment = ((-windowWidth / 2) / 1.333);
		} else if (windowWidth >= 1000) {
			topAdjustment = -375;
		}
		$("#contentPage1").css({
			"top":topAdjustment + "px"
		});
		$("#hideShowVideo_Page1").text("Show Videos");
		sidebarDisplayFlag = 1;
	} else if (videoDisplayFlag_Page1 == 1) {
		if (windowWidth < 1000) {
			sidebarDisplayFlag = 0;
		} else if (windowWidth >= 1000) {
			sidebarDisplayFlag = 1;
		}
		$("#contentPage1").css({
			"top":""
		});
		$("#hideShowVideo_Page1").text("Hide Videos");
	}

	sidebarDisplayFlag = pageFlagReset(sidebarDisplayFlag);
	if (previousSidebarDisplayFlag != sidebarDisplayFlag) {
		toggleSidebarDisplay();
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
function pageFlagReset(sidebarDisplayFlag) {
	if (pageIndex != 1) {
		return 1;
	} else {
		var windowWidth = $(window).width();
		if ((windowWidth <= 1000) && (videoDisplayFlag_Page1 == 1)) {
			return 0;
		} else {
			return 1;
		}
			
	}
}
function displayPageName(index) {
	var pageName;
	if (index == 0) {
		pageName = "Home";
	} else if (index == 1) {
		pageName = "Engineering Experience";
	} else if (index == 2) {
		pageName = "Project Experience";
	} else if (index == 3) {
		pageName = "Contact Me";
	}
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

	displaySidebar = pageFlagReset(sidebarDisplayFlag);
	if (displaySidebar != sidebarDisplayFlag) {
		sidebarDisplayFlag = displaySidebar;
		toggleSidebarDisplay();
	}

	displayPageName(pageIndex);
});
$("#showVideo").click(function() {
	if (videoDisplayFlag_Page1 == 0) {
		videoDisplayFlag_Page1 = 1;
	} else if (videoDisplayFlag_Page1 == 1) {
		videoDisplayFlag_Page1 = 0;
	} else {
		alert("Error (2): Flag was set to incorrect value.");
	}

	var windowWidth = $(window).width();
	toggleVideoDisplay(windowWidth);
});
$(".footerButton").hover(
	function() {
		displayPageName($(this).index());
	}, function() {
		displayPageName(pageIndex);
	}
);
$(".job").hover(
	function() {
		var jobIndex = $(this).index() - jobIndexAdjust;
		$(".background").eq(jobIndex).css({
			"opacity":"0.2"
		});
		$(".jobDescription").eq(jobIndex).css({
			"opacity":"1"
		});
	}, function() {
		var jobIndex = $(this).index() - jobIndexAdjust;
		$(".background").eq(jobIndex).css({
			"opacity":""
		});
		$(".jobDescription").eq(jobIndex).css({
			"opacity":""
		});
	}
);