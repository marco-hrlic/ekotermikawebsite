var pages=["Ekotermika", "ONama", "Projekti", "Kontakti"];
var currentPage="random";
$(document).ready(function(){
	var page = urlParam("page");
	if(page==null) page=0;
	if(page >= pages.length) page=pages.length-1;
	changePage(pages[page]);
	console.log("hello world!");
	$("a.navLink").click(function(event){
                //event.preventDefault();
		changePage(event.target.id);
	});
	$(window).on("popstate", function(event){
		var page = urlParam("page");
		if(page==null) page=0;
		if(page >= pages.length) page=pages.length-1;
		console.log(pages[page]);
		changePage(pages[page]);
	});

});

changePage = function(newPage){
    window.scrollTo(0,0);
    if(newPage==currentPage) return;
	var page="#line"+currentPage;
	$(page).addClass("hidden");
    $("#"+currentPage).removeClass("purple");
	currentPage=newPage;
	page="#line"+currentPage;
	$(page).removeClass("hidden").hide().fadeIn(200);
    $("#"+currentPage).addClass("purple");
	var naslov = currentPage;
	if(naslov == "ONama") naslov="O Nama";
	$("#naslov").text(naslov);
    $.get("pages/" + currentPage + ".html", function(data) {
        $(".contentMain").html(data).hide().fadeIn(400);
    });
}

urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}
	else{
		return results[1] || 0;
	}
}



