// var DOMAIN = "http://algorithmics.comp.nus.edu.sg/~onlinequiz";

$( document ).ready(function() {
	//training and test links
	$('.right-links').css('background',surpriseColour);
	$('#test-link').hide();
	$('#ans-link').hide();
	$.ajax({
		url: PHP_DOMAIN + "/php/Test.php",
		data: {mode: MODE_CHECK_TEST_OPEN}
	}).done(function(data) {
		data = JSON.parse(data);
		if(data.testIsOpen == 1) {
			$('#test-link').show();
		}
		if(data.answerIsOpen == 1) {
			$('#ans-link').show();
		}
	});
	
	//thumbnail image animation on hover	
	$('a.thumbnail').hover(function() {
		$(this).children('img.static').hide();
	}, function() {
		$(this).children('img.static').show();
	});
	
  $('#Language').change(function() {
    window.open("http://" + $(this).val() + ".visualgo.net", "_top"); // force reload :O
  });

  // start with browser language (user's setting if we go to http://www.comp.nus.edu.sg/~stevenha/visualization)
  language = window.navigator.language.substring(0, 2);

  // if has ?language=, update the language
  var params = location.search;
  if (params.indexOf('language') != -1)
    language = params.split('language=')[1]; // if the parameter is there

  // if the URL is very specific, update the language further
  if (document.URL.indexOf('zh') != -1)
    language = 'zh';
  else if (document.URL.indexOf('id') != -1)
    language = 'id';
  else if (document.URL.indexOf('de') != -1)
    language = 'de';
  else if (document.URL.indexOf('nl') != -1)
    language = 'nl';

  if (language == 'zh' || language == 'ru' || language == 'id' || language == 'bn' ||
      language == 'ja' || language == 'vi' || language == 'de' || language == 'ko' ||
      language == 'th' || language == 'nl')
    $('#Language').val(language); 
  else
    $('#Language').val('en');

  $('#'+language+'_flag').css({"border-color": "#0000ff", "border-width":"1px", "border-style":"solid", "padding":"1px"});

  changeLanguage();

	var allViz = new Array(sorting, bitmask, linked, bst, heap, graphs, union, segment, bit, recursion, traversal, mst, sssp, maxflow, matching, suffixtree, suffixarray, geometry);
	
	//generate tags
	function createFilters() {
		var filterList = new Array();
		for(var i=0; i<allViz.length; i++) {
			var thisVizTags = allViz[i];
			for(var j=1; j<thisVizTags.length; j++) {
				//for all filters
				if($.inArray(thisVizTags[j],filterList) == -1) {
					filterList.push(thisVizTags[j]);
				}
				//for individual viz filters
				$('#'+thisVizTags[0]+" .indv-viz-filters").append("<span class='filter'>"+thisVizTags[j]+"</span>");
			}
		}
		filterList.sort();
		for(var i=0; i<filterList.length; i++) {
			$('#filters').append("<span class='filter'>"+ filterList[i] +"</span>");
		}
	}
	createFilters();
	
	//tag and search mechanism
	$('#filters-and-lines').hide();
	$('#emptySearchMsg').hide();
	var isEmptySearch = true;
	var searchTerm = new Array(""); //index 0 is the value from the search bar. Indices 1+ are values from tags.
	
	//search/unsearch from tag filters
	$('.filter').click(function() {
		//add value to search
		searchTerm[searchTerm.length] = $(this).html();
		showResults();
		$('#active-tags').append('<div class="active-tag">'+ $(this).html() +'<img src="img/cross_white.png"/></div>');
		$('.active-tag img').unbind('click').bind('click', function() {
			//remove value from search
			var indexToRemove = searchTerm.indexOf($(this).parent().text());
			searchTerm.splice(indexToRemove,1);
			showResults();
			//visual
			$(this).parent().remove();
		});
	});
		
	//instant search from search bar
	$('#search').each(function() {
		// Save current value of element
		$(this).data('oldVal', $(this));
		
		// Look for changes in the value
		$(this).bind("propertychange keyup input paste", function(event){
			// If value has changed...
			if ($(this).data('oldVal') != $(this).val()) {
				// Updated stored value
				$(this).data('oldVal', $(this).val());
				searchTerm[0] = $(this).val();
				showResults();
			}
		});
	});
	$('#searchbar').submit(function() {
		return false;
	});
	
	//find vizs with tag searchTerm
	function showResults() {
		isEmptySearch = true;
		$('#emptySearchMsg').hide();
		$('.viz').hide();
		for(var i=0; i<allViz.length; i++) { //for each visualisation
			var thisVizTags = allViz[i]; //array of the tags this visualisation has
			var foundAll = true;
			for(var j=0; j<searchTerm.length; j++) { //for each search term
				foundAll = foundAll && findOneTag(searchTerm[j], thisVizTags);
			}
			if(foundAll) {
				$('#'+thisVizTags[0]).show();
				isEmptySearch = false;
			}
		}
		if(isEmptySearch) {
			$('#emptySearchMsg').show();
		}
	}

  // to allow search term from URL
  var mySearch = location.search.split('search=')[1] ? location.search.split('search=')[1] : 'Search...';
  if (mySearch != 'Search...') {
    document.getElementById('search').value=mySearch;
    searchTerm[0]=mySearch;
    showResults();
  }
	
	function findOneTag(tag, vizArr) {
		var found = false;
		for(var i=0; i<vizArr.length; i++) {
			var patt = new RegExp(tag, "i");
			if(patt.test(vizArr[i])) {
				found = true;
			}
		}
		return found;
	}
	
	//styling - arrow rotation, show filters-and-lines
	$("#show-filters").click(function(){
		if ($("#filters-and-lines").is(":hidden")){
			showFilters();
		} else{
			hideFilters();
		}
	});
	
	function showFilters() {
		$("#filters-and-lines").slideDown("slow");
		$("#show-filters img").addClass('rotateRight');
	}
	function hideFilters() {
		$("#filters-and-lines").slideUp("slow");
		$("#show-filters img").removeClass('rotateRight');
	}
	
	//styling - surprise colour stuff
	$('#search').focus(function() { //search inset box-shadow
		if($(this).val().trim() == searchtext) {
			$(this).val("");
		}
		$(this).css("box-shadow", "0px 0px 3px "+surpriseColour+" inset");
		$(this).css("color", "black");
	});
	$('#search').focusout(function() {
		if($(this).val().trim() == "") {
			$(this).val(searchtext);
			$(this).css("box-shadow", "0px 0px 3px #929292 inset");
			$(this).css("color", "#888888");
		}
	});
	$('#show-filters').css("background-color", surpriseColour); //search filter button background
	$('#temp a').css("background-color", surpriseColour); //link to old site button
	$('.filter').css("background-color", "#aaaaaa"); //filter tags on hover
		$('.filter').hover(function() {
			$(this).css("background-color", surpriseColour);
		}, function() {
			$(this).css("background-color", "#aaaaaa");
		});
});