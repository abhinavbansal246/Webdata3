/*
 CSE 5335 Project 2.							Abhinav Bansal   1001011869
 
 References
http://www.w3schools.com/ajax/default.asp
http://www.w3schools.com/json/default.asp
http://www.w3schools.com/cssref/pr_class_cursor.asp 
http://jsfiddle.net/n4AUW/

*/   


function initialize () {
document.getElementById("disp2").innerHTML="";

}

function startSearch() {
initialize ();
sendRequest ();
}

var txt,i,y,film_detail, title;
function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=48c3fec79bf93a046eea527871525395&query=batman");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,2);
         // document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
		    
			var disp2 = document.getElementById('disp2');
			//var val="";
			
		  for (i=0;i<json.results.length;i++)
		  {
		 txt=txt + "<br>";
		  txt = txt + json.results[i].original_title + "   " +json.results[i].release_date ;
		         // if(!document.getElementById('timedrpact'+i))
        //----------------------------- Creating elements to populate movie list
            var ele = document.createElement("div");
            ele.setAttribute("id",json.results[i].id);
			ele.setAttribute("style","cursor:pointer");
			ele.setAttribute("style","background-color:#FFD700;cursor:pointer");

            ele.innerHTML= "<pre>" + json.results[i].original_title+ "   " +json.results[i].release_date + "</pre>";  //"hi "+i;
			//var tid = json.results[i].id;			
            disp2.appendChild(ele);
			
			ele.addEventListener("click" , function() { // create the new onclick function
			var tid = this.id; // passing the movie id
			//---------------------------------- Ajax request to call movie info
			var xhr2 = new XMLHttpRequest();
			xhr2.open("GET", "proxy.php?method=/3/movie/"+tid);
			xhr2.setRequestHeader("Accept","application/json");
			xhr2.onreadystatechange = function () {
			
			if (this.readyState == 4) {
				var json2 = JSON.parse(this.responseText);
				var str2 = JSON.stringify(json2,undefined,2);

				document.getElementById("poster").setAttribute("src","http://image.tmdb.org/t/p/w185" + json2.poster_path);
				document.getElementById("info").innerHTML = json2.overview ;
				document.getElementById("title").innerHTML = "<h1>"+json2.original_title+"</h1>" ;
				//title = json2.original_title;
				var genre = "";
				for(j=0;j<json2.genres.length; j++)
				{
				genre = genre + json2.genres[j].name;
				genre = genre + ",";
				}
				document.getElementById("genre").innerHTML = genre;
       }
   };
   xhr2.send(null); 
   
   //------------------------------------------------------------------ Ajax to call  cast
   var xhrcast = new XMLHttpRequest();
			
			xhrcast.open("GET", "proxy.php?method=/3/movie/"+tid+"/credits");
			xhrcast.setRequestHeader("Accept","application/json");
			xhrcast.onreadystatechange = function () {
			
			if (this.readyState == 4) {
				var jsoncast = JSON.parse(this.responseText);
				var strcast = JSON.stringify(jsoncast,undefined,2);
				
				document.getElementById("cast").innerHTML =  jsoncast.cast[0].name +"</br> "+jsoncast.cast[1].name + "</br> "+ jsoncast.cast[2].name + "</br> "+jsoncast.cast[3].name + "</br> "+ jsoncast.cast[4].name ;
				
       }
   };
   xhrcast.send(null); 
   //---------------------------------------------------------------------
   }, true);

        }
}
   };
   xhr.send(null);
}

//---------------------------------------------------------------------- Clear screen function
function removeText(event)
{
if (document.getElementById("form-input").value=="Search")
	{
document.getElementById("form-input").value="";
	}
}